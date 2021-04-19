from django.urls import path, include

urlpatterns = [

    path('', include('nhlfa_app.urls')),
]