import os

from django.conf import settings
from django.contrib import auth, messages
from django.contrib.auth import logout, login, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm, UserChangeForm
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

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

import requests
import json
def request_api(request):   # 기상
    res = requests.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=CddQ%2FQoLkxAvrxtsz6QjD%2BFLEVIfsODF8yxJdHYKueavz8WQkUGZXRuN7AJIA06peELQ14mOnPbrNX7H%2FMJifw%3D%3D&numOfRows=10&pageNo=1&dataType=json&base_date=20220124&base_time=0600&nx=58&ny=125')

    print(str(res.status_code))
    result = json.loads(res.text)
    print(result['response']['body']['items']['item'][0]['obsrValue'])

    return render(request, 'test11.html')

def kakaologin(request):
    # app_key = '5baed5a062eee62acdce3048f6053838'
    # redirect_uri = 'http://127.0.0.1:8000/kakaologin/'
    # kakao_auth_api = 'https"//kauth.kakao.com/oauth/authorize?respons_type=code'
    return redirect(
        f'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5baed5a062eee62acdce3048f6053838&redirect_uri=http://127.0.0.1:8000/kakaologin2/'
    )

def request_api3(request):
    print(request.GET.get('code'))
    return render(request,'kakaologin.html')


def request_api4(request):
    headers = {"Content-Type": "application/x-www-form-urlencoded"} # 문서에서 쓰라는 헤더 복사 붙여넣기
    data = {"grant_type" : "authorization_code",
            "client_id" : "5baed5a062eee62acdce3048f6053838",
            "redirect_uri" : "http://127.0.0.1:8000/kakaologin2/",
            "code" : request.GET.get('code')}

    res = requests.post('https://kauth.kakao.com/oauth/token', data=data, headers=headers,)

    print(res.text)

    return render(request,'kakaologin.html')

# @api_view(['GET'])
# @permission_classes([AllowAny, ])
# def kakao_get_login(request):
#     CLIENT_ID = SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY']
#     REDIRECT_URL = SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI']
#     url = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5baed5a062eee62acdce3048f6053838&redirect_uri=http://127.0.0.1:8000/".format(
#         CLIENT_ID, REDIRECT_URL)
#     res = redirect(url)
#     return res
#
# @api_view(['GET'])
# @permission_classes([AllowAny, ])
# def get_user_info(reqeust):
#     CODE = reqeust.query_params['code']
#     url = "https://kauth.kakao.com/oauth/token"
#     res = {
#         'grant_type': 'authorization_code',
#         'client_id': SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY'],
#         'redirect_url': SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI'],
#         'client_secret': SOCIAL_OUTH_CONFIG['KAKAO_SECRET_KEY'],
#         'code': CODE
#     }
#     headers = {
#         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
#     }
#     response = requests.post(url, data=res, headers=headers)
#     token_json = response.json()
#     user_url = "https://kapi.kakao.com/v2/user/me"
#     auth = "Bearer " + token_json["yeusVFRNa1hh_K6jEINNcjNuEkQmZWxOSOdQewo9dNsAAAF-iv6oHA"]
#     HEADER = {
#         "Authorization": auth,
#         "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
#     }
#     res = requests.get(user_url, headers=HEADER)
#     print(response.json())
#     return Response(res.text)

# def home(request):
#     return render(request, 'kakaologin.html')
#
# def top(request):
#     code = request.GET['code']
#     grant_type = 'authorization_code'
#     client_id = '5baed5a062eee62acdce3048f6053838'
#     redirect_uri = 'http://localhost:8000/top'
#     # Get access_token!
#     param = {
#         'grant_type': grant_type,
#         'client_id': client_id,
#         'redirect_uri' : redirect_uri,
#         'code' : code,
#     }
#
#     url = 'https://kauth.kakao.com/oauth/token'
#     r = requests.post(url, data=param)
#     json_result = r.json()
#     print(r.json())
#     access_token = json_result['access_token']
#     return render(request, 'top.html', {'access_token':access_token})


def check_if_user(user_id, user_pw):
    payload = {
        'user_id': str(user_id),
        'user_pw': str(user_pw)
    }
    with requests.Session() as s:
        s.post('https://community-dummy.com/login', data=payload)
        auth = s.get('https://community-dummy.com/login_requited_page')
        if auth.status_code == 200: # 성공적으로 가져올 때
            return True
        else: # 로그인이 실패시
            return False