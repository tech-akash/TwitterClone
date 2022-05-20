"""tweet1 URL Configuration

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
from django.urls import path    
from mytweet.views import (home_view , 
create_tweet,
profile_view,
signup_view,
signin_view,
logout_view,
MyTokenObtainPairView,
tweet_like_toggle ,
retweet_view,
reply_view,
tweet_detail_view,)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',home_view,name="home"),
    path('createtweet/',create_tweet,name="createtweet"),
    path('profile/<str:pk>/',profile_view,name="profile"),
    path('createuser/',signup_view,name="signup"),
    path('signin/',signin_view,name="sigin"),
    path('logout/',logout_view,name="logout"),
    path('like/<int:pk>/',tweet_like_toggle,name="likeTweet"),
    path('retweet/<int:pk>/',retweet_view,name="retweetTweet"),
    path('reply/<int:pk>/',reply_view,name="replyTweet"),
    path('detail/<int:pk>/',tweet_detail_view,name="tweetDetail"),
]
