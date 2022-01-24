"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
import hplace.views
import comment.views
import post_list.views
import post.views
import user.views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', hplace.views.register),
    path('posts/', hplace.views.posts),
    path('update/', hplace.views.update),
    path('read/<int:bid>', hplace.views.read),
    path('delete/', hplace.views.delete),
    path('home/', hplace.views.home),
    path('like/', hplace.views.like),

    path('', post.views.main_post),
    path('test/', hplace.views.test),


    path('comment/register', comment.views.register),
    path('comment/update', comment.views.update),
    path('comment/delete', comment.views.delete),

    path('user/login', user.views.userlogin),
    path('user/signup', user.views.signup),
    path('user/logout', user.views.userlogout),
    path('user/delete', user.views.userdelete),

    path('user/changepassword', user.views.changepassword, name='password_edit'),
    path('user/member_modify', user.views.member_modify, name='member_modify'),
    path('user/find_id1', user.views.find_id1),
    path('user/find_id2', user.views.find_id2),

    path('main_post', post.views.main_post),
    path('post_list/', post_list.views.post_list),

    path('test11/', user.views.request_api),

    path('kakaologin/', user.views.kakaologin),
    path('kakaologin2/', user.views.request_api4),


    path('account/', include('allauth.urls')),
    # path('accounts/kakao/login/callback/', get_user_info),
]

