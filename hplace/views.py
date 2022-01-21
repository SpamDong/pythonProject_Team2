from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect


# Create your views here.
from hplace.forms import BoardForm
from hplace.models import Board
from comment.models import Comment


def like(request, bid) :
    post = Board.objects.get(Q(id=bid))
    user = request.user
    if post.like.filter(id=user.id).exists() :   # 게시글 좋아요 눌렀음.
        post.like.remove(user)
        message = 'del'
    else :                                       # 게시글 좋아요 아직 안눌렀음.
        post.like.add(user)
        message = 'add'
    return JsonResponse({'message':message, 'like_cnt' : post.like.count()})

def home(request) :
    return render(request, 'hplace/hplace.html')

def register(request):
    if request.method == 'GET' :
        boardForm = BoardForm()
        return render(request, 'hplace/hplace_register.html',
                  {'boardForm':boardForm})
    elif request.method == 'POST' :
        boardForm = BoardForm(request.POST)

        if boardForm.is_valid() :
            hplace = boardForm.save(commit=False)
            hplace.writer = request.user
            hplace.save()
            return redirect('/register/')
        else:
            return redirect('/register/')

def posts(request):
    posts = Board.objects.all()

    return render(request, 'hplace/hplace.html', {'posts':posts})

def read(request, bid) :
    post = Board.objects.prefetch_related('comment_set').get(Q(id=bid))
    return render(request, 'hplace/hplace.html', {'post' : post})

def delete(request, bid) :
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer :
        return redirect('/hplace/hplace')
    post.delete()
    return redirect('/hplace/hplace')

def update(request, bid) :
    post = Board.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/hplace/hplace')
    if request.method == "GET" :
        boardForm = BoardForm(instance=post)
        return render(request, 'hplace/update.html', {'boardForm': boardForm})
    elif request.method == 'POST' :
        boardForm = BoardForm(request.POST)
        if boardForm.is_valid() :
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
            return redirect('/read/'+str(bid))

def test(request):
    return render(request, 'hplace/hplace.html')