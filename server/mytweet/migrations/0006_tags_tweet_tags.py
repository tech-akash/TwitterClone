# Generated by Django 4.0.4 on 2022-06-21 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mytweet', '0005_profile_following'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='tweet',
            name='tags',
            field=models.ManyToManyField(related_name='hashtags', to='mytweet.tags'),
        ),
    ]
