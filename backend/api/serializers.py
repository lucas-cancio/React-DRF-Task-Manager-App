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
        fields = ['id', 'title', 'description', 'deadline', 'completed', 'parentTask',]

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    subtasks = SubtaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'deadline', 'completed', 'user', 'subtasks']