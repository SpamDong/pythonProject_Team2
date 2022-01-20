from django.contrib.auth.models import User
from django.db import models

class Board(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE, default = '')
    title = models.CharField(max_length=200, default = '')
    user_address = models.CharField(max_length=200, default = '')
    user_number = models.CharField(max_length=200, default = '')
    user_food = models.CharField(max_length=200, default = '')
    contents = models.TextField(default = '')
    menu_1 = models.CharField(max_length=40, default = '')
    menu_2 = models.CharField(max_length=40, default = '')
    menu_3 = models.CharField(max_length=40, default = '')
    menu_4 = models.CharField(max_length=40, default = '')
    menu_5 = models.CharField(max_length=40, default = '')
    price_1 = models.CharField(max_length=40, default = '')
    price_2 = models.CharField(max_length=40, default = '')
    price_3 = models.CharField(max_length=40, default = '')
    price_4 = models.CharField(max_length=40, default = '')
    price_5 = models.CharField(max_length=40, default = '')
