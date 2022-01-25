from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from comment.models import Comment
from hplace.forms import BoardForm
from hplace.models import Board

import requests
import json


def request_api(request):
    res = requests.get(
        'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=dYE9%2F8Qgkip%2Fb%2FTXul0OJ5o210b3Ll7SuTYfsOYv0WKeXbMl2mxYkk9kamahHjWuw2x5zEp49o4Eq67G%2BU7l7g%3D%3D&numOfRows=10&pageNo=1&base_date=20220124&base_time=0600&nx=58&ny=125&dataType=json')

    print(str(res.status_code))

    result = json.loads(res.text)
    print(result['response']['body']['items']['item'][0]['obsrValue'])

    return render(request, 'asdf.html')


def kakao_api(request):
    app_key = '919506260a89ee9fe16ec0239997ed76'
    redirect_uri = 'http://127.0.0.1:8000/asdf/'
    kakao_auth_api = 'https://kauth.kakao.com/oauth/authorize?response_type=code'
    return redirect(
        f'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=919506260a89ee9fe16ec0239997ed76&redirect_uri=http://127.0.0.1:8000/oauth/'
    )

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def test2(request):
    return render(request, 'qwer.html')


def oauth(request):
    headers = {'Content_type': 'application/x-www-form-urlencoded;charset=utf-8'}

    data = {'grant_type': 'authorization_code',
            'client_id': '919506260a89ee9fe16ec0239997ed76',
            'redirect_uri': 'http://127.0.0.1:8000/oauth/',
            'code': request.GET.get('code')}

    res = requests.post('https://kauth.kakao.com/oauth/token',
                        data=data,
                        headers=headers, )
    print(res.text)

    return render(request, 'zxcv.html')


def like(request, bid):
    post = Board.objects.get(Q(id=bid))
    user = request.user
    if post.like.filter(id=user.id).exists():  # 게시글 좋아요 눌렀음.
        post.like.remove(user)
        message = 'del'
    else:  # 게시글 좋아요 아직 안눌렀음.
        post.like.add(user)
        message = 'add'
    return JsonResponse({'message': message, 'like_cnt': post.like.count()})


def home(request):
    return render(request, 'hplace/hplace.html')


def register(request):
    if request.method == 'GET':
        boardForm = BoardForm()
        return render(request, 'hplace/hplace_register.html',
                      {'boardForm': boardForm})
    elif request.method == 'POST':
        boardForm = BoardForm(request.POST)

        if boardForm.is_valid():
            hplace = boardForm.save(commit=False)
            hplace.writer = request.user
            hplace.save()
            return redirect('/register/')
        else:
            return redirect('/register/')


def posts(request):
    posts = Board.objects.all()

    return render(request, 'hplace/hplace.html', {'posts': posts})


def read(request, bid):
    if request.method == 'GET':
        post = Board.objects.get(Q(id=bid))
        return render(request, 'hplace/hplace.html', {'post': post})

    if request.method == 'POST':
        commentForm = Comment(request.POST)

        if commentForm.is_valid():
            hplace = commentForm.save(commit=False)
            hplace.writer = request.user
            hplace.save()
            return redirect('/read/' + str(bid))


def delete(request, bid):
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/hplace/hplace')
    post.delete()
    return redirect('/hplace/hplace')


def update(request, bid):
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/hplace')
    if request.method == "GET":
        boardForm = BoardForm(instance=post)
        return render(request, 'hplace/hplace_update.html', {'boardForm': boardForm})
    elif request.method == 'POST':
        boardForm = BoardForm(request.POST)
        if boardForm.is_valid():
            post.title = boardForm.cleaned_data['title']
            post.user_address = boardForm.cleaned_data['user_address']
            post.user_number = boardForm.cleaned_data['user_number']
            post.user_food = boardForm.cleaned_data['user_food']
            post.contents = boardForm.cleaned_data['contents']
            post.menu_1 = boardForm.cleaned_data['menu_1']
            post.menu_2 = boardForm.cleaned_data['menu_2']
            post.menu_3 = boardForm.cleaned_data['menu_3']
            post.menu_4 = boardForm.cleaned_data['menu_4']
            post.menu_5 = boardForm.cleaned_data['menu_5']
            post.price_1 = boardForm.cleaned_data['price_1']
            post.price_2 = boardForm.cleaned_data['price_2']
            post.price_3 = boardForm.cleaned_data['price_3']
            post.price_4 = boardForm.cleaned_data['price_4']
            post.price_5 = boardForm.cleaned_data['price_5']
            post.save()
            return redirect('/read/' + str(bid))


def test(request):
    return render(request, 'test.html')
