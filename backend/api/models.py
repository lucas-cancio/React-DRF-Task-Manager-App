from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=300)
    deadline = models.DateField()
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=False)

    def __str__(self):
        return self.title

class Subtask(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=300)
    deadline = models.DateField()
    completed = models.BooleanField(default=False)
    parentTask = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks', null=False)

    def __str__(self):
        return self.title
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwards):
    if created:
        Token.objects.create(user=instance)