import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import SendIcon from "@mui/icons-material/Send";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../context/AuthContext";
import { ProjectPlanStatusType, icons,colors as columnColor } from "./ProjectPlanDetail";
import { ProjectNameType } from "../contract/ContractCreate";


type ChargerMemberType = {
  charger: string;
  projectsInCharge: [
    {
      id: string;
      projectName: string;
    }
  ];
  user: {
    id: number;
    username: string;
  };
  id: string;
};

const ProjectPlanCreate = () => {
  const { data } = useFetch<ProjectNameType[]>("api/project-name");
  const { data: chargerMembers } =
    useFetch<ChargerMemberType[]>("api/staff-member");
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [showNoneDate, setShowNoneDate] = useState<boolean>(true);
  const navigate = useNavigate();
  const { authTokens, user } = useAuth();
  const [info, setInfo] = useState<string | null>(null);
  const cols = [
    // {id:'fuzeren_xiangmu',color: "text.secondary" , label:""},
    {
      id: "gongsilixiang",
      color: columnColor[0],
      label: "立项",
      icon: icons[0].icon,
      duration: new Date(initDate).getTime() + 2 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gongyibujudingban",
      color: columnColor[1],
      label: "工艺布局",
      icon: icons[1].icon,
      duration: new Date(initDate).getTime() + 15 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "keyanzhaobiao",
      color: columnColor[2],
      label: "可研招标",
      icon: icons[2].icon,
      duration: new Date(initDate).getTime() + 30 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "touweihui",
      color: columnColor[3],
      label: "投委会",
      icon: icons[3].icon,
      duration: new Date(initDate).getTime() + 80 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gongsijuece",
      color: columnColor[4],
      label: "公司总办/党委/董事会决策完成",
      icon: icons[4].icon,
      duration: new Date(initDate).getTime() + 110 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gudong_jituanbeian",
      color: columnColor[5],
      label: "集团备案",
      icon: icons[5].icon,
      duration: new Date(initDate).getTime() + 130 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "zhengfulixiang",
      color: columnColor[6],
      label: "发改委立项",
      icon: icons[6].icon,
      duration: new Date(initDate).getTime() + 140 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "dikancehui",
      color: columnColor[7],
      label: "地勘测绘",
      icon: icons[7].icon,
      duration: new Date(initDate).getTime() + 150 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "tudizheng",
      color: columnColor[8],
      label: "土地证办理",
      icon: icons[8].icon,
      duration: new Date(initDate).getTime() + 170 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "yongdiguihua",
      color: columnColor[9],
      label: "用地规划证",
      icon: icons[9].icon,
      duration: new Date(initDate).getTime() + 190 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "zhaobiaodaili",
      color: columnColor[10],
      label: "招标代理单位",
      icon: icons[10].icon,
      duration: new Date(initDate).getTime() + 130 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "shigongfang_zhaobiao",
      color: columnColor[11],
      label: "设计/施工方招标",
      icon: icons[11].icon,
      duration: new Date(initDate).getTime() + 170 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "chubusheji",
      color: columnColor[12],
      label: "初步设计",
      icon: icons[12].icon,
      duration: new Date(initDate).getTime() + 200 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "shigongtu",
      color: columnColor[13],
      label: "施工图设计",
      icon: icons[13].icon,
      duration: new Date(initDate).getTime() + 230 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gongchengguihua",
      color: columnColor[14],
      label: "项目规划证",
      icon: icons[14].icon,
      duration: new Date(initDate).getTime() + 240 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "jianlizhaobiao",
      color: columnColor[15],
      label: "监理招标",
      icon: icons[15].icon,
      duration: new Date(initDate).getTime() + 180 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "xiangguanzhaobiao",
      color: columnColor[16],
      label: "项管招标",
      icon: icons[16].icon,
      duration: new Date(initDate).getTime() + 180 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "shigongxukezheng",
      color: columnColor[17],
      label: "施工许可证",
      icon: icons[17].icon,
      duration: new Date(initDate).getTime() + 250 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "jichu",
      color: columnColor[18],
      label: "基础处理",
      icon: icons[18].icon,
      duration: new Date(initDate).getTime() + 280 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gangjiegou_zhizuo",
      color: columnColor[19],
      label: "钢结构制作",
      icon: icons[19].icon,
      duration: new Date(initDate).getTime() + 280 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gangjiegou_anzhuang",
      color: columnColor[20],
      label: "钢结构安装",
      icon: icons[20].icon,
      duration: new Date(initDate).getTime() + 310 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gangjiegou_weihu",
      color: columnColor[21],
      label: "钢结构维护",
      icon: icons[21].icon,
      duration: new Date(initDate).getTime() + 330 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "diping_chuli",
      color: columnColor[22],
      label: "地坪处理",
      icon: icons[22].icon,
      duration: new Date(initDate).getTime() + 280 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "diaochejichu_chuli",
      color: columnColor[23],
      label: "吊车基础处理",
      icon: icons[23].icon,
      duration: new Date(initDate).getTime() + 280 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "angmian_wumianban",
      color: columnColor[24],
      label: "墙面/屋面安装",
      icon: icons[24].icon,
      duration: new Date(initDate).getTime() + 360 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "peidianxitong",
      color: columnColor[25],
      label: "配电系统",
      icon: icons[25].icon,
      duration: new Date(initDate).getTime() + 380 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "xiaofangxitong",
      color: columnColor[26],
      label: "消防系统",
      icon: icons[26].icon,
      duration: new Date(initDate).getTime() + 380 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "yuwuchulixitong",
      color: columnColor[27],
      label: "雨水/污水处理系统",
      icon: icons[27].icon,
      duration: new Date(initDate).getTime() + 380 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "gufeizhan",
      color: columnColor[28],
      label: "固废站",
      icon: icons[28].icon,
      duration: new Date(initDate).getTime() + 380 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "qitafushu_sheshi",
      color: columnColor[29],
      label: "其他附属设施",
      icon: icons[29].icon,
      duration: new Date(initDate).getTime() + 400 * 60 * 60 * 24 * 1000,
      format: (val: Date) =>
        new Date(val).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "diaoche_shebei_anzhuang",
      color: columnColor[30],
      label: "吊车/设备安装",
      icon: icons[30].icon,
      duration: new Date(initDate).getTime() + 350 * 60 * 60 * 24 * 1000,
      format: (val: Date) => new Date(val),
    },
  ];

  const handleModify = (e: React.MouseEvent<HTMLButtonElement>) => {
    let element = document.getElementById("setBaseDate") as HTMLInputElement;
    setInitDate(new Date(element.value));
    setShowNoneDate((prev) => {
      return !prev;
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const formData = new FormData(e.currentTarget);

    let localDivProjectName = document.getElementById("outlined-select-projectName") as HTMLDivElement;

    console.log(localDivProjectName.innerHTML)
    let combineValue = `${localDivProjectName.innerHTML} -- ${formData.get('charger') as string} `
    if (!formData.get("projectName") || !formData.get("charger")) {
      alert("项目名称-负责人-立项完成时间必填！");
    }
    let obj = {
      fuzeren_xiangmu: combineValue,
      bidType: formData.get("bidType") as string,
      gongsilixiang: new Date(formData.get("gongsilixiang") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gongyibujudingban: new Date(formData.get("gongyibujudingban") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      keyanzhaobiao: new Date(formData.get("keyanzhaobiao") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      touweihui: new Date(formData.get("touweihui") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gongsijuece: new Date(formData.get("gongsijuece") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gudong_jituanbeian: new Date(formData.get("gudong_jituanbeian") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      zhengfulixiang: new Date(formData.get("zhengfulixiang") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      dikancehui: new Date(formData.get("dikancehui") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      tudizheng: new Date(formData.get("tudizheng") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      yongdiguihua: new Date(formData.get("yongdiguihua") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      zhaobiaodaili: new Date(formData.get("zhaobiaodaili") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      shigongfang_zhaobiao: new Date(
        formData.get("shigongfang_zhaobiao") as string
      )
        .toLocaleDateString()
        .replaceAll("/", "-"),
      chubusheji: new Date(formData.get("chubusheji") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      shigongtu: new Date(formData.get("shigongtu") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gongchengguihua: new Date(formData.get("gongchengguihua") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      jianlizhaobiao: new Date(formData.get("jianlizhaobiao") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      xiangguanzhaobiao: new Date(formData.get("xiangguanzhaobiao") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      shigongxukezheng: new Date(formData.get("shigongxukezheng") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      jichu: new Date(formData.get("jichu") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gangjiegou_zhizuo: new Date(formData.get("gangjiegou_zhizuo") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gangjiegou_anzhuang: new Date(
        formData.get("gangjiegou_anzhuang") as string
      )
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gangjiegou_weihu: new Date(formData.get("gangjiegou_weihu") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      diping_chuli: new Date(formData.get("diping_chuli") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      diaochejichu_chuli: new Date(formData.get("diaochejichu_chuli") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      angmian_wumianban: new Date(formData.get("angmian_wumianban") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      peidianxitong: new Date(formData.get("peidianxitong") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      xiaofangxitong: new Date(formData.get("xiaofangxitong") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      yuwuchulixitong: new Date(formData.get("yuwuchulixitong") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      gufeizhan: new Date(formData.get("gufeizhan") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      qitafushu_sheshi: new Date(formData.get("qitafushu_sheshi") as string)
        .toLocaleDateString()
        .replaceAll("/", "-"),
      diaoche_shebei_anzhuang: new Date(
        formData.get("diaoche_shebei_anzhuang") as string
      )
        .toLocaleDateString()
        .replaceAll("/", "-"),
      modify_name: user?.username,
      projectName_id: formData.get("projectName"),
      // projectName: formData.get("projectName"),
      user_id: user?.user_id,
      charger: formData.get("charger") as string,
    };

    let objStatus: ProjectPlanStatusType & { [index: string]: any } =
      {} as ProjectPlanStatusType;

    Object.keys(obj).forEach((key) => {
      if (
        key !== "projectName_id" &&
        key !== "bidType" &&
        key !== "fuzeren_xiangmu" &&
        key !== "user_id" &&
        key !== "charger" &&
        key !== "modify_name"
      )
        objStatus[key + "_status"] = false;
      return null;
    });
    objStatus["projectName_id"] = obj.projectName_id;
    objStatus["user_id"] = user?.user_id;
    objStatus["modify_name"] = user?.username;
    objStatus["is_current_project"] = false;
    console.log(obj);
    console.log(objStatus);

    try {
      fetch("api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          // console.log(res)
          if (res.ok) {
            return res.json();
          } else {
            setInfo(res.statusText);
            let timeOut = setTimeout(() => {
              navigate("/plan");
              return () => clearTimeout(timeOut);
            }, 3500);
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => alert(err.message));
    } catch (err) {
      console.log(err);
    }

    try {
      fetch("api/plan-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(objStatus),
      })
        .then((res) => res.json())
        .then((data) => {
          setInfo("添加成功！");
          let timeOut = setTimeout(() => {
            navigate("/plan");
            return () => clearTimeout(timeOut);
          }, 1500);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{ mt: 3 }}
      component="form"
      id="form-projectplane-add-id"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <Box>
        <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
          新增建设计划
        </Typography>
        {info && (
          <Box sx={{ m: 2, p: 2 }}>
            <Typography variant="h6" color="success" component="h2">
              {info}
            </Typography>
          </Box>
        )}

        <IconButton onClick={() => navigate(-1)}>
          <UndoIcon color="primary" sx={{ m: 1 }} />
        </IconButton>
        <IconButton type="submit">
          <SendIcon color="secondary" sx={{ m: 1 }} />
        </IconButton>
      </Box>

      <Box>
        <TextField
          id="outlined-select-projectName"
          select
          label="选择项目"
          defaultValue={data ? data[0].id : ""}
          size="small"
          name="projectName"
          sx={{ m: 1, minWidth: 200, maxWidth: 300 }}
        >
          {data?.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.projectName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="选择负责人"
          defaultValue="暂无"
          size="small"
          name="charger"
          sx={{ m: 1, minWidth: 200, maxWidth: 300 }}

          // helperText="Please select your currency"
        >
          {chargerMembers?.map((item) => (
            <MenuItem value={String(item.charger) || ""} key={item.charger}>
              {item.charger}
            </MenuItem>
          ))}
          <MenuItem value="暂无">暂无</MenuItem>
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="建设模式"
          defaultValue="EPC"
          size="small"
          name="bidType"
          sx={{ m: 1, minWidth: 200, maxWidth: 300 }}

          // helperText="Please select your currency"
        >
          <MenuItem value="EPC">EPC</MenuItem>
          <MenuItem value="初设后招标">初设后招标</MenuItem>
          <MenuItem value="工程量清单招标">工程量清单招标</MenuItem>
          <MenuItem value="平行发包">平行发包</MenuItem>
          <MenuItem value="固定总价">固定总价</MenuItem>
          <MenuItem value="其他类别">其他类别</MenuItem>
        </TextField>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={2}
      >
        <TextField
          id="setBaseDate"
          label="设定立项完成时间"
          type="text"
          size="small"
          name="setBaseDate"
          defaultValue={new Date().toLocaleDateString().replaceAll("/", "-")}
        />
        <IconButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleModify(e)}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      <Grid>
        <Timeline>
          {!showNoneDate
            ? cols.map((col, index) => (
                <TimelineItem key={col.id.toString()}>
                  <TimelineOppositeContent color={col.color}>
                    <Box>
                      <CalendarMonthIcon
                        color={col.color}
                        sx={{
                          mr: 1,
                          my: 0.5,
                          display: {
                            xs: "none",
                            sm: "inline",
                          },
                        }}
                      />
                      <TextField
                        id={index.toString()}
                        variant="standard"
                        color={col.color}
                        sx={{ minWidth: "80px" }}
                        name={col.id}
                        defaultValue={col.format(new Date(col.duration))}
                      />
                    </Box>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={col.color}>{col.icon}</TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent color={col.color}>
                    {col.label}
                  </TimelineContent>
                </TimelineItem>
              ))
            : ""}
        </Timeline>
      </Grid>
    </Paper>
  );
};

export default ProjectPlanCreate;
