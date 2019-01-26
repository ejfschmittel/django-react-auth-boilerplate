from rest_framework import serializers
from ..models import MyUser
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id','username', 'email')

# Register User Serializer
class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ("username", "email", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

#authneticate needs request now

class UserLoginSerializer(JSONWebTokenSerializer):
    username_field = 'username_or_email'

    def validate(self, attrs):

        password = attrs.get("password")
        user_obj = MyUser.objects.filter(email=attrs.get("username_or_email")).first() or MyUser.objects.filter(username=attrs.get("username_or_email")).first()
        print(password)
  
        if user_obj is not None:
            credentials = {
                'username': user_obj.username,
                'password': password
            }
            print("in here")
            if all(credentials.values()):
                user = authenticate(**credentials)
                print(user)
                if user:
                    if not user.is_active:
                        msg = 'User account is not activated.'
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user)

                    return {
                        'token': jwt_encode_handler(payload),
                        'user': user
                    }
                else:
                    msg = 'Unable to log in with provided credentials.'
                    raise serializers.ValidationError(msg)

            else:
                msg = 'Must include "{username_field}" and "password".'
                msg = msg.format(username_field=self.username_field)
                raise serializers.ValidationError(msg)

        else:
            msg = 'Account with this email/username does not exists'
            raise serializers.ValidationError(msg)
