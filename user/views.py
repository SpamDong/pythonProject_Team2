import os

from django.conf import settings
from django.contrib import auth, messages
from django.contrib.auth import logout, login, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm, UserChangeForm
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from user.form import CustomPasswordChangeForm
import jwt


import smtplib
from email.mime.text import MIMEText

from user.form import certificationForm
import random


def signup(request):
    global now_user
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                                            username=request.POST['username'],
                                            password=request.POST['password1'],
                                            email=str(now_user),
                                            first_name=request.POST['first_name'],)
            auth.login(request, user)
            return redirect('/user/login')
        return render(request, 'user/signup.html')
    return render(request, 'user/signup.html', {'now_user' : now_user})

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
        if User.objects.filter(first_name=request.POST.get('username', None), email=request.POST.get('email', None)).exists():
            user = User.objects.get(first_name=request.POST.get('username', None), email=request.POST.get('email', None))

            print("test",user)

            return render(request, 'user/find_id2.html', {'user' : user})
    print('안됨')

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
    # redirect_uri = 'http://127.0.0.1:8000/accounts/kakao/login/callback/'
    # kakao_auth_api = 'https"//kauth.kakao.com/oauth/authorize?respons_type=code'
    return redirect(
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5baed5a062eee62acdce3048f6053838&redirect_uri=http://127.0.0.1:8000/accounts/kakao/login/callback/'
    )


def request_api3(request):
    print(request.GET.get('code'))
    return render(request,'kakaologin.html')


def request_api4(request):
    headers = {"Content-Type": "application/x-www-form-urlencoded"} # 문서에서 쓰라는 헤더 복사 붙여넣기
    data = {"grant_type" : "authorization_code",
            "client_id" : "5baed5a062eee62acdce3048f6053838",
            "redirect_uri" : "http://127.0.0.1:8000/kakao/login",
            "code" : request.GET.get('code')}

    res = requests.post('https://kauth.kakao.com/oauth/token',
                        data=data,
                        headers=headers)

    json_result = json.loads(res.text)

    headers = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
               "Authorization": "Bearer " + json_result['access_token']}
    data = 'property_keys=["kakao_account.email", "properties.nickname"]'
    res = requests.post('https://kapi.kakao.com/v2/user/me', data=data, headers=headers)

    json_result = json.loads(res.text)

    email = json_result['kakao_account']['email']
    nickname = json_result['properties']['nickname']

    # 가입한 적 있으면 에러남, 에러처리 필요
    user = User()
    user.email = email
    user.nickname = nickname
    user.is_active = True
    user.save()

    return redirect('/user/login')


def kakaoLogin(request):
    return redirect(
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5baed5a062eee62acdce3048f6053838&redirect_uri=http://127.0.0.1:8000/kakao/login')

def kakaoLoginOauth(request):
    headers = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    data = {'grant_type': 'authorization_code',
            'client_id': '5baed5a062eee62acdce3048f6053838',
            'redirect_uri': 'http://127.0.0.1:8000/kakao/login',
            'code' : request.GET.get('code')}
    res = requests.post('https://kauth.kakao.com/oauth/token',
                        data=data,
                        headers=headers)

    json_result = json.loads(res.text)

    headers = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "Authorization": "Bearer " + json_result['access_token']}
    data = 'property_keys=["kakao_account.email", "properties.nickname"]'
    res = requests.post('https://kapi.kakao.com/v2/user/me', data=data, headers=headers)

    json_result = json.loads(res.text)

    email =json_result['kakao_account']['email']

    # 카카오로 가입한 적 없으면 에러 발생, 에러처리 필요
    user = User.objects.get(Q(email=email))
    login(request, user)

    return redirect('/board/list')


static_key = ''
now_user = ''

def sendEmail(request):
    key = random.randrange(10000, 19999)

    if request.method == 'GET':
        form = certificationForm()
        return render(request, 'send_email.html', {'form' : form})
    elif request.method == 'POST':

        sendEmail = "SLAcademyTeam@gmail.com"
        recvEmail = request.POST.get('name')
        password = "slateam2@"

        global now_user
        now_user = recvEmail
        print(now_user)
        smtpName = "smtp.gmail.com"  # smtp 서버 주소
        smtpPort = 587  # smtp 포트 번호

        # 리스트중에 하나 가져오기
        global static_key
        static_key = key

        text = "로그인 인증키 :    " + str(key)
        msg = MIMEText(text)  # MIMEText(text , _charset = "utf8")

        msg['Subject'] = "로그인 인증키"
        msg['From'] = sendEmail
        msg['To'] = recvEmail

        s = smtplib.SMTP(smtpName, smtpPort)  # 메일 서버 연결
        s.starttls()  # TLS 보안 처리
        s.login(sendEmail, password)  # 로그인
        s.sendmail(sendEmail, recvEmail, msg.as_string())  # 메일 전송, 문자열로 변환하여 보냅니다.
        s.close()  # smtp 서버 연결을 종료합니다.

        return redirect('/key_compare/')

def key_compare(request):
    if request.method == 'GET':
        form = certificationForm()
        return render(request, 'key_compare.html', {'form': form})

    elif request.method == 'POST':
        global static_key

        # 인증키와 서버에서 준 키값이 같다면
        if request.POST.get('num') == str(static_key):
            # 회원 가입 페이지로 넘어감
            return redirect('/user/signup')

        else:
            # 오류 페이지 출력하고 이메일 입력칸으로
            return redirect('/sendemail/')
