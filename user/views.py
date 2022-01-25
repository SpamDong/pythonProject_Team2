import os

from django.conf import settings
from django.contrib import auth, messages
from django.contrib.auth import logout, login, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm, UserChangeForm
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
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

from random import random
import smtplib
from email.mime.text import MIMEText
from user_email.forms import user_emailForm





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
            "redirect_uri" : "http://127.0.0.1:8000/accounts/kakao/login/callback/",
            "code" : request.GET.get('code')}

    res = requests.post('https://kauth.kakao.com/oauth/token', data=data, headers=headers,)

    print(res.text)

    return render(request,'main_post/main_post.html')

class KakaoLogInView(View):
    def get(self, request):
        try:
            access_token = request.headers.get('Authorization', None)
            headers = {"Authorization": f"Bearer PiHvH9YK6z6WLRV8px31kiPoNYtwnvUcFhAU_worDSAAAAF-jvTF3w"}
            kakao_login_data = requests.get("https://kapi.kakao.com/v2/user/me", headers=headers).json()

            if not kakao_login_data:
                return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)

            if kakao_login_data.get('code') == -401:
                return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)

            kakao_id = str(kakao_login_data["id"])
            kakao_account = kakao_login_data["kakao_account"]
            email = kakao_account["email"]

            if not User.objects.filter(email=email).exists() and email is not None:
                return JsonResponse({'message': 'INVALID_USER'}, status=401)

            login_token = jwt.encode({'user_id': kakao_id}, '5baed5a062eee62acdce3048f6053838', algorithm=ALGORITHM)

            return JsonResponse({'message': 'SUCCESS', 'access_token': login_token}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"message": "JSONDecodeError"}, status=400)


def sendEmail(request):
    if request.method == 'GET':
        form = user_emailForm()
        return render(request, 'send_email.html', {'form' : form})

    elif request.method == 'POST':

        sendEmail = "cycloid87@naver.com"
        recvEmail = request.POST.get('name')
        password = "skvkf1122!"

        smtpName = "smtp.naver.com"  # smtp 서버 주소
        smtpPort = 587  # smtp 포트 번호

        # 리스트중에 하나 가져오기
        key = key_list[0]

        global static_key
        static_key = key

        text = "로그인 인증키 :    " + key
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
        form = user_emailForm()
        return render(request, 'key_compare.html', {'form': form})

    elif request.method == 'POST':
        global static_key

        # 인증키와 서버에서 준 키값이 같다면
        if request.POST.get('num') == static_key:
            # 회원 가입 페이지로 넘어감
            return redirect('/')

        else:
            # 오류 페이지 출력하고 이메일 입력칸으로
            return redirect('/sendemail/')