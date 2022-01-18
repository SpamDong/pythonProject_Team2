from django.shortcuts import render

# Create your views here.

def test(request):
    return render(request, 'layout/base.html')

def test2(request):
    return render(request, 'hplace/hplace.html')