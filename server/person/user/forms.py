from django import forms
from django.contrib import admin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from person.member.models import Member
from .models import User

class CustomUserCreationForm(forms.ModelForm):
    """Form for creating new users."""
    password    = forms.CharField(widget=forms.PasswordInput)
    member      = forms.ModelChoiceField(queryset=Member.objects.all())

    class Meta:
        model = User
        fields = ('username', 'is_staff', 'is_active', 'member')

    def clean_password(self):
        password = self.cleaned_data.get('password')
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        user.save()

        return user

class CustomUserChangeForm(forms.ModelForm):
    """Form for updating users."""
    ## make password read-only
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('username', 'is_active', 'is_staff')

class UserAdmin(admin.ModelAdmin):
    form = CustomUserChangeForm  # Form for editing users
    add_form = CustomUserCreationForm  # Form for creating users

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'member', 'is_staff', 'is_active'),
        }),
    )

    fieldsets = (
        (None, {'fields': ('username', 'password', 'member')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    def get_form(self, request, obj=None, change=False, **kwargs):
        if obj is None:
            kwargs['form'] = self.add_form
        else:
            kwargs['form'] = self.form
        return super().get_form(request, obj, change, **kwargs)
