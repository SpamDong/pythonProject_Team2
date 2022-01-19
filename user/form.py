from django.forms import forms


class LoginForm(forms.ModelForm):
    class Meta:
        model = Login
        fields = ('title', 'contents')