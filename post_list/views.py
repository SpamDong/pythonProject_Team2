from django.shortcuts import render, redirect



# Create your views here.
from hplace.models import Board
from post.models import Post


def post_list(request):
    post_List = Board.objects.all()

    return render(request, 'post_list/post_list.html', {'post_List' : post_List})

