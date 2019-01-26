from django.urls import path, re_path
from rest_framework_jwt.views import refresh_jwt_token, ObtainJSONWebToken

from .views import CreateUserAPIView
from .serializers import UserLoginSerializer

urlpatterns = [
    path('', CreateUserAPIView.as_view(), name="create"),
    path('refresh_token/', refresh_jwt_token, name="refresh"),
    path('login/', ObtainJSONWebToken.as_view(serializer_class=UserLoginSerializer), name="login"),
]

