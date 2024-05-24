from django.shortcuts import render

import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator

from .models import Task, Subtask
from .serializers import TaskSerializer, SubtaskSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, mixins, viewsets, permissions, authentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny



class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow any user (no authentication required)

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get("username")
        password = data.get("password")

        if username is None or password is None:
            return Response({'detail': 'Please provide a username and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
        
        return Response({
            'id': user.id,
            'username': user.username,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'email': user.email,
            'detail': 'Successfully logged in.'
        }, status=status.HTTP_200_OK)


def logoutView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)
        
    logout(request)
    response = JsonResponse({'detail': 'Successfully logged out'})

    return response
     

class SignupView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request, *args, **kwargs):
        data = request.data
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")

        if (firstName is None or
            lastName is None or
            email is None or
            username is None or
            password is None):
            return Response({'detail': 'Enter all sign up information.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, first_name=firstName, last_name=lastName, password=password)
        user.save()

        return Response({'detail': "Successfully created an account."}, status=status.HTTP_200_OK)


class GetCSRFToken(APIView):
    def get(self, request, *args, **kwargs):
        response = Response({'detail': 'CSRF header set.'})
        response['X-CSRFToken'] = get_token(request)
        return response


class GetSession(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'firstName': request.user.first_name,
                    'lastName': request.user.last_name,
                    'email': request.user.email,
                },
                'detail': 'Successfully retrieved user session information',
            }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User is not authenticated. No session available'}, status=status.HTTP_400_BAD_REQUEST)

class TasksViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("IS USER AUTHENTICATED: " + str(self.request.user.is_authenticated) + str(self.request.user))
        user = self.request.user
        return Task.objects.filter(user=user.id)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    
class SubtasksViewSet(mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    
    serializer_class = SubtaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Subtask.objects.all()