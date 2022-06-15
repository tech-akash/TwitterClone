from tokenize import Pointfloat
from django.contrib import admin
from .models import tweet,tweetLike,Profile
# Register your models here.
admin.site.register(tweet)
admin.site.register(tweetLike)
admin.site.register(Profile)