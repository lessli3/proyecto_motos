from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from .views.web_views import login, index
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lambda request: redirect('login')),
    path('motos/api/', include('motos_api.urls')),
    path('motos/', index, name='moto_list'),
    path('login/', login, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
