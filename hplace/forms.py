from django import forms
from .models import Board

class BoardForm(forms.ModelForm) :
    class Meta :
        model = Board
        fields = ('title', 'user_address', 'user_number', 'user_food', 'contents')
