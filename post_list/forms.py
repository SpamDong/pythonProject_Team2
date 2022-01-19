from django import forms
from .models import Form


class BoardForm(forms.ModelForm):
    class Meta:
        model = Form
        fields = ('title', 'contents')

