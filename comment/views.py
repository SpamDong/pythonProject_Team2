from django.db.models import Q
from django.shortcuts import render, redirect
from .forms import CommentForm
from .models import Comment


def register(request):
    if request.method == 'GET':
        commentForm = CommentForm()
        return render(request, 'hplace/hplace.html', {'commentForm': commentForm})
    elif request.method == 'POST':
        commentForm = CommentForm(request.POST)

        if commentForm.is_valid():
            comment = commentForm.save(commit=False)
            comment.writer = request.user
            comment.save()
            return redirect('/comment/register')


def update(request, bid):
    post = Comment.objects.get(Q(id=bid))
    if request.method == 'GET':
        commentForm = CommentForm(instance=post)
        return render(request, 'hplace/hplace.html', {'commentForm': commentForm})

    elif request.method == 'POST':
        commentForm = CommentForm(request.POST)
        post = Comment.objects.get(Q(id=bid))
        if commentForm.is_valid():
            post.title = commentForm.cleaned_data['title']
            post.contents = commentForm.cleaned_data['contents']
            post.save()
            return redirect('/board/read/' + str(bid))

        return redirect('/comment/register')


def delete(request, bid):
    post = Comment.objects.get(Q(id=bid))
    if request.user != post.writer:
        return redirect('/comment/register')

    post.delete()
    return redirect('/comment/register')
