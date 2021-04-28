from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'players', views.PlayerView, 'player')
router.register(r'teams', views.TeamView, 'team')

urlpatterns = router.urls
