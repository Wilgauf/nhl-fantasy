from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Team(models.Model):
    name = models.CharField(max_length=255)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team')
    def __str__(self) -> str:
        return f"{self.name}"

class Player(models.Model):
    TEAM_CHOICES = [
        ('New Jersey Devils', 'New Jersey Devils'),
        ('New York Islanders','New York Islanders'),
        ('New York Rangers','New York Rangers'),
        ('Philadelphia Flyers','Philadelphia Flyers'),
        ('Pittsburgh Penguins','Pittsburgh Penguins'),
        ('Boston Bruins','Boston Bruins'),
        ('Buffalo Sabres','Buffalo Sabres'),
        ('Montréal Canadiens','Montréal Canadiens'),
        ('Ottawa Senators','Ottawa Senators'),
        ('Toronto Maple Leafs','Toronto Maple Leafs'),
        ('Carolina Hurricanes','Carolina Hurricanes'),
        ('Florida Panthers','Florida Panthers'),
        ('Tampa Bay Lightning','Tampa Bay Lightning'),
        ('Washington Capitals','Washington Capitals'),
        ('Chicago Blackhawks','Chicago Blackhawks'),
        ('Detroit Red Wings','Detroit Red Wings'),
        ('Nashville Predators','Nashville Predators'),
        ('St. Louis Blues','St. Louis Blues'),
        ('Calgary Flames','Calgary Flames'),
        ('Colorado Avalanche','Colorado Avalanche'),
        ('Edmonton Oilers','Edmonton Oilers'),
        ('Vancouver Canucks','Vancouver Canucks'),
        ('Anaheim Ducks','Anaheim Ducks'),
        ('Dallas Stars','Dallas Stars'),
        ('Los Angeles Kings','Los Angeles Kings'),
        ('San Jose Sharks','San Jose Sharks'),
        ('Columbus Blue Jackets','Columbus Blue Jackets'),
        ('Minnesota Wild','Minnesota Wild'),
        ('Winnipeg Jets','Winnipeg Jets'),
        ('Arizona Coyotes','Arizona Coyotes'),
        ('Vegas Golden Knights','Vegas Golden Knights')
    ]
    name = models.CharField(max_length=255)
    apiID = models.IntegerField()
    team = models.ManyToManyField(Team)
    nhlTeam = models.CharField(max_length=255, choices=TEAM_CHOICES, null=True)
    

    def __str__(self) -> str:
        return f"{self.name} rocks"