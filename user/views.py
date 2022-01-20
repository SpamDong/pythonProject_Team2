
from django.contrib.auth import logout, login, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.views import View

from user.form import CustomPasswordChangeForm


def signup(request):
    if request.method == "GET":
        signupForm = UserCreationForm()
        return render(request, 'user/signup.html',{'signupForm':signupForm})
    elif request.method == "POST":
        signupForm = UserCreationForm(request.POST)
        if signupForm.is_valid():
            signupForm.save()
            return redirect('/main_post')

def userlogin(request):
    if request.method == "GET":
        loginForm = AuthenticationForm()
        return render(request, 'user/login.html', {'loginForm': loginForm})
    elif request.method == "POST":
        loginForm = AuthenticationForm(request, request.POST)
        if loginForm.is_valid():
            login(request, loginForm.get_user())
            return render(request, 'main_post/main_post.html')
        else:
            return redirect('/user/login')

def userlogout(request):
    logout(request)
    return redirect('/user/login')



def changepassword(request):
    if request.method == 'POST':
        password_change_form = CustomPasswordChangeForm(request.user, request.POST)
        if password_change_form.is_valid():
            user = password_change_form.save()
            update_session_auth_hash(request, user)
            return redirect('/main_post')
    else:
        password_change_form = CustomPasswordChangeForm(request.user)

    return render(request, 'user/changepw.html', {'password_change_form':password_change_form})

