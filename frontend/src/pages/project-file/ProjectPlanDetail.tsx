import TimelineItem from "@mui/lab/TimelineItem";
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import FlagIcon from "@mui/icons-material/Flag";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import DoneIcon from "@mui/icons-material/Done";
import BackHandIcon from "@mui/icons-material/BackHand";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RadarIcon from "@mui/icons-material/Radar";
import ApprovalIcon from "@mui/icons-material/Approval";
import SendIcon from "@mui/icons-material/Send";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DrawIcon from "@mui/icons-material/Draw";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FoundationIcon from "@mui/icons-material/Foundation";
import MediationIcon from "@mui/icons-material/Mediation";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CabinIcon from "@mui/icons-material/Cabin";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FireHydrantAltIcon from "@mui/icons-material/FireHydrantAlt";
import Co2Icon from "@mui/icons-material/Co2";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import * as XLSX from "xlsx";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, FormControlLabel, FormGroup, styled } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";
import { ProjectPlanType } from "../ProjectPlanPage";
export type ProjectPlanStatusType = {
  id?: string;
  project_name?: string;
  gongsilixiang_status: boolean;
  gongyibujudingban_status: boolean;
  keyanzhaobiao_status: boolean;
  touweihui_status: boolean;
  gongsijuece_status: boolean;
  gudong_jituanbeian_status: boolean;
  zhengfulixiang_status: boolean;
  dikancehui_status: boolean;
  tudizheng_status: boolean;
  yongdiguihua_status: boolean;
  zhaobiaodaili_status: boolean;
  shigongfang_zhaobiao_status: boolean;
  chubusheji_status: boolean;
  shigongtu_status: boolean;
  gongchengguihua_status: boolean;
  jianlizhaobiao_status: boolean;
  xiangguanzhaobiao_status: boolean;
  shigongxukezheng_status: boolean;
  jichu_status: boolean;
  gangjiegou_zhizuo_status: boolean;
  gangjiegou_anzhuang_status: boolean;
  gangjiegou_weihu_status: boolean;
  diping_chuli_status: boolean;
  diaochejichu_chuli_status: boolean;
  angmian_wumianban_status: boolean;
  peidianxitong_status: boolean;
  xiaofangxitong_status: boolean;
  yuwuchulixitong_status: boolean;
  gufeizhan_status: boolean;
  qitafushu_sheshi_status: boolean;
  diaoche_shebei_anzhuang_status: boolean;
  created_at?: Date;
  updated_at?: Date;
  modify_name?: string;
  is_current_project?: boolean;
  projectName?: string;
  user?: number;
};

type ColorType = "primary" | "secondary" | "error" | "success" | "info";

const MyFab = styled(Fab)(({ theme }) => ({
  margin: "5px 10px",
  size: {
    xs: "small",
    sm: "large",
  },
}));

export const icons = [
  { icon: <FlagIcon /> },
  { icon: <ViewComfyIcon /> },
  { icon: <DoneIcon /> },
  { icon: <BackHandIcon /> },
  { icon: <HowToVoteIcon /> },
  { icon: <VpnKeyIcon /> },
  { icon: <FlagIcon /> },
  { icon: <RadarIcon /> },
  { icon: <ApprovalIcon /> },
  { icon: <ApprovalIcon /> },
  { icon: <SendIcon /> },
  { icon: <EngineeringIcon /> },
  { icon: <DrawIcon /> },
  { icon: <DrawIcon /> },
  { icon: <ApprovalIcon /> },
  { icon: <VisibilityIcon /> },
  { icon: <ManageAccountsIcon /> },
  { icon: <ApprovalIcon /> },
  { icon: <FoundationIcon /> },
  { icon: <MediationIcon /> },
  { icon: <MediationIcon /> },
  { icon: <MediationIcon /> },
  { icon: <TrendingFlatIcon /> },
  { icon: <TrendingFlatIcon /> },
  { icon: <CabinIcon /> },
  { icon: <ElectricBoltIcon /> },
  { icon: <FireHydrantAltIcon /> },
  { icon: <Co2Icon /> },
  { icon: <LocalDrinkIcon /> },
  { icon: <AltRouteIcon /> },
  { icon: <PrecisionManufacturingIcon /> },
];

export const colors: ColorType[] = [
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "primary",
];

