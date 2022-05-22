from django.http import Http404
from django.shortcuts import render
from django.http import JsonResponse
# from itsdangerous import Serializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import tweetSerializer,userSerializer,createTweetSerializer
# Create your views here.
from .models import tweet
from django.contrib.auth.models import User
from .forms import createUserForm
from django.contrib.auth import login,logout,authenticate

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def signup_view(request,*args,**kwargs):
    form=createUserForm()
    if request.method=='POST':
        form=createUserForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
    return Response(request.POST)

@api_view(['POST'])
def signin_view(request,*args, **kwargs):
    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
    user=authenticate(request,username=username,password=password)
    if user is not None:
        login(request,user)
    else:
        raise Http404("User does not exist")
    print(request.user)
    return Response(request.POST)   
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_view(request,*args, **kwargs):
    logout(request)
    return Response({})

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def home_view(request,*args,**kwargs):
    tweet_obj=tweet.objects.all()
    serializer=tweetSerializer(tweet_obj,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_tweet(request,*args,**kwargs):
    serializer=createTweetSerializer(data=request.data,many=False)
    if serializer.is_valid():
        serializer.save(user=request.user)
    else:
        raise Http404("User does not exist")
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_like_toggle(request,pk,*args, **kwargs):
    obj=tweet.objects.get(id=pk)
    print(obj)
    if not obj:
        return Response({},status=404)
    if request.user in obj.like.all():
        obj.like.remove(request.user)
    else:
        obj.like.add(request.user)
    
    return Response ({"message":"Tweet Liked"})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retweet_view(request,pk,*args, **kwargs):
    obj=tweet.objects.get(id=pk)
    # print(obj)
    content=request.POST.get('content')
    if not obj:
        return Response({},status=404)
    else:
        obj1=tweet.objects.filter(parent=obj,user=request.user,is_retweet=True).first()
        print(obj1)
        if obj.is_retweet and obj.user==request.user:
            obj.delete()

            # tweet.objects.(obj1.first)
            # tweet.objects
        elif obj1 is not None:
            obj1.delete()
        else:
            tweet.objects.create(parent=obj,content=content,user=request.user,is_retweet=True)
        # obj.like.add(request.user)
    
    return Response ({"message":"Tweet Liked"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reply_view(request,pk,*args, **kwargs):
    obj=tweet.objects.get(id=pk)
    print(obj)
    content=request.POST.get('content')

    print(content)
    if not obj:
        return Response({},status=404)
    else:
        tweet.objects.create(parent=obj,content=content,user=request.user,is_reply=True)

        # obj.like.add(request.user)
    
    return Response ({"message":"Tweet Replied"})

@api_view(['GET'])
def tweet_detail_view(request,pk,*args, **kwargs):
    parent=tweet.objects.get(id=pk)
    serializer=tweetSerializer(parent,many=False)
    value={}
    value['parent']=serializer.data
    obj=[]
    tweet_obj=tweet.objects.filter(parent=parent,is_reply=True)
    serializer=tweetSerializer(tweet_obj,many=True)
    obj1=serializer.data
    for x in obj1:
        parent=tweet.objects.get(id=x['id'])
        z=tweet.objects.filter(parent=parent,is_reply=True)
        serializer1=tweetSerializer(z,many=True)
        x['children']=serializer1.data
        print(serializer1.data)
        obj.append(x)
    value['comments']=obj
    return Response(value)



@api_view(['GET'])
def profile_view(request,pk,*args,**kwargs):
    user=User.objects.get(username=pk)
    serializer=userSerializer(user,many=False)
    return Response(serializer.data)


