import json
from rest_framework.decorators import api_view, permission_classes
# from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .utils import getDocsList, getDocDetail, createDoc, deleteDoc, updateDoc
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
# from django.views.decorators.http import require_POST



from .models import (
    Contract,
    ProjectTimeLine,
    ProjectPlan,
    ProjectName,
    StaffMember,
    Documents,
    FileLoadInfo,
    ProjectDetail,
    ProjectProgressStatus,
    # Test,
    # FilesAdmin,
)
from .serializer import (
    ContractSerializer,
    ProjectTimelineSerializer,
    ProjectPlanSerializer,
    ProjectNameSerializer,
    StaffMemberSeriazlier,
    DocumentsSerializer,
    FileLoadInfoSerializer,
    ProjectDetailSeriazlier,
    ProjectProgressStatusSerialzier,
    # TestSerializer,
    # FilesAdminSerializer,
)


# Create your views here.
# jwt_token post access and  refresh
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# 文件台帐
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def getDocs(request):
    # user= request.user
    # print(user)
    if request.method == "GET":
        return getDocsList(request)

    if request.method == "POST":
        return createDoc(request)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def getDoc(request, pk):
    if request.method == "GET":
        return getDocDetail(request, pk)
    if request.method == "DELETE":
        return deleteDoc(request, pk)
    if request.method == "PUT":
        return updateDoc(request, pk)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def docLists(request):
    if request.method == "GET":
        docs = Documents.objects.all().order_by("-created_at")
        serializers = DocumentsSerializer(docs, many=True)
        return Response(serializers.data)

    if request.method == "POST":
        data = request.data
        doc = Documents.objects.create(**data)
        serializers = DocumentsSerializer(doc, many=False)
        return Response(serializers.data)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def docDetail(request, pk):
    if request.method == "GET":
        docs = Documents.objects.get(id=pk)
        serializers = DocumentsSerializer(docs, many=False)
        return Response(serializers.data)

    if request.method == "PUT":
        data = request.data
        doc = Documents.objects.get(id=pk)
        print(doc)
        serializers = DocumentsSerializer(instance=doc, data=data)
        if serializers.is_valid():
            serializers.save()
        return Response(serializers.data)

    if request.method == "DELETE":
        doc = Documents.objects.get(id=pk)
        doc.delete()
        return Response("Doc wa deleted!")


# 合同管理
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def getContracts(request):
    if request.method == "GET":
        contracts = Contract.objects.all().order_by("-created_at")
        serializers = ContractSerializer(contracts, many=True)
        return Response(serializers.data)
    if request.method == "POST":
        data = request.data
        # print(data)
        find_data = Contract.objects.filter(number=data["number"])
        if len(find_data) > 0:
            return Response(
                {"message": "number duplicated,create failed", "success": False},
                status=status.HTTP_226_IM_USED,
            )
        doc = Contract.objects.create(**data)
        serializers = ContractSerializer(doc, many=False)
        return Response(serializers.data)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def getContractDetail(request, pk):
    # print(pk);
    # print(request.method)
    if request.method == "GET":
        contract = Contract.objects.get(id=pk)
        serializer = ContractSerializer(contract, many=False)
        return Response(serializer.data)

    if request.method == "PUT":
        data = request.data
        contract = Contract.objects.get(id=pk)
        serializer = ContractSerializer(instance=contract, data=data)

        if serializer.is_valid():
            serializer.save()
            print('ok')
            return Response(serializer.data)
        return Response(serializer.errors)


