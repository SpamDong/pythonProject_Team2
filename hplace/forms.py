from django import forms
from .models import Board

class BoardForm(forms.ModelForm) :
    class Meta :
        model = Board
        fields = ('title', 'user_address', 'user_number', 'user_food', 'contents',
                  'menu_1', 'menu_2', 'menu_3', 'menu_4', 'menu_5', 'price_1',
                  'price_2', 'price_3', 'price_4', 'price_5')