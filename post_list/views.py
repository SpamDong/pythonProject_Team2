from django.shortcuts import render

# Create your views here.

def posts_list(request) :
    posts_list = Posts.objects.all()
    return render(request, 'posts/posts_list.html', {'posts_list': posts_list})

def posts_detail(request, bid):
    post = Posts.objects.get(bid=bid)
    return render(request, 'posts/posts_detail.html', context={'posts': posts})

def posts_create(request):
    if request.method == 'POST':
        posts_form = PostForm(request.POST, request.FILES)
        if posts_form.is_valid():
            new_posts = posts_form.save()
            return redirect('posts:posts_detail', bid=new_posts.id)
    else:
        posts_form = PostForm()
    return render(request, 'posts/posts_form.html', {'form': posts_form})

def posts_update(request, bid):
    posts = Post.objects.get(id=bid)
    if request.method == 'POST':
        posts_form = PostForm(request.POST, request.FILES, instance=posts)
        if posts_form.is_valid():
            posts_form.save()
            return redirect('posts:posts_detail', bid=posts.id)
    else:
        posts_form = PostForm(instance=posts)
    return render(request, 'posts/posts_form.html', {'form': posts_form})

def posts_delete(request, pk):
    posts = Post.objects.get(id=bid)
    if request.method == 'POST':
        posts.delete()
        return redirect('posts:posts')
    else:
        return render(request, 'posts/posts_delete.html')