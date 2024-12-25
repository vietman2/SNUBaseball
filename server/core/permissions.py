from rest_framework.permissions import BasePermission

from person.user.utils import is_admin

class IsAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_authenticated and obj.author == request.user

class IsAuthorOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        return obj.author == request.user or is_admin(request.user)

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and is_admin(request.user)
