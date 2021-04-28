# Generated by Django 3.2 on 2021-04-21 21:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('nhlfa_app', '0003_auto_20210421_2127'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='league',
        ),
        migrations.RemoveField(
            model_name='player',
            name='team',
        ),
        migrations.AddField(
            model_name='player',
            name='team',
            field=models.ManyToManyField(to='nhlfa_app.Team'),
        ),
        migrations.AlterField(
            model_name='team',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='League',
        ),
    ]
