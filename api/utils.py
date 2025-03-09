from rest_framework.response import Response
from .models import Documents
from .serializer import DocumentsSerializer
from rest_framework import status

def getDocsList(request):
    # headers = request.headers
    # print('headers:',headers)
    # docs = user.documents_set.all().order_by('-created')
    docs = Documents.objects.all().order_by('-created_at')
    serializer = DocumentsSerializer(docs, many=True)
    return Response(serializer.data)

def getDocDetail(request,pk):
    docs = Documents.objects.get(id=pk)
    serializer = DocumentsSerializer(docs, many=False)
    return Response(serializer.data)

def createDoc(request):
    data = request.data
    # print(data['number'])
    finded_item = Documents.objects.filter(number = data['number'])
    # print(serializer0.data)
    if  len(finded_item) > 0:
        return Response({"message":"number duplicated,create failed","success": False},status=status.HTTP_226_IM_USED)
    doc = Documents.objects.create(**data)
    # doc = Documents.objects.create(body=data['body'])
    serializer = DocumentsSerializer(doc, many=False)
    return Response(serializer.data)

def deleteDoc(request,pk):
    doc = Documents.objects.get(id=pk)
    doc.delete()
    return Response('Doc was deleted!')

def updateDoc(request,pk):
    data = request.data
    print(data['remark'])
    doc = Documents.objects.get(id=pk)
    serializer = DocumentsSerializer(instance=doc,data=data)

    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data)
    return Response('data Invalid,check that...')