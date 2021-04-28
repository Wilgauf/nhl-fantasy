from django.shortcuts import render
from .models import Player, Team
from rest_framework import viewsets
from .serializers import PlayerSerializer, TeamSerializer
# Create your views here.

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()  

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class TeamView(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)