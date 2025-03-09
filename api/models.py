from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

# Create your models here.
 
class ProjectName(models.Model):
    projectName = models.CharField(max_length=30,unique=True,blank=False,null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=False,default='admin')
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    def __str__(self):
        return self.projectName  

class StaffMember(models.Model):
    charger = models.CharField(max_length=50,null = False,blank=False,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    projectsInCharge = models.ManyToManyField(ProjectName,default='admin')
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True,auto_created=True)
    def __str__(self):
        return self.charger 
 
class Documents(models.Model):
    comment = '无'
    type_name = models.CharField(max_length=30,blank=False)
    number = models.CharField(max_length=30,blank=False,unique=True)
    fileName = models.CharField(max_length=50,blank=False)
    publishDate = models.DateTimeField(null=True)
    launchDate = models.DateTimeField(null=True)
    remark = models.CharField(max_length=500,blank = True)
    jingbanren = models.CharField(max_length=30,blank = True)
    qianfa = models.CharField(max_length=30,blank = True)
    neiwaibu = models.CharField(max_length=30,blank = True)
    duifangmingcheng = models.CharField(max_length=50,blank = True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=50,blank=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,null = True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return self.fileName     
   
class Contract(models.Model):
    projectName = models.ForeignKey(ProjectName,unique=False,blank=True,on_delete=models.DO_NOTHING,default="")
    number = models.CharField(max_length=50,blank=False,unique=True)
    supplier = models.CharField(max_length=50,blank=True)
    signDate = models.DateTimeField(default=timezone.now)
    totalAmount = models.DecimalField(decimal_places=2,blank=False,max_digits=20)
    content = models.TextField(blank=True)
    bidNumber = models.CharField(max_length=50,blank=True)
    bidType = models.CharField(max_length=30,blank=True)
    financialAdvice = models.TextField(blank=True)
    legalAdvice = models.TextField(blank=True)
    supervisor = models.CharField(max_length=30,blank=True)
    supplyChainManager = models.CharField(max_length=30,blank=True)
    implementationOfAdvices = models.TextField(blank=True)
    payment = models.TextField(blank=True)
    operator = models.CharField(max_length=30,blank=True)
    taxRate = models.DecimalField(decimal_places=2,max_digits=50,default=0.13)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING, null = True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return self.number     

class ProjectTimeLine(models.Model):
    projectName = models.ForeignKey(ProjectName,on_delete=models.DO_NOTHING,blank=False)
    specifyDay = models.DateField(default=timezone.now)
    keyPoint = models.TextField(max_length=100,blank=False,default='某关键事项')
    groups = models.CharField(max_length=100,verbose_name='参与人员',blank=False,default="**单位,**人员")
    mainSection = models.CharField(max_length=30,default="资源与工程事业部",blank=False)
    output = models.TextField(max_length=500,verbose_name="输出会议纪要、文件、资料等",blank=False,default="**会议纪要等")
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=False,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return f'{self.projectName}-{self.keyPoint}-{self.specifyDay}'     
   
class ProjectPlan(models.Model):

    BID_TYPE = [
            ("EPC","EPC"),
            ("初设后招标","初设后招标"),
            ("工程量清单招标","工程量清单招标"),
            ("平行发包","平行发包"),
            ("固定总价","固定总价"),
            ("其他类别","其他类别"),
        ]
    projectName = models.ForeignKey(ProjectName,on_delete=models.DO_NOTHING,blank=False)
    fuzeren_xiangmu = models.CharField(max_length=500,blank=True,default="某人-某项目")
    bidType = models.CharField(max_length=100, choices=BID_TYPE)

    gongsilixiang = models.DateField(blank=True)
    gongyibujudingban = models.DateField(blank=True)
    keyanzhaobiao = models.DateField(blank=True)
    touweihui = models.DateField(blank=True)
    gongsijuece = models.DateField(blank=True)
    gudong_jituanbeian = models.DateField(blank=True)
    
    zhengfulixiang = models.DateField(blank=True)
    dikancehui = models.DateField(blank=True)
    tudizheng = models.DateField(blank=True)
    yongdiguihua = models.DateField(blank=True)

    zhaobiaodaili = models.DateField(blank=True)
    shigongfang_zhaobiao = models.DateField(blank=True)
    
    chubusheji = models.DateField(blank=True)
    shigongtu = models.DateField(blank=True)
    gongchengguihua = models.DateField(blank=True)
    jianlizhaobiao = models.DateField(blank=True)
    xiangguanzhaobiao = models.DateField(blank=True)
    shigongxukezheng = models.DateField(blank=True)

    jichu = models.DateField(blank=True)
    gangjiegou_zhizuo = models.DateField(blank=True)
    gangjiegou_anzhuang = models.DateField(blank=True)
    gangjiegou_weihu = models.DateField(blank=True)
    diping_chuli = models.DateField(blank=True)
    diaochejichu_chuli = models.DateField(blank=True)
    angmian_wumianban = models.DateField(blank=True)
    peidianxitong = models.DateField(blank=True)
    xiaofangxitong = models.DateField(blank=True)
    yuwuchulixitong = models.DateField(blank=True)
    gufeizhan = models.DateField(blank=True)
    qitafushu_sheshi = models.DateField(blank=True)
    diaoche_shebei_anzhuang = models.DateField(blank=True)
    # chargers = models.ManyToManyField(StaffMember,null=True,blank=True)    
    charger = models.CharField(max_length=50,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    modify_name = models.CharField(max_length=20,blank=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True,default=1)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    def __str__(self):
        return f'{self.projectName}'
        # return self.fuzeren_xiangmu

class FileLoadInfo(models.Model):
    file_name = models.CharField(max_length=300,blank=False)
    file_path = models.CharField(max_length=300,blank=False)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True,null=True)
    download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)
    
    def __str__(self):
        return self.file_name

