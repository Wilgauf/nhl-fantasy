from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Team(models.model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='team')
    def __str__(self) -> str:
        return f"{self.name}"

class Player(models.model):
    name = models.CharField(max_length=255)
    number= models.IntegerField()
    team =models.ManyToManyField(Team)

    def __str__(self) -> str:
        return f"{self.name}"