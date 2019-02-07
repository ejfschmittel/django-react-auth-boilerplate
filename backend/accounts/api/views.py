from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import UserCreateSerializer
from ..models import MyUser



class CreateUserAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = MyUser.objects.all()
    serializer_class = UserCreateSerializer


class AuthView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        print(user)
        msg = "You are authenticated as " + str(user)
        return Response(msg)








