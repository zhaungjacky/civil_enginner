from django.urls import path,re_path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
# from .views import MyTokenObtainPairView,projectTimelinLists,projectTimeDetail


urlpatterns =[
    path('docs/<str:pk>', views.getDoc),
    path('docs', views.docLists),

    path('timeline/<str:pk>/modify', views.projectTimelineSingle),
    path('timeline/<str:pk>', views.projectTimelineDetail),
    path('timeline', views.projectTimelineLists),


    path('contract/<str:pk>',views.getContractDetail),
    path('contract',views.getContracts),

    # path('contract/<str:pk>',views.getContractDetail),
    
    path('plan/<str:pk>',views.projectPlanDetail),
    path('plan',views.projectPlanLists),

    path('plan-status/<str:pk>',views.projectProgressStatusDetail),
    path('plan-status',views.projectProgressStatusLists),


    # path('plan-test/<str:pk>',views.testDetail),
    # path('plan-test',views.testLists),

    
    path('project-name/<str:pk>',views.projectNameDetail),
    path('project-name',views.projectNameLists),

    path('project-info',views.projectDetailLists),
    path('project-info/<str:pk>',views.projectDetailItem),

    path('staff-member',views.staffMemberLists),

    # path('file/<str:pk>',views.file_download),
    # path('file/<str:pk>',views.downFile),
    path('file/<str:pk>',views.file_download),
    path('file-upload',views.file_upload),
    # path('file',views.fileAdminUploadLists), # table=FileLoadInfo
    path('file',views.fileLists), # table=FilesAdmin

    path('statistics',views.getProjectPlanProgressChart),
    # path('media/<str:path>',views.download),


    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # re_path(r'^media/(?P<path>.*)$',views.download),    



]