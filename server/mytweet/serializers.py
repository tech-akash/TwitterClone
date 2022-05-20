from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import tweet

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','first_name','second_name']

class createTweetSerializer(serializers.ModelSerializer):
    # likes=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField(source='user')
    class Meta:
        model=tweet
        fields=['id','content','image','username']

    def get_username(self,obj):
        return obj.user.username
    
    


class tweetSerializer(serializers.ModelSerializer):
    likes=serializers.SerializerMethodField()
    is_reply=serializers.SerializerMethodField()
    is_retweet=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    # content=serializers.SerializerMethodField()
    parent=createTweetSerializer()
    class Meta:
        model=tweet
        fields=['id','content','image','likes','parent','is_retweet','is_reply','user']
    def get_likes(self,obj):
        return obj.like.count()
    def get_is_reply(self,obj):
        return obj.is_reply
    def get_is_retweet(self,obj):
        return obj.is_retweet
    def get_user(self,obj):
        return obj.user.username

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

