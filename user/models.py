from django.db import models

# Create your models here.

class certification(models.Model):
    name = models.CharField(max_length=20)
    num = models.CharField(max_length=20)