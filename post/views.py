from django.shortcuts import render

# Create your views here.
def main_post(request):
    return render(request, 'main_post/main_post.html')

