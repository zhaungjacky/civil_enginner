
from django.contrib import admin
from django.urls import path,include
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls')),
    path('media/',include('users.urls')),
    path('',TemplateView.as_view(template_name = 'index.html')),

]

if settings.DEBUG:
    urlpatterns  += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

