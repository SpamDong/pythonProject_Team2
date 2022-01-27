from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.shortcuts import render, redirect

import hplace
from hplace.models import Board
from .forms import CommentForm
from .models import Comment
from django.shortcuts import get_object_or_404


def register(request, bid):
    if request.method == 'GET':
        commentForm = CommentForm()
        return render(request, 'hplace/hplace.html', {'commentForm': commentForm})
    elif request.method == 'POST':
        commentForm = CommentForm(request.POST)
        post = hplace.models.Board.objects.get(Q(id=bid))

        if commentForm.is_valid():
            print(commentForm)
            comment = commentForm.save(commit=False)
            comment.writer = request.user
            comment.post = post
            comment.save()
            return redirect('/read/' + str(bid))



def read(request, bid):
    comment = Comment.objects.get(Q(id=bid))
    return render(request, 'hplace/hplace.html', {'comment': comment})

@login_required(login_url='/user/login')
def delete(request, cid):
    cid = Comment.objects.get(Q(id=cid))
    post = cid.post_id
    if request.user != cid.writer:
        return redirect('/read/' + str(post))
    cid.delete()
    print(post)
    return redirect('/read/'+str(post))



