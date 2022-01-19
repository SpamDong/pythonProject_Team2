from django.shortcuts import render, redirect


# Create your views here.
from post.models import Post


def post_list(request):
    post_List = Post.objects.all()

    return render(request, 'post_list/post_list.html', {'post_List' : post_List})

