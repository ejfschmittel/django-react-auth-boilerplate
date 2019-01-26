from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserCreateSerializer
from ..models import MyUser



class CreateUserAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = MyUser.objects.all()
    serializer_class = UserCreateSerializer







