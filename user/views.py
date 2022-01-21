from django.contrib import auth
from django.contrib.auth import logout, login, authenticate, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.models import User
from user.form import CustomPasswordChangeForm


def signup(request):
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                                            username=request.POST['username'],
                                            password=request.POST['password1'],
                                            email=request.POST['email'],
                                            first_name=request.POST['first_name'],)
            auth.login(request, user)
            return redirect('/user/login')
        return render(request, 'user/signup.html')
    return render(request, 'user/signup.html')

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

@login_required
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


@login_required
def userdelete(request):

    if request.method == 'POST':

        request.user.delete()

        return redirect('/main_post')

    return render(request, 'user/userdelete.html')


def member_modify(request):
    if request.method == "POST":
        #id = request.user.id
        #user = User.objects.get(pk=id)
        user = request.user
        user.first_name = request.POST["first_name"]
        user.save()
        return redirect('/')
    return render(request, 'user/member_modify.html')


def find_id1(request):
            return render(request, 'user/find_id1.html')

def find_id2(request):
    if request.method == "POST":
        if User.objects.filter(first_name= request.user.first_name , email= request.user.email).exists():
            name = User.objects.get(first_name= request.user.first_name , email= request.user.email)
            return render(request, 'user/find_id2.html', {'name' : name})
