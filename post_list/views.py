from django.shortcuts import render, redirect


# Create your views here.
def post_list(request):

    return render(request, 'post_list/post_list.html')

