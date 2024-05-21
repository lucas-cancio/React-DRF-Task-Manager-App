from rest_framework import serializers

from django.contrib.auth.models import User
from .models import Task, Subtask


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ['title', 'description', 'deadline', 'completed',]

class TaskSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    subtasks = SubtaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['title', 'description', 'deadline', 'completed', 'user', 'subtasks']