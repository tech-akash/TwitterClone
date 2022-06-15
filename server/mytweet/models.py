from pyexpat import model
from django.db import models

from django.contrib.auth.models import User
# Create your models here.

class tweetLike(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    tweet=models.ForeignKey("tweet",on_delete=models.CASCADE,null=True)
    timestamp=models.DateTimeField(auto_now_add=True,null=True)

class tweet (models.Model):
    parent=models.ForeignKey("self",null=True,on_delete=models.SET_NULL)
    user =models.ForeignKey(User,null=True,on_delete=models.CASCADE)
    likes =models.ManyToManyField(User,related_name="tweetLike", through=tweetLike)
    content=models.CharField( max_length=280,null=True,blank=True)
    image=models.FileField( upload_to="./image", null=True,blank=True)
    timeStamp=models.DateTimeField(auto_now_add=True,null=True)
    is_retweet=models.BooleanField(default=False)
    is_reply=models.BooleanField(default=False)
    class Meta:
        ordering=['-id']
    
class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    DOB=models.DateField(null=True,blank=True)
    Fname=models.CharField(max_length=20,null=True,blank=True)
    Lname=models.CharField(max_length=30,null=True,blank=True)
    CountryOfOrigin=models.CharField(max_length=30,null=True,blank=True)
    profileImg=models.ImageField(upload_to="./image", null=True,blank=True)
    # LikedTweets=models.ManyToManyField(tweet,related_name="userLikes")
    # OwnTweets=models.ManyToManyField(tweet,related_name="userTweets")
