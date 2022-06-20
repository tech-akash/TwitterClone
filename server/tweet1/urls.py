
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static  
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
tweet_detail_view,
toggle_follower,
discover_view,)
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
    path('toggleFollower/',toggle_follower,name="follower"),
    path('discover/',discover_view,name="discover"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)