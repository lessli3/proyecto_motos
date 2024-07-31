from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Moto
from .serializers import MotoSerializer

# Vista para renderizar la página principal con la lista de motos
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    motos = Moto.objects.all()
    serializer = MotoSerializer(motos, many=True)
    is_admin = request.user.is_staff
    username = request.user.username  # Obtener el nombre de usuario
    return render(request, 'index.html', {'motos': motos, 'is_admin': is_admin, 'username': username})
    return JsonResponse(serializer.data, safe=False)


# Vistas de la API
class MotoListCreateView(generics.ListCreateAPIView):
    queryset = Moto.objects.all()
    serializer_class = MotoSerializer
    permission_classes = [IsAuthenticated]

class MotoRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Moto.objects.all()
    serializer_class = MotoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

class MotosListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        motos = Moto.objects.all()
        serializer = MotoSerializer(motos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        serializer = MotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MotoDetailApiView(APIView):
    permission_classes = [AllowAny]
    
    def get_object(self, moto_id):
        try:
            return Moto.objects.get(id=moto_id)
        except Moto.DoesNotExist:
            return None

    def get(self, request, moto_id, *args, **kwargs):
        moto = self.get_object(moto_id)
        if moto is None:
            return Response({"error": "Moto not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MotoSerializer(moto)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, moto_id, *args, **kwargs):
        moto = self.get_object(moto_id)
        if moto is None:
            return Response({"error": "Moto not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MotoSerializer(moto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, moto_id, *args, **kwargs):
        moto = self.get_object(moto_id)
        if moto is None:
            return Response({"error": "Moto not found"}, status=status.HTTP_404_NOT_FOUND)
        moto.delete()
        return Response({"message": "Moto deleted"}, status=status.HTTP_204_NO_CONTENT)
