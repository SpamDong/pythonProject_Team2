from django.contrib.auth.models import User
import hplace.forms
from django.db import models


class Comment(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(hplace.forms.Board, on_delete=models.CASCADE)
    contents = models.TextField(max_length=200)
    create_date = models.DateTimeField(auto_now_add=True)

