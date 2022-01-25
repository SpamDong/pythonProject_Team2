from django.db import models


class user_email(models.Model):
    name = models.CharField(max_length=20)
    num = models.CharField(max_length=20)