# 时间轴管理
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def projectTimelineLists(request):
    if request.method == "GET":
        items = ProjectTimeLine.objects.all()
        serializers = ProjectTimelineSerializer(items, many=True)
        # print(items)
        return Response(serializers.data)
    if request.method == "POST":
        data = request.data
        # print(data)
        items = ProjectTimeLine.objects.create(**data)
        serializers = ProjectTimelineSerializer(items, many=False)
        return Response(serializers.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def projectTimelineDetail(request, pk):
    if request.method =="GET":
        items = ProjectTimeLine.objects.filter(projectName_id=pk).order_by("-specifyDay")
        # project_name = ProjectName.objects.get(id = pk)
        # print(project_name)
        # serializer_name = ProjectNameSerializer(project_name,many=False)
        serializers = ProjectTimelineSerializer(items, many=True)
        # info = {'items': serializers.data,"name":serializer_name.data}
        return Response(serializers.data)   


    

@api_view(["GET","PUT","DELETE"])
@permission_classes([IsAuthenticated])
def projectTimelineSingle(request,pk):

    if request.method == "GET":
        items = ProjectTimeLine.objects.filter(id=pk).first()

        serializers = ProjectTimelineSerializer(items,many=False)
        return Response(serializers.data)

    if request.method == 'PUT':
        data = request.data
        # data = json.loads(request.body)
        plan = ProjectTimeLine.objects.get(id=pk)
        serializers = ProjectTimelineSerializer(instance=plan,data=data)
        # print(serializers.is_valid())

        if serializers.is_valid():
            # print(data)  
            # print('serializers is valid') 
            serializers.save()
            return Response(serializers.data)
        # print(serializers.errors)
        else: return Response(serializers.errors)

    if request.method =="DELETE":
        item=ProjectTimeLine.objects.get(id=pk)
        item.delete()
        return Response('deleted')

# 项目计划管理
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def projectPlanLists(request):
    if request.method == "GET":
        plans = ProjectPlan.objects.all().order_by("-created_at")
        serializers = ProjectPlanSerializer(plans, many=True)
        return Response(serializers.data)

    if request.method == "POST":
        data = request.data
        # print(data)
        plan = ProjectPlan.objects.create(**data)
        serializers = ProjectPlanSerializer(plan, many=False)
        # return Response('data recived!')
        return Response(serializers.data)


@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def projectPlanDetail(request, pk):
    if request.method=='GET':
        plans = ProjectPlan.objects.get(id=pk)
        serializers = ProjectPlanSerializer(plans, many=False)
        return Response(serializers.data)
    
    if request.method == 'PUT':
        data = request.data
        plan = ProjectPlan.objects.get(id=pk)
        serializers = ProjectPlanSerializer(instance=plan,data=data)
        # print(serializers)  
        # print(serializers.is_valid())

        if serializers.is_valid():
            # print('serializers is valid') 
            serializers.save()
            return Response(serializers.data)
        # print(serializers.errors)
        return Response(serializers.errors)



# 项目名称管理
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def projectNameLists(request):
    if request.method == "GET":
        items = ProjectName.objects.all().order_by("projectName")
        # print(items)
        serializers = ProjectNameSerializer(items, many=True)
        return Response(serializers.data)
    if request.method == "POST":
        data = request.data
        # print(data)
        plans = ProjectName.objects.create(**data)
        serializers = ProjectNameSerializer(plans, many=False)
        return Response(serializers.data)
    # return Response(serializers.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def projectNameDetail(request, pk):
    plans = ProjectName.objects.get(id=pk)
    serializers = ProjectNameSerializer(plans, many=False)

    return Response(serializers.data)

# 班组员工查询
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staffMemberLists(request):
    members = StaffMember.objects.all()
    serializers = StaffMemberSeriazlier(members, many=True)
    return Response(serializers.data)


import os
from django.conf import settings
from django.http import HttpResponse, Http404

# 上传下载文件台账

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fileLists(request):
    file_menu = FileLoadInfo.objects.all().order_by("-created_at")
    serializers = FileLoadInfoSerializer(file_menu, many=True)
    return Response(serializers.data)


# 上传文档并将数据存入数据库
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def file_upload(request):
    if request.method == "POST":
        item = request.FILES["file"]

        file_name = item.name
        file_path = "upload/" + file_name
        user_id = request.user.id
        # Upload the file to the server.
        with open(file_path, "wb") as f:
            f.write(item.read())
        # save info in the database
        file_info = FileLoadInfo(
            file_name=str(file_name), file_path=str(file_path), user_id=user_id
        )
        file_info.save()
        return Response("success")
    else:
        return Response("failed")

# download file
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from .models import FileLoadInfo

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def file_download(request, pk):
    if request.method == "GET":
        file_info = FileLoadInfo.objects.get(id=pk)
        if os.path.exists(file_info.file_path):
            with open(file_info.file_path, "rb") as f:
                file_contents = f.read()
            import mimetypes
            file_name = file_info.file_name
            mt = mimetypes.guess_type(file_name)[0]
            # response = HttpResponse(file_contents, content_type="application/octet-stream")
            response = HttpResponse(file_contents, content_type=mt)
            response["Content-Disposition"] = 'attachment; filename="{0}"'.format(
                file_info.file_name.replace(' ','-')
            )
            return response
        raise Http404

    if request.method == "PUT":
        data = request.data
        download = FileLoadInfo.objects.get(id=pk)
        serializer = FileLoadInfoSerializer(instance=download, data=data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def fileDownload(request, pk):
    if request.method == "GET":
        file_info = FileLoadInfo.objects.filter(id=pk)
        path = file_info[0].file_path
        file_path = os.path.join(settings.MEDIA_ROOT, path)

        if os.path.exists(file_path):
            with open(file_path, "rb") as fh:
                response = HttpResponse(
                    fh.read(), content_type="application/vnd.ms-excel"
                )
                response[
                    "Content-Disposition"
                ] = "inline; filename=" + os.path.basename(file_path)
                return response
        raise Http404

    if request.method == "PUT":
        data = request.data
        # print(data)
        download = FileLoadInfo.objects.get(id=pk)
        serializer = FileLoadInfoSerializer(instance=download, data=data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def projectDetailLists(request):

    if request.method =='GET':
        lists = ProjectDetail.objects.all().order_by('productModel')
        serializers = ProjectDetailSeriazlier(lists,many=True)
        return Response(serializers.data)


    if request.method =='POST':
        data = request.data
        item = ProjectDetail.objects.create(**data)
        serializers = ProjectDetailSeriazlier(item,many=False)
        return Response(serializers.data)
    
@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def projectDetailItem(request,pk):

    if request.method =='GET':
        lists = ProjectDetail.objects.get(id=pk)
        serializers = ProjectDetailSeriazlier(lists,many=False)
        return Response(serializers.data)


    if request.method =='PUT':
        data = request.data
        item = ProjectDetail.objects.get(id=pk)
        serializers = ProjectDetailSeriazlier(instance=item,data=data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)   
        return Response(serializers.errors)


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def projectProgressStatusLists(request):
    if request.method == "GET":
        lists = ProjectProgressStatus.objects.all()
        serializers = ProjectProgressStatusSerialzier(lists,many=True)
        return Response(serializers.data)
    
    if request.method == "POST":
        data = request.data
        item = ProjectProgressStatus.objects.create(**data)
        serializers = ProjectProgressStatusSerialzier(item,many=False)
        # serializers.save()
        # if serializers.is_valid():
        return Response(serializers.data)
        # return Response(serializers.errors)


@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def projectProgressStatusDetail(request,pk):

    if request.method == "GET":
        item = ProjectProgressStatus.objects.get(projectName=pk)
        # print('projectName:',item)
        serializers = ProjectProgressStatusSerialzier(item,many=False)
        return Response(serializers.data)
        # if serializers.is_valid():
        #     return Response(serializers.data)
        # return  Response(serializers.errors)
    if request.method == "PUT":
        data = request.data
        item = ProjectProgressStatus.objects.get(projectName=pk)
        serializers = ProjectProgressStatusSerialzier(instance = item,data=data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors)


@api_view(["GET","PUT"])
def getProjectPlanProgressChart(request):
    plan_progress_data = ProjectProgressStatus.objects.filter(is_current_project=True)
    plan_progress_serializers = ProjectProgressStatusSerialzier(plan_progress_data,many=True)

    contracts = Contract.objects.all()
    # contracts = projects.contract_set.all()
    contracts_serializers = ContractSerializer(contracts,many=True)

    return Response({
        'planStatusData': plan_progress_serializers.data,
        'contractsData': contracts_serializers.data,
    })


# @api_view(["GET"])

# def randomFunc(request):
#     pass
# @api_view(["GET","PUT"])
# def testDetail(request,pk):
#     if request.method == "GET":
#         plan = ProjectPlan.objects.get(id=pk)
#         # status = plan.test.all()        # status = plan.projectProgressStatus_set.all()
#         # print(plan)
#         # print('projectName:',item)
#         planserializers = ProjectPlanSerializer(plan,many=False)
#         statusserializers = TestSerializer(status,many=False)
#         # print(statusserializers.data)
#         return Response(planserializers.data)
#         # return Response(planserializers.data,statusserializers.data)

# @api_view(["GET","POST"])
# def testLists(request):
#     if request.method == "POST":
#         data=request.data
#         status = Test.objects.create(**data)
#         statusserializers = TestSerializer(status,many=False)
#         # print(statusserializers.data)
#         return Response(statusserializers.data)





# import mimetypes
# @api_view(["GET"])
# def download(request,path):
#     print('go into the views.download function to handle the download request')
#     file_path = os.path.join(settings.MEDIA_ROOT,path)
#     if os.path.exists(file_path):
#         file_name = os.path.basename(file_path)
#         # print(file_name)
#         mt = mimetypes.guess_type(file_name)[0]
#         with open(file_path,'rb') as fh:
#             response=HttpResponse(fh.read(),conent_type=mt)
#             # response['content-Disposition']='inline;filename='+file_name
#             response['content-Disposition']='attachment;filename='+file_name
#             return response
#     raise Http404


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def fileAdminUploadLists(request):
#     files_set = FilesAdmin.objects.all().order_by('-created_at')
#     serilaizers = FilesAdminSerializer(files_set,many=True)
#     return Response(serilaizers.data)
