from django.urls import path
from . import views

urlpatterns = [
    path("login", views.LoginUser, name="login"),
    path("signup", views.SignUp.as_view(), name="signup"),
    path("logout", views.LogoutUser, name="logout"),
    path("refresh", views.New_Access_Token, name="refresh"),
    path("email", views.EmailService.as_view(), name="email"),
    path("password-reset", views.PasswordReset.as_view(), name="password-reset"),
    path(
        "confirm-password-reset",
        views.PasswordResetConfirm.as_view(),
        name="confirm-password-reset",
    ),
    path("email-history", views.EmailHistory.as_view(), name="email-history"),
    path("delete-user", views.DeleteUser.as_view(), name="delete-user"),
]