class FilesAdmin(models.Model):
    adminupload = models.FileField(upload_to='media',null=False)
    # file_path = models.FilePathField()
    title= models.CharField(max_length=100,null=False)
    download_count = models.IntegerField(default=0)
    mimitype = models.CharField(max_length=200,default='application/adminupload')
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return self.title
   
class ProjectDetail(models.Model):
    projectName = models.ForeignKey(ProjectName,on_delete=models.DO_NOTHING,null=False)
    contractDay = models.DateTimeField(default=timezone.now)
    contractNo = models.CharField(max_length=50,blank=True)
    contractDuration = models.IntegerField(default=180)
    projectPlace = models.CharField(max_length=50,blank=True)
    totalPrice = models.DecimalField(max_digits=11,decimal_places=2,blank=True)
    constructionContent = models.TextField(max_length=1000,blank=True)
    productModel = models.CharField(max_length=200,blank=True)
    annualcapacity = models.CharField(max_length=50,blank=True)
    buildingdetails = models.CharField(max_length=500,blank=True)
    liftheight = models.CharField(max_length=20,blank=True)
    maxcrane = models.CharField(max_length=20,blank=True)
    whotobuild = models.CharField(max_length=20,blank=True)
    chargerone = models.CharField(max_length=20,blank=True)
    chargertwo = models.CharField(max_length=20,blank=True)
    lessor = models.CharField(max_length=100,blank=True)
    investment = models.DecimalField(max_digits=11,decimal_places=2,blank=True)
    economicPerformance = models.DecimalField(max_digits=11,decimal_places=2,blank=True)
    hetongfenjiebiao = models.CharField(max_length=200,blank=True)
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
    xiangguanfang = models.CharField(max_length=200,blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,default=1)
    def __str__(self):
        return f'{self.projectName}'
    
