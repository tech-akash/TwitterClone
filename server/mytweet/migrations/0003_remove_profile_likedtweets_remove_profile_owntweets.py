# Generated by Django 4.0.4 on 2022-06-04 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mytweet', '0002_rename_like_tweet_likes_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='LikedTweets',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='OwnTweets',
        ),
    ]
