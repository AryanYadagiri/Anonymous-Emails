from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile, History
from django.utils import timezone
from datetime import timedelta
from .serializers import UserSerializer, PasswordResetSerializer, HistorySerializer
import secrets
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail

# Create your views here.


@api_view(["POST"])
@permission_classes([AllowAny])
def LoginUser(request):
    if request.method == "POST":
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user, backend=user.backend)

                gen_refresh_token = RefreshToken.for_user(user)
                user_refresh_token = str(gen_refresh_token)
                user_access_token = str(gen_refresh_token.access_token)
                access_token_expiry = (
                    timezone.localtime(timezone.now())
                    + settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
                )

                return Response(
                    {
                        "message": "Login Sucessful",
                        "refresh_token": user_refresh_token,
                        "access_token": user_access_token,
                        "access_token_expiry": access_token_expiry.strftime(
                            "%Y-%m-%d %H:%M:%S"
                        ),
                    },
                    status=200,
                )
            else:
                return Response({"message": "Invalid credentials"}, status=401)
        except Exception:
            return Response({"error": "Unable to authenticate"}, status=400)


class SignUp(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserSerializer(data=data)

        try:
            if serializer.is_valid():
                username = serializer.validated_data["username"]
                email = serializer.validated_data["email"]
                password = serializer.validated_data["password"]

                if User.objects.filter(username=username):
                    return Response({"error": "Username already exist."}, status=400)

                if User.objects.filter(email=email):
                    return Response({"error": "Email already exist."}, status=400)

                hash_password = make_password(password)
                serializer.validated_data["password"] = hash_password

                user = serializer.save()

                UserProfile.objects.create(user=user, reset_token="")

                return Response({"success": "User created successfully"}, status=201)

            else:
                return Response({"message": "Some error occured"}, status=400)
        except Exception as e:
            print(f"Error occured : {e}")


@api_view(["POST"])
def LogoutUser(request):
    if "refresh_token" in request.data:
        try:
            valid_refresh_token = request.data.get("refresh_token")
            token = RefreshToken(valid_refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=200)
        except Exception as e:
            print(f"Invalid refresh token : {e}")
            return Response({"message": "Invalid refresh token"}, status=401)
    else:
        print("Refresh token not provided")
        return Response({"message": "Refresh token not provided"}, status=400)


@api_view(["POST"])
def New_Access_Token(request):
    try:
        str_refresh_token = request.data.get("refresh_token")

        if str_refresh_token is None:
            return Response({"error": "Error : Refresh token not provided"}, status=400)

        old_refresh_token = RefreshToken(str_refresh_token)

        if old_refresh_token:
            new_access_token = str(old_refresh_token.access_token)

            access_token_expiry = (
                timezone.localtime(timezone.now())
                + settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
            )

            return Response(
                {
                    "new_access_token": new_access_token,
                    "access_token_expiry": access_token_expiry.strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                },
                status=200,
            )
        else:
            print("Invalid access token")
            return Response({"error": "Invalid access token"}, status=401)

    except Exception as e:
        print(f"The error is : {e}")
        return Response({"error": "Unable to access refresh token"}, status=400)


class EmailService(APIView):
    @permission_classes([IsAuthenticated])
    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            subject = "Anonymous message for you!"
            message = request.data.get("message")
            from_mail = settings.EMAIL_HOST_USER
            recipient_list = [request.data.get("email")]

            History.objects.create(
                user=user,
                email_recipient=recipient_list,
                message=message,
                timestamp=timezone.localtime(timezone.now()),
            )
            send_mail(subject, message, from_mail, recipient_list)

            return Response({"message": "Email sent successfully"}, status=200)

        except Exception as e:
            print(f"The error is : {e}")
            return Response({"error": "Unable to send email"}, status=400)


class PasswordReset(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
            except Exception as e:
                print(f"Error : {e}")
                return Response({"Error": "User not found"}, status=400)

            token = secrets.token_urlsafe(32)
            expired_at = timezone.localtime(timezone.now()) + timedelta(minutes=10)
            created_at = timezone.localtime(timezone.now())

            user.profile.reset_token = token
            user.profile.expired_at = expired_at
            user.profile.created_at = created_at
            user.profile.save()

            subject = "Password reset"
            message = f"Enter this token {token} and click the following link to reset your password: http://localhost:5173/Confirm-reset"
            from_mail = settings.EMAIL_HOST_USER
            recipient_list = [request.data.get("email")]

            send_mail(subject, message, from_mail, recipient_list)

            return Response(
                {"message": "Password reset email sent successfully"}, status=200
            )
        else:
            return Response({"error": "Invalid email"}, status=400)


class PasswordResetConfirm(APIView):
    def post(self, request, *args, **kwargs):
        current_date_time = timezone.localtime(timezone.now())
        reset_token = request.data.get("reset_token")
        new_password = request.data.get("new_password")
        retype_password = request.data.get("retype_password")

        if new_password != retype_password:
            return Response({"message": "password didn't matched"}, status=400)

        try:
            profile = UserProfile.objects.get(reset_token=reset_token)
            user = profile.user
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Invalid reset token."}, status=400)

        if current_date_time < profile.expired_at:
            user.password = make_password(new_password)
            user.save()

            profile.reset_token = None
            profile.created_at = None
            profile.expired_at = None
            profile.save()

            return Response({"message": "password changed successfully"}, status=200)

        else:
            return Response({"message": "Reset token expired."}, status=400)


class EmailHistory(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            user_emails = History.objects.filter(user=user)
            serializer = HistorySerializer(user_emails, many=True)
            return Response({"data": serializer.data}, status=200)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Something went wrong."}, status=400)


class DeleteUser(APIView):
    @permission_classes([IsAuthenticated])
    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                if user == request.user:

                    History.objects.filter(user=user).delete()
                    UserProfile.objects.filter(user=user).delete()
                    user.delete()

                    return Response(
                        {"message": "Account deleted successfully."}, status=200
                    )
                else:
                    return Response({"message": "Username not justified."}, status=400)
            else:
                return Response({"message": "Invalid credentials"}, status=401)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "Something went wrong."}, status=400)
