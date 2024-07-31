# motos_api/urls.py
from django.urls import path
from .views import MotoListCreateView, MotoRetrieveUpdateDeleteView, MotosListView

urlpatterns = [
    path('', MotosListView.as_view(), name='moto_list'),  # Para listar todas las motos
    path('motos/', MotoListCreateView.as_view(), name='moto_list_create'),  # Para crear nuevas motos
    path('motos/<int:pk>/', MotoRetrieveUpdateDeleteView.as_view(), name='motos_detail_update_delete'),  # Para detalle, actualización y eliminación
]
