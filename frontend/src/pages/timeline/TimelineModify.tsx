import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import UndoIcon from "@mui/icons-material/Undo";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { TimelineType } from "./TimelineDetail";
import useFetch from "../../hook/useFetch";
import Loading from "../../components/Loading";

const columns = [
  {
    id: "project_name",
    label: "项目名称",
    type: "text",
  },
  {
    id: "specifyDay",
    label: "日期",
    type: "text",
    format: (val:Date) =>
      new Date(val).toLocaleDateString().replaceAll("/", "-"),
  },
  {
    id: "keyPoint",
    label: "关键点",
    type: "text",
  },
  {
    id: "groups",
    label: "参与人员",
    type: "text",
  },
  {
    id: "mainSection",
    label: "牵头部门",
    type: "text",
  },
  {
    id: "output",
    label: "输出成果",
    type: "textArea",
  },
];

const TimelineModify = () => {
  const [msg, setMsg] = useState<string | null>(null);
  const { user, authTokens } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `api/timeline/${id}/modify`;
  const { data } = useFetch<TimelineType>(url);
  const [items, setItems] = useState<TimelineType & { [index: string]: any }>(
    {} as TimelineType
  );
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setItems(data);
      if (user?.user_id === data.user) setEditable(true);
    }
  }, [data, user?.user_id]);

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: TimelineType = {
      projectName: items.projectName,
      specifyDay: new Date(formData?.get("specifyDay") as string).toLocaleDateString().replaceAll('/','-'),
      keyPoint: formData?.get("keyPoint") as string,
      mainSection: formData?.get("mainSection") as string,
      groups: formData?.get("groups") as string,
      output: formData?.get("output") as string,
      user: user?.user_id,
      project_name: items.project_name,
      user_name: items.user_name,
    };

    try {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            setMsg("ok,1秒后跳转...");
            let timeOut = setTimeout(() => {
              navigate(-1);
              return () => clearTimeout(timeOut);
            }, 1000);  
          } else {
            setMsg(res.statusText);
          }
          // return res.json()
        })
        // .then(data=>console.log(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="p" sx={{ pb: 1 }}>
          更新时间轴
        </Typography>
        {msg !== "" ? (
          <Typography variant="subtitle1" component="h4" color="#e53e3e">
            {msg}
          </Typography>
        ) : null}

          <Grid
            container
            spacing={1}
            component="form"
            onSubmit={handleSumbit}
            id="timenline-form-add-id"
          >
            {
            items.projectName ? 
            columns.map((column) => {
              const val = column.format? column.format(items[column.id]) : items[column.id]
              return (
                <Grid
                item
                xs={12}
                sm={6}
                key={column.id}
                sx={{ mt: 1, pr: 1 }}
              >
                <TextField
                  size="small"
                  margin="none"
                  fullWidth
                  required
                  id={column.id}
                  label={column.label}
                  name={column.id}
                  type={column.type}
                  defaultValue={val}
                />
              </Grid>
              )
            }) : <Loading message="loading..." />

            }

            <Grid item xs={12}>
              <ButtonGroup sx={{ p: 1 }} variant="outlined">
                <Button type="submit" color="primary" disabled={!editable}>
                  <SendIcon />
                </Button>
                <Button color="secondary" onClick={() => navigate("/timeline")}>
                  <UndoIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

      </Paper>
    </Container>
  );
};

export default TimelineModify;
