import useFetch from "../../hook/useFetch";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRef, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { ProjectNameType } from "../contract/ContractCreate";
import { ProjectInfoColType } from "../ProjectInfo";

export const ProjectInfoCols: ProjectInfoColType[] = [
  {
    key: "project_name",
    context: "项目名称",
    xsGridSpan: 6,
    mdGridSpan: 4,
    lgGridSpan: 2,
  },
  {
    key: "productModel",
    context: "产品对象",
    xsGridSpan: 6,
    mdGridSpan: 4,
    lgGridSpan: 2,
  },
  {
    key: "annualcapacity",
    context: "年产量",
    xsGridSpan: 6,
    mdGridSpan: 4,
    lgGridSpan: 2,
  },
  {
    key: "whotobuild",
    context: "类别",
    xsGridSpan: 6,
    mdGridSpan: 4,
    lgGridSpan: 2,
  },
  {
    key: "chargerone",
    context: "负责人",
    xsGridSpan: 6,
    mdGridSpan: 4,
    lgGridSpan: 2,
  },

  {
    key: "contractNo",
    context: "合同号",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "contractDay",
    context: "建设日期",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: Date) =>
      new Date(val).toLocaleDateString().replaceAll("/", "-"),
  },
  {
    key: "contractDuration",
    context: "周期",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "projectPlace",
    context: "项目地点",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "totalPrice",
    context: "合同额￥",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "investment",
    context: "总投资￥",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "economicPerformance",
    context: "经济指标",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "hetongfenjiebiao",
    context: "合同分解表",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "xiangguanfang",
    context: "相关方",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "lessor",
    context: "甲方",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "chargertwo",
    context: "负责人二",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },

  {
    key: "maxcrane",
    context: "吊车",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "liftheight",
    context: "吊高",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },

  {
    key: "buildingdetails",
    context: "厂房参数",
    xsGridSpan: 12,
    mdGridSpan: 12,
    lgGridSpan: 12,
  },
  {
    key: "constructionContent",
    context: "建设内容",
    xsGridSpan: 12,
    mdGridSpan: 12,
    lgGridSpan: 12,
  },
];

const CreateSection = () => {
  const { data: projectNames } =
    useFetch<ProjectNameType[]>("api/project-name");
  const { user,authTokens } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>();
  const selectProjectNameRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: { [index: string]: any } = {};

    ProjectInfoCols.forEach((item) => {
      obj[item.key] = formData.get(item.key);
      return null;
    });
    obj["projectName_id"] = formData.get("project_name");
    obj["user_id"] = user?.user_id;

    delete obj.project_name;

    try {
      fetch("api/project-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.ok) {
          setMsg(res.statusText);
          let timer = setTimeout(() => {
            navigate("/project-info");
            return () => clearTimeout(timer);
          }, 1000);
          // return res.json()
        } else {
          console.log(res);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    console.log(selectProjectNameRef.current);
  };

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      sx={{ pl: 2, pr: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <CreateIcon color="primary" />
        <Box>
          <Typography variant="h6">新增项目信息</Typography>
          {msg ? (
            <Typography
              variant="h5"
              color={msg === "OK" ? "darkgreen" : "error"}
            >
              {msg}
            </Typography>
          ) : null}
        </Box>

        <Box>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ mr: 1 }}
            size="small"
            type="submit"
          >
            <CheckIcon />
          </Fab>
          <Fab
            color="secondary"
            aria-label="edit"
            onClick={() => navigate("/project-info")}
            size="small"
          >
            <UndoIcon />
          </Fab>
        </Box>
      </Box>
      <Paper
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        id="projectinfo-form-create-id"
      >
        <Grid container spacing={0.5}>
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl sx={{ m: 1, minWidth: "95%" }} size="small">
              <InputLabel id="demo-simple-select-helper-label" size="small">
                选择已有项目
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="plan-create-projectname-id"
                //   value={projectName}
                onChange={(e: SelectChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
                name="project_name"
                ref={selectProjectNameRef}
                // defaultValue=''
              >
                {projectNames?.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {ProjectInfoCols.map((col) =>
            col.key !== "project_name" &&
            col.key !== "buildingdetails" &&
            col.key !== "constructionContent" ? (
              <Grid item key={col.key} xs={12} sm={6} lg={3}>
                <TextField
                  required
                  size="small"
                  sx={{ minWidth: "95%" }}
                  id={col.key.toString()}
                  label={col.context}
                  name={col.key}
                  type={
                    col.format && col.key !== "contractDay" ? "number" : "text"
                  }
                />
              </Grid>
            ) : (
              ""
            )
          )}
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              id="outlined-multiline-static"
              required
              name="buildingdetails"
              label="厂房参数"
              multiline
              rows={2}
              sx={{ minWidth: "95%" }}
              //   defaultValue="Default Value"
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              id="outlined-multiline-static-constructionContent"
              required
              sx={{ minWidth: "95%" }}
              name="constructionContent"
              label="建设内容"
              multiline
              fullWidth
              rows={2}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const ProjectInfoCreate = () => {
  return <CreateSection />;
};

export default ProjectInfoCreate;
