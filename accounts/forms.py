from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import CustomUser

class UserCreationForm(forms.ModelForm):
    ''' Create User (Admin Panel) '''
    password1 = forms.CharField(
        label='Parola',
        widget=forms.PasswordInput,
        help_text='En az 8 karakter olmalı'
    )
    password2 = forms.CharField(
        label='Parola Doğrulama',
        widget=forms.PasswordInput,
        help_text='Parolanızı tekrar girin'
    )
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'profile_picture']
        
    def clean_password2(self):
        pw1 = self.cleaned_data.get('password1')
        pw2 = self.cleaned_data.get('password2')
        
        if pw1 != pw2:
            raise forms.ValidationError('Şifreler eşleşmiyor')
        return pw2

    def save(self, commit=True):
        user = super().save(commit=False)
        # şifreyi hashle
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user
    
class UserChangeForm(forms.ModelForm):
    ''' Update User (Admin Panel) '''       
    password = ReadOnlyPasswordHashField(label="Parola", help_text="Parolayı değiştirmek için <a href=\"../password/\">bu formu</a> kullanın.")

    class Meta:
        model = CustomUser
        fields = '__all__'  # veya ['email', 'first_name', 'last_name', ...] gibi

    def clean_password(self):
        # Admin panelde kullanıcıyı kaydederken mevcut şifreyi koru
        return self.initial.get("password")
