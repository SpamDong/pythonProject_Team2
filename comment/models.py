from django.contrib.auth.models import User
from django.db import models


class Comment(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    contents = models.TextField(max_length=200)
    create_date = models.DateTimeField(auto_now_add=True)

