from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Documents)
admin.site.register(models.Contract)

admin.site.register(models.StaffMember)

admin.site.register(models.ProjectName)
admin.site.register(models.ProjectTimeLine)
admin.site.register(models.ProjectPlan)
admin.site.register(models.ProjectDetail)

admin.site.register(models.FilesAdmin)
admin.site.register(models.FileLoadInfo)
admin.site.register(models.ProjectProgressStatus)
