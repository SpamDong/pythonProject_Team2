from django.shortcuts import render

# Create your views here.
def signup(reqeust):
    if reqeust.method == "GET":
        signupForm = UserCreationForm()
        return render(reqeust, 'user/signup.html',{'signupForm':signupForm})
    elif reqeust.method == "POST":
        signupForm = userCreationForm(request.POST)
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
            return  redirect('/post/post')
        else:
            retuen redirect('/post/post')

def userlogout(request):
    loout(request)
    return  redirect('user/login')

### 왜 푸시가 안될까222