import useFetch from "../../hook/useFetch";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ProjectInfoCols } from "./ProjectInfoCreate";
import { ProjectInfoType } from "../ProjectInfo";
import Loading from "../../components/Loading";

const ModifySection = () => {
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState<string>();
  const { data } = useFetch<ProjectInfoType>("api/project-info/" + id);
  const [items, setItems] = useState<ProjectInfoType>();
  const [editable, setEditable] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setItems(data);
      if(data.user === user?.user_id) setEditable(true)
    }
  }, [data, user?.user_id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: { [index: string]: any } = {};

    ProjectInfoCols.forEach((item) => {
      obj[item.key] = formData.get(item.key);
      return null;
    });
    obj["projectName_id"] = formData.get("project_name");
    obj["projectName"] = data?.projectName;
    obj["user_id"] = user?.user_id;


    try {
      fetch("api/project-info/" + id, {
        method: "PUT",
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
        } else {
          console.log(res);
        }
        return res.json()
      })
      .then(data=>console.log(data))
    } catch (err) {
      console.log(err);
    }
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
          <Typography variant="h6">更新项目信息</Typography>
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
            disabled={!editable}
          >
            <CheckIcon />
          </Fab>
          <Fab
            color="secondary"
            aria-label="edit"
            onClick={() => navigate(-1)}
            size="small"
          >
            <UndoIcon />
          </Fab>
        </Box>
      </Box>
      {items ? (
        <Paper
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          id="projectinfo-form-create-id"
        >
          <Grid container spacing={0.5}>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                required
                size="small"
                sx={{ minWidth: "95%" }}
                id={items?.project_name}
                label="项目名称"
                name="project_name"
                type="text"
                defaultValue={items?.project_name}
              />
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
                      col.format && col.key !== "contractDay"
                        ? "number"
                        : "text"
                    }
                    defaultValue={items ? items[col.key] : ""}
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
                defaultValue={items?.buildingdetails}
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
                defaultValue={items?.constructionContent}
              />
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Loading message="loading" />
      )}
    </Box>
  );
};

const ProjectInfoDetail = () => {
  return <ModifySection />;
};

export default ProjectInfoDetail;
