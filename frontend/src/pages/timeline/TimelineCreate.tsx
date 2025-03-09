import { useNavigate } from "react-router-dom";
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
import { useState } from "react";
import { TimelineType } from "./TimelineDetail";

type TimenlineCreateProps = {
  context: string;
  projectName: string;
};

type CreatePageProps = {
  projectName: string;
  handleSumbit: (e: React.FormEvent<HTMLFormElement>) => void;
  msg: string | null;
};

const CreatePage = ({ projectName, handleSumbit, msg }: CreatePageProps) => {
  const navigate = useNavigate();
  const columns = [
    {
      id: "projectName",
      label: "项目名称",
      type: "text",
      format: () => projectName,
    },
    {
      id: "specifyDay",
      label: "日期",
      type: "text",
      format: () =>
        String(new Date(new Date()).toLocaleDateString().replaceAll("/", "-")),
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

  return (
    <Container sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="p" sx={{ pb: 1 }}>
          新增时间轴
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
          {columns.map((column) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={String(column.id)}
              sx={{ mt: 1, pr: 1 }}
            >
              <TextField
                size="small"
                margin="none"
                required
                fullWidth
                id={String(column.id)}
                label={column.label}
                name={column.id}
                type={column.type}
                defaultValue={column.format ? column.format() : ""}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <ButtonGroup sx={{ p: 1 }} variant="outlined">
              <Button type="submit" color="primary">
                <SendIcon />
              </Button>
              <Button color="secondary" onClick={() => navigate(0)}>
                <UndoIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const TimelineCreate = ({ context, projectName }: TimenlineCreateProps) => {
  const [msg, setMsg] = useState<string | null>(null);
  const { user, authTokens, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: TimelineType = {
      projectName_id: context,
      specifyDay: new Date(formData?.get("specifyDay") as string),
      keyPoint: formData?.get("keyPoint") as string,
      mainSection: formData?.get("mainSection") as string,
      groups: formData?.get("groups") as string,
      output: formData?.get("output") as string,
      user_id: user?.user_id,
    };

    try {
      fetch("api/timeline", {
        method: "POST",
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
              navigate(0);
              return () => clearTimeout(timeOut);
            }, 1000);
          } else if (res.statusText === "Unauthorized") {
            console.log(res.statusText);
            logoutUser();
          } else {
            console.log("新增时间轴失败!");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CreatePage
      projectName={projectName}
      handleSumbit={handleSumbit}
      msg={msg}
    />
  );
};

export default TimelineCreate;
