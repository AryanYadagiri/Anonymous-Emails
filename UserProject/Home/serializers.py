from django.contrib.auth.models import User
from .models import History
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}


class PasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ["email"]


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ["email_recipient", "message", "timestamp"]
