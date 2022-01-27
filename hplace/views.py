from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from pyowm import OWM

from comment.models import Comment
from hplace.forms import BoardForm
from hplace.models import Board

import requests
import json


import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

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

        API_key = '1b2e17a15b425623d7106d443cf4ed5b'
        owm = OWM(API_key)
        mgr = owm.weather_manager()

        weather = mgr.weather_at_place('Seoul,KR').weather  # the observation object is a box containing a weather object
        temp_dict_celsius = weather.temperature('celsius')  # guess?

        return render(request, 'hplace/hplace.html', {'post': post, 'weather' : weather, 'temp' : temp_dict_celsius})

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
        return redirect('/read/' + str(bid))
    post.delete()
    return redirect('/post_list')


def update(request, bid):
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/read/' + str(bid))
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

