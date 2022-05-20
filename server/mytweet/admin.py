from django.contrib import admin
from .models import tweet,tweetLike
# Register your models here.
admin.site.register(tweet)
admin.site.register(tweetLike)