const ProjectPlanDetail = () => {
  const { state } = useLocation(); // receive prop from Link state.props
  const { id } = useParams();
  const { data } = useFetch<ProjectPlanType & { [index: string]: any }>(
    "api/plan/" + id
  );
  const { data: data_status } = useFetch<
    ProjectPlanStatusType & { [index: string]: any }
  >("api/plan-status/" + state?.project_name_id);
  const [onlyRead, setOnlyRead] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user, authTokens } = useAuth();
  const [msg, setMsg] = useState<string>();

  const [editable, setEditable] = useState<boolean>(false)

  useEffect(() => {
    if(data){
      setEditable(data.user === user?.user_id)
    }
  }, [data, user?.user_id])
  
  let cols = [
    // {id:'fuzeren_xiangmu',color: "text.secondary" , label:""},
    {
      progressState: "决策阶段",
      id: "gongsilixiang",
      color: colors[0],
      label: "立项",
      icon: icons[0].icon,
      departmentInCharge: "需求部门/项目公司",
      groupInCharge: "需求部门/项目公司",
    },
    {
      progressState: "决策阶段",
      id: "gongyibujudingban",
      color: colors[1],
      label: "工艺布局",
      icon: icons[1].icon,
      departmentInCharge: "资源/研究院-业务人员",
      groupInCharge: "资源与工程事业部",
    },
    {
      progressState: "决策阶段",
      id: "keyanzhaobiao",
      color: colors[2],
      label: "可研招标",
      icon: icons[2].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "决策阶段",
      id: "touweihui",
      color: colors[3],
      label: "投委会",
      icon: icons[3].icon,
      departmentInCharge: "运营-业务人员",
      groupInCharge: "运营中心",
    },
    {
      progressState: "决策阶段",
      id: "gongsijuece",
      color: colors[4],
      label: "公司总办/党委/董事会决策完成",
      icon: icons[4].icon,
      departmentInCharge: "运营-业务人员",
      groupInCharge: "运营中心",
    },
    {
      progressState: "决策阶段",
      id: "gudong_jituanbeian",
      color: colors[5],
      label: "集团备案",
      icon: icons[5].icon,
      departmentInCharge: "运营-业务人员",
      groupInCharge: "运营中心",
    },
    {
      progressState: "准备阶段",
      id: "zhengfulixiang",
      color: colors[6],
      label: "发改委立项",
      icon: icons[6].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "dikancehui",
      color: colors[7],
      label: "地勘测绘",
      icon: icons[7].icon,
      departmentInCharge: "地勘单位",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "tudizheng",
      color: colors[8],
      label: "土地证办理",
      icon: icons[8].icon,
      departmentInCharge: "业务人员/项管公司",
      groupInCharge: "项目公司",
    },
    {
      progressState: "准备阶段",
      id: "yongdiguihua",
      color: colors[9],
      label: "用地规划证",
      icon: icons[9].icon,
      departmentInCharge: "业务人员/项管公司",
      groupInCharge: "项目公司",
    },
    {
      progressState: "准备阶段",
      id: "zhaobiaodaili",
      color: colors[10],
      label: "招标代理单位",
      icon: icons[10].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "shigongfang_zhaobiao",
      color: colors[11],
      label: "设计/施工方招标",
      icon: icons[11].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "chubusheji",
      color: colors[12],
      label: "初步设计",
      icon: icons[12].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "设计院",
    },
    {
      progressState: "准备阶段",
      id: "shigongtu",
      color: colors[13],
      label: "施工图设计",
      icon: icons[13].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "设计院",
    },
    {
      progressState: "准备阶段",
      id: "gongchengguihua",
      color: colors[14],
      label: "项目规划证",
      icon: icons[14].icon,
      departmentInCharge: "业务人员/项管公司",
      groupInCharge: "项目公司",
    },
    {
      progressState: "准备阶段",
      id: "jianlizhaobiao",
      color: colors[15],
      label: "监理招标",
      icon: icons[15].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "资源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "xiangguanzhaobiao",
      color: colors[16],
      label: "项管招标",
      icon: icons[16].icon,
      departmentInCharge: "业务人员",
      groupInCharge: "源与工程事业部/项目公司",
    },
    {
      progressState: "准备阶段",
      id: "shigongxukezheng",
      color: colors[17],
      label: "项目开工",
      icon: icons[17].icon,
      departmentInCharge: "施工单位/相关方",
      groupInCharge: "施工单位/相关方",
    },
    {
      progressState: "施工阶段",
      id: "jichu",
      color: colors[18],
      label: "基础处理",
      icon: icons[18].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方",
    },
    {
      progressState: "施工阶段",
      id: "gangjiegou_zhizuo",
      color: colors[19],
      label: "钢结构制作",
      icon: icons[19].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "gangjiegou_anzhuang",
      color: colors[20],
      label: "钢结构安装",
      icon: icons[20].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "gangjiegou_weihu",
      color: colors[21],
      label: "钢结构维护",
      icon: icons[21].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "diping_chuli",
      color: colors[22],
      label: "地坪处理",
      icon: icons[22].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "diaochejichu_chuli",
      color: colors[23],
      label: "吊车基础处理",
      icon: icons[23].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "angmian_wumianban",
      color: colors[24],
      label: "墙面/屋面安装",
      icon: icons[24].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "peidianxitong",
      color: colors[25],
      label: "配电系统",
      icon: icons[25].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "xiaofangxitong",
      color: colors[26],
      label: "消防系统",
      icon: icons[26].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "yuwuchulixitong",
      color: colors[27],
      label: "雨水/污水处理系统",
      icon: icons[27].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "gufeizhan",
      color: colors[28],
      label: "固废站",
      icon: icons[28].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "qitafushu_sheshi",
      color: colors[29],
      label: "其他附属设施",
      icon: icons[29].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
    {
      progressState: "施工阶段",
      id: "diaoche_shebei_anzhuang",
      color: colors[30],
      label: "吊车/设备安装",
      icon: icons[30].icon,
      departmentInCharge: "施工方",
      groupInCharge: "施工方/资源/项目公司",
    },
  ];

  const jsonToExcel = () => {
    let sourceData: { [index: string]: any }[] = [];
    cols.forEach((item, index) => {
      if (data && data_status) {
        sourceData.push({
          序: String(index + 1),
          阶段划分: item.progressState,
          节点名称: item.label,
          时间点: new Date(data[item.id]),
          责任人员: item.departmentInCharge,
          责任部门: item.groupInCharge,
          当前进度: data_status[`${item.id}_status`] ? "已完成" : "未完成",
        });
      }
      return null;
    });

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(sourceData);

    XLSX.utils.book_append_sheet(wb, ws, "sheet-V00");
    XLSX.writeFile(wb, data?.project_name + "建设计划.xlsx");
    return null;
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const formData = new FormData(e.currentTarget);

    let modifiedData: ProjectPlanType & {[index:string]:any} = {} as ProjectPlanType;
    let modifedfDataStatus: ProjectPlanStatusType  & {[index:string]:any} = {} as ProjectPlanStatusType;
    if (data) {
      modifiedData["user"] = user?.user_id;
      modifiedData["modify_name"] = user?.username;
      modifiedData["bidType"] = data.bidType;
      modifiedData["projectName"] = data.projectName;
      modifiedData["fuzeren_xiangmu"] = data.fuzeren_xiangmu;
      modifiedData["charger"] = data.charger;

      modifedfDataStatus["user"] = user?.user_id;
      modifedfDataStatus["modify_name"] = user?.username;
      modifedfDataStatus["projectName"] = data.projectName;
      modifedfDataStatus["project_name"] = data?.project_name;

      Object.keys(data).forEach((key) => {
        if (
          key !== "id" &&
          key !== "projectName" &&
          key !== "user" &&
          key !== "fuzeren_xiangmu" &&
          key !== "bidType" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "modify_name" &&
          key !== "charger"
        ) {
          modifiedData[key] = new Date(formData.get(key) as string )
            .toLocaleDateString()
            .replaceAll("/", "-");
          let key_status = key + "_status";
          modifedfDataStatus[key_status] = Boolean(formData.get(key_status));
        }
        return "";
      });
    }

    // console.log(modifiedData);
    // console.log(modifedfDataStatus);
    // update projectplan table
    try {
      fetch("api/plan/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(modifiedData),
      }).then((res) => {
        if (res.ok) {
          setMsg("Update success!");
          setOnlyRead(true);
          return res.json();
        } else {
          setMsg("Update failed!");
        }
      });
      // .then(data=>console.log(data))
    } catch (err) {
      console.log(err);
    }

    //update projectplanstatus table

    try {
      fetch("api/plan-status/" + data?.projectName, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(modifedfDataStatus),
      }).then((res) => {
        if (res.ok) {
          setMsg("Update success!");
          setOnlyRead(true);

          let timeOut = setTimeout(() => {
            navigate(0);
            return () => clearTimeout(timeOut);
          }, 1000);
        } else {
          setMsg("Update failed!");
        }
        return res.json();
      });
      // .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(state)
  // console.log(data)
  // console.log(data_status)

  if (data && data_status) {
    return (
      <Paper
        elevation={5}
        sx={{ mt: 3 }}
        component="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEdit(e)}
        id="form-projectdetail-modify-id"
      >
        <Typography variant="h6" component="h2" sx={{ pt: 2 ,fontSize:{xs:'16px',sm:'20px',md:'24px'}}}>
          {data.fuzeren_xiangmu}-建设计划
        </Typography>
        {msg ? (
          <Typography
            variant="subtitle1"
            color={
              msg === "Update success!" || msg === "编辑模式"
                ? "green"
                : "error"
            }
          >
            {msg}
          </Typography>
        ) : null}
        <MyFab
          color="secondary"
          aria-label="add"
          type="submit"
          disabled={onlyRead}
        >
          <EditIcon />
        </MyFab>
        <MyFab
          onClick={() => {
            if (onlyRead) {
              setOnlyRead(false);
              setMsg("编辑模式");
            } else {
              setOnlyRead(true);
              setMsg("编辑模式锁定");
            }
          }}
          color="secondary"
          aria-label="edit"
          disabled={!editable}
        >
          {onlyRead ? (
            <LockIcon color="error" sx={{ m: 1 }} />
          ) : (
            <LockOpenIcon color="success" sx={{ m: 1 }} />
          )}
        </MyFab>
        <MyFab onClick={() => navigate(-1)} color="info">
          <UndoIcon color="primary" sx={{ m: 1 }} />
        </MyFab>
        <MyFab onClick={jsonToExcel}>
          <DownloadSharpIcon color="success" sx={{ m: 1 }} />
        </MyFab>

        <Timeline>
          {cols.map((col, index) => (
            <TimelineItem
              key={col.id}
              sx={{ display: "flex", justifyItems: "center" }}
            >
              <TimelineOppositeContent color={col.color}>
                <Box>
                  <CalendarMonthIcon
                    color={col.color}
                    sx={{
                      mr: 1,
                      my: 0.5,  
                      display:{xs:'none',sm:'inline-block'}               
                    }}
                  
                  />
                  <TextField
                    id={String(index)}
                    variant="standard"
                    color={col.color}
                    sx={{
                      maxWidth: "180px",
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                      },
                    }}
                    name={col.id}
                    // type='Datetime-local'
                    InputProps={{ readOnly: onlyRead }}
                    defaultValue={String(
                      new Date(data[col.id])
                        .toLocaleDateString()
                        .replaceAll("/", "-")
                    )}
                  />
                </Box>
              </TimelineOppositeContent>
              <TimelineSeparator>
                {/* <TimelineDot /> */}
                <TimelineDot
                  color={col.color}
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {col.icon}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color={col.color}
                sx={{
                  // maxWidth: "400px",
                  fontSize: { xs: "14px", sm: "18px" },
                }}
              >
                {col.label}
              </TimelineContent>
              {data_status ? (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={data_status[`${col.id}_status`]}
                        name={`${col.id}_status`}
                        sx={{
                          backgroundColor: data_status[`${col.id}_status`]
                            ? "green"
                            : "lightcoral",
                          color: data_status[`${col.id}_status`]
                            ? "white"
                            : "black",
                        }}
                        disabled={onlyRead}
                      />
                    }
                    label={
                      data_status[`${col.id}_status`] ? "已完成" : "未完成"
                    }
                  />
                </FormGroup>
              ) : null}
            </TimelineItem>
          ))}
        </Timeline>
        {/* aside timeline status with boolean value */}
      </Paper>
    );
  }
  return <Loading message="loading..." />;
};

export default ProjectPlanDetail;
