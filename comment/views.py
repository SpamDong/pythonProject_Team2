from django.db.models import Q
from django.shortcuts import render, redirect
from .forms import CommentForm
from .models import Comment
import hplace.models

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

def read(request, bid) :
    comment = Comment.objects.get(Q(id=bid))
    return render(request, 'hplace/hplace.html', {'comment' : comment})




