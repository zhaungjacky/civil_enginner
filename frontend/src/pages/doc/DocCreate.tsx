import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import ButtonGroup from "@mui/material/ButtonGroup";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { DocType } from "../DocPage";

type ColumsType = {
  id: string;
  label: string;
  type: string;
  xs_size: number;
  format?: (value: any) => any;
};

export const DocColumns: ColumsType[] = [
    {
      id: "number",
      label: "文件编号",
      type: "text",
      xs_size: 6,
    },
    {
      id: "fileName",
      label: "名称",
      type: "text",
      xs_size: 6,
    },
    {
      id: "publishDate",
      label: "发布时间",
      type: "text",
      xs_size: 6,
      format: (value) =>
        new Date(value).toLocaleDateString().replaceAll("/", "-"),
    },
    {
      id: "launchDate",
      label: "执行时间",
      type: "text",
      xs_size: 6,
      format: (value) =>
        new Date(value).toLocaleDateString().replaceAll("/", "-"),
    },

    {
      id: "neiwaibu",
      label: "内外部",
      type: "text",
      xs_size: 6,
    },
    {
      id: "duifangmingcheng",
      label: "对方单位",
      type: "text",
      xs_size: 6,
    },
    {
      id: "jingbanren",
      label: "经办人",
      type: "text",
      xs_size: 6,
    },
    {
      id: "qianfa",
      label: "签发领导",
      type: "text",
      xs_size: 6,
    },
    {
      id: "remark",
      label: "备注",
      type: "text",
      xs_size: 12,
    },
  ];
// import { createTheme, ThemeProvider } from "@mui/
export default function DocCreate() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const { user, authTokens, logoutUser } = useAuth();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: DocType = {
      type_name: formData.get("type_name") as string,
      number: formData.get("number") as string,
      fileName: formData.get("fileName") as string,
      publishDate: new Date(formData.get("publishDate") as string),
      launchDate: new Date(formData.get("launchDate") as string),
      remark: formData.get("remark") as string,
      jingbanren: formData.get("jingbanren") as string,
      qianfa: formData.get("qianfa") as string,
      neiwaibu: formData.get("neiwaibu") as string,
      duifangmingcheng: formData.get("duifangmingcheng") as string,
      user_id: user?.user_id,
    };

    try {
      fetch("/api/docs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            setMessage(res.statusText);
            let timer = setTimeout(() => {
              navigate("/docs");
              return ()=> clearTimeout(timer);
            }, 1000);
          } else {
            setMessage(res.statusText);
            let timer = setTimeout(() => {
                logoutUser()
                return ()=> clearTimeout(timer);
              }, 2000);
          }
        })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid
            item
            xs={6}
            sx={{
              pt: 3,
              mt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                alignSelf: "center",
              }}
            >
              <AppRegistrationIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              添加文件
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          spacing={1}
          component="form"
          onSubmit={handleAdd}
          id="document-form-add-id"
        >
          {DocColumns?.map((column) => (
            <Grid
              item
              xs={12}
              sm={column.xs_size}
              key={column.id}
              sx={{ mb: 1 }}
            >
              <TextField
                size="small"
                margin="none"
                required
                fullWidth
                name={column.id}
                label={column.label}
                type={column.type}
                id={column.id}
                defaultValue={
                  column.format
                    ? String(column.format(new Date()).toString())
                    : ""
                }
              />
            </Grid>
          ))}

          {/* type_name,  */}
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size="small">
                  类别
                </InputLabel>
                <Select
                  labelId="type_name"
                  id="type_name"
                  label="类别"
                  name="type_name"
                  defaultValue="纪要"
                  size="small"
                >
                  <MenuItem value="纪要">纪要</MenuItem>
                  <MenuItem value="制度">制度</MenuItem>
                  <MenuItem value="联系单">联系单</MenuItem>
                  <MenuItem value="请示">请示</MenuItem>
                  <MenuItem value="传真">传真</MenuItem>
                  <MenuItem value="其他">其他</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box marginTop={4}>
              <ButtonGroup variant="outlined">
                <Button color="primary" startIcon={<SendIcon />} type="submit">
                  提交
                </Button>
                <Button
                  color="secondary"
                  endIcon={<UndoIcon />}
                  onClick={() => navigate(-1)}
                >
                  返回
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="error" paddingTop={3}>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
