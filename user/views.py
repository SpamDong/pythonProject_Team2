
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.db.models import Q

from django.shortcuts import render, redirect


def signup(request):
    if request.method == "GET":
        signupForm = UserCreationForm()
        return render(request, 'user/signup.html',{'signupForm':signupForm})
    elif request.method == "POST":
        signupForm = UserCreationForm(request.POST)
        if signupForm.is_valid():
            signupForm.save()
            return redirect('/user/signup')

def userlogin(request):
    if request.method == "GET":
        loginForm = AuthenticationForm()
        return render(request, 'user/login.html', {'loginForm':loginForm})
    elif request.method == "POST":
        loginForm = AuthenticationForm(request, request.POST)
        if loginForm.is_valid():
            login(request, loginForm.get_user())
            return redirect('/user/login')
        else:
            return redirect('/user/login')

def userlogout(request):
    logout(request)
    return redirect('user/login')


@login_required(login_url='/user/login')
def delete(request, bid):
    post = Board.objects.get( Q(id=bid) )
    if request.user != post.writer:
        return redirect('/board/list')

    post.delete()
    return redirect('/board/list')

@login_required(login_url='/user/login')
def update(request, bid):
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/board/list')

    if request.method == "GET":
        boardForm = BoardForm(instance=post)
        return render(request, 'board/update.html',
                      {'boardForm':boardForm})
    elif request.method == "POST":
        boardForm = BoardForm(request.POST)
        if boardForm.is_valid():
            post.title = boardForm.cleaned_data['title']
            post.contents = boardForm.cleaned_data['contents']
            post.save()
            return redirect('/board/read/'+str(bid))