class ProjectProgressStatus(models.Model):
    projectName = models.ForeignKey(ProjectName,on_delete=models.CASCADE,blank=False,default='**项目')
    gongsilixiang_status = models.BooleanField(default=False)
    gongyibujudingban_status = models.BooleanField(default=False)
    keyanzhaobiao_status = models.BooleanField(default=False)
    touweihui_status = models.BooleanField(default=False)
    gongsijuece_status = models.BooleanField(default=False)
    gudong_jituanbeian_status = models.BooleanField(default=False)

    zhengfulixiang_status = models.BooleanField(default=False)
    dikancehui_status = models.BooleanField(default=False)
    tudizheng_status = models.BooleanField(default=False)
    yongdiguihua_status = models.BooleanField(default=False)

    zhaobiaodaili_status = models.BooleanField(default=False)
    shigongfang_zhaobiao_status = models.BooleanField(default=False)
    
    chubusheji_status = models.BooleanField(default=False)
    shigongtu_status = models.BooleanField(default=False)
    gongchengguihua_status = models.BooleanField(default=False)
    jianlizhaobiao_status = models.BooleanField(default=False)
    xiangguanzhaobiao_status = models.BooleanField(default=False)
    shigongxukezheng_status = models.BooleanField(default=False)

    jichu_status = models.BooleanField(default=False)
    gangjiegou_zhizuo_status = models.BooleanField(default=False)
    gangjiegou_anzhuang_status = models.BooleanField(default=False)
    gangjiegou_weihu_status = models.BooleanField(default=False)
    diping_chuli_status = models.BooleanField(default=False)
    diaochejichu_chuli_status = models.BooleanField(default=False)
    angmian_wumianban_status = models.BooleanField(default=False)
    peidianxitong_status = models.BooleanField(default=False)
    xiaofangxitong_status = models.BooleanField(default=False)
    yuwuchulixitong_status = models.BooleanField(default=False)
    gufeizhan_status = models.BooleanField(default=False)
    qitafushu_sheshi_status = models.BooleanField(default=False)
    diaoche_shebei_anzhuang_status = models.BooleanField(default=False)

    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    modify_name  = models.CharField(max_length=30,blank=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True,default=1)
    is_current_project = models.BooleanField(default=False,blank=False)
    id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,auto_created=True,primary_key=True)

    def __str__(self):
        # return str(self.projectName)
        return f'{self.projectName}'
   


# class Test(models.Model):
#     # projectName = models.ForeignKey(ProjectName,on_delete=models.CASCADE,blank=False,default='**项目',unique=True)
#     # projectName = models.ForeignKey(ProjectPlan,on_delete=models.DO_NOTHING,blank=False,unique=True,to_field='projectName')
#     projectName = models.OneToOneField(ProjectPlan,on_delete=models.CASCADE,primary_key=True)
#     gongsilixiang_status = models.BooleanField(default=False)
#     gongyibujudingban_status = models.BooleanField(default=False)
#     keyanzhaobiao_status = models.BooleanField(default=False)
#     touweihui_status = models.BooleanField(default=False)
#     gongsijuece_status = models.BooleanField(default=False)
#     gudong_jituanbeian_status = models.BooleanField(default=False)

#     zhengfulixiang_status = models.BooleanField(default=False)
#     dikancehui_status = models.BooleanField(default=False)
#     tudizheng_status = models.BooleanField(default=False)
#     yongdiguihua_status = models.BooleanField(default=False)

#     zhaobiaodaili_status = models.BooleanField(default=False)
#     shigongfang_zhaobiao_status = models.BooleanField(default=False)
    
#     chubusheji_status = models.BooleanField(default=False)
#     shigongtu_status = models.BooleanField(default=False)
#     gongchengguihua_status = models.BooleanField(default=False)
#     jianlizhaobiao_status = models.BooleanField(default=False)
#     xiangguanzhaobiao_status = models.BooleanField(default=False)
#     shigongxukezheng_status = models.BooleanField(default=False)

#     jichu_status = models.BooleanField(default=False)
#     gangjiegou_zhizuo_status = models.BooleanField(default=False)
#     gangjiegou_anzhuang_status = models.BooleanField(default=False)
#     gangjiegou_weihu_status = models.BooleanField(default=False)
#     diping_chuli_status = models.BooleanField(default=False)
#     diaochejichu_chuli_status = models.BooleanField(default=False)
#     angmian_wumianban_status = models.BooleanField(default=False)
#     peidianxitong_status = models.BooleanField(default=False)
#     xiaofangxitong_status = models.BooleanField(default=False)
#     yuwuchulixitong_status = models.BooleanField(default=False)
#     gufeizhan_status = models.BooleanField(default=False)
#     qitafushu_sheshi_status = models.BooleanField(default=False)
#     diaoche_shebei_anzhuang_status = models.BooleanField(default=False)

#     created_at  = models.DateTimeField(auto_now_add=True)
#     updated_at  = models.DateTimeField(auto_now=True)
#     modify_name  = models.CharField(max_length=30,blank=True)
#     user = models.ForeignKey(User,on_delete=models.DO_NOTHING,blank=True,default=1)
#     id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,auto_created=True)

#     def __str__(self):
#         # return str(self.projectName)
#         return f'projectName={self.projectName}'
   