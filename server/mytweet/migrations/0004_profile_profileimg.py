# Generated by Django 4.0.4 on 2022-06-04 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mytweet', '0003_remove_profile_likedtweets_remove_profile_owntweets'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profileImg',
            field=models.ImageField(blank=True, null=True, upload_to='./image'),
        ),
    ]
