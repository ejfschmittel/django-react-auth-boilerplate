from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from django.core.validators import RegexValidator

USERNAME_REGEX = '^[a-zA-Z0-9]+$'

class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not username:
            raise ValueError("Users must have a username")

        

        user = self.model(
            email=self.normalize_email(email),
            username=username.lower(),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email,
            username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    username = models.CharField(
        verbose_name='username',
        max_length=64,
        unique=True,
        validators=[
            RegexValidator(
                regex=USERNAME_REGEX,
                message="username must be alphanumeric",
                code='invalid username'
            )
        ]
    )

    #TODO: add email activation
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
