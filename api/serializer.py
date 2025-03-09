from rest_framework.serializers import ModelSerializer
from .models import Documents,Contract,ProjectTimeLine,ProjectPlan,ProjectName,StaffMember,FileLoadInfo,FilesAdmin,ProjectDetail,ProjectProgressStatus
from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Profile

PROJECT_NAME = 'projectName.projectName'
USER_NAME = 'user.username'

class ProjectNameSerializer(ModelSerializer):
    class Meta:
        model = ProjectName
        fields = ['id',"projectName"]

class UserSerializer(ModelSerializer):
    
    class Meta:
        model = User
        fields= ['id','username']
        # fields= ['id','username','email','first_name','last_name','is_active','is_staff','is_superuser']

class StaffMemberSeriazlier(ModelSerializer):
    # project_name = serializers.ManyRelatedField(child_relation="projectName.projectName",many=True)
    projectsInCharge = ProjectNameSerializer(many=True)
    user = UserSerializer()
    class Meta:
        model = StaffMember
        fields = ['charger','projectsInCharge','user','id',]

class DocumentsSerializer(ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = Documents
        fields = '__all__'

class ContractSerializer(ModelSerializer):
    project_name = serializers.CharField(source=PROJECT_NAME)
    class Meta:
        model = Contract
        order=['ProjectName']
        fields = '__all__'

class ProjectTimelineSerializer(ModelSerializer):
    # projectName = ProjectNameSerializer()
    # user = UserSerializer()
    project_name = serializers.CharField(source=PROJECT_NAME)
    user_name = serializers.CharField(source=USER_NAME)
    class Meta:
        model = ProjectTimeLine
        fields = '__all__'
        

class ProjectPlanSerializer(ModelSerializer):
    # projectName = ProjectNameSerializer()
    project_name = serializers.CharField(source=PROJECT_NAME)
    class Meta:
        model = ProjectPlan
        fields = '__all__'

class FileLoadInfoSerializer(ModelSerializer):
    user_name = serializers.CharField(source=USER_NAME)
    class Meta:
        model = FileLoadInfo
        fields = '__all__'

class FilesAdminSerializer(ModelSerializer):
    user_name = serializers.CharField(source=USER_NAME)
    class Meta:
        model = FilesAdmin
        fields = '__all__'

class ProjectDetailSeriazlier(ModelSerializer):
    project_name = serializers.CharField(source=PROJECT_NAME)
    class Meta:
        model = ProjectDetail
        fields = '__all__'    

class ProjectProgressStatusSerialzier(ModelSerializer):
    project_name = serializers.CharField(source=PROJECT_NAME)
    # project_name = serializers.CharField(source='projectPlan.projectName')
    class Meta:
        model = ProjectProgressStatus
        fields = '__all__'  

# class TestSerializer(ModelSerializer):
#     project_name = serializers.CharField(source='projectPlan.projectName')    
#     class Meta:
#         model = Test
#         fields = '__all__'  