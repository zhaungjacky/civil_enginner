import { DocColumns } from "./DocCreate";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SendIcon from "@mui/icons-material/Send";
import ButtonGroup from "@mui/material/ButtonGroup";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";
import { DocType } from "../DocPage";

export default function DocDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useFetch<DocType>("/api/docs/" + id);
  const [message, setMessage] = useState<string | null>(null);
  const { user, authTokens, logoutUser } = useAuth();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
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
      username: user?.username,
    };

    try {
      fetch("api/docs/" + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          setMessage(res.statusText);
          if(res.ok){
            let timer = setTimeout(()=>{
              navigate('/docs');
              return ()=> clearTimeout(timer);
            },1000)
          } else {
            logoutUser();
          }
        })
        // .then((data) => console.log(data));
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
              修改文件
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          spacing={1}
          component="form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEdit(e)}
          id="document-form-edit-id"
        >
          {data
            ? DocColumns?.map((column) => {
                let value = data[column.id]!;
                return (
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
                        column.format ? String(column.format(value)) : value
                      }
                    />
                  </Grid>
                );
              })
            : null}

          {/* type_name,  */}
          {data?.type_name ? (
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <TextField
                size="small"
                margin="none"
                required
                fullWidth
                name="type_name"
                label="类别"
                type="text"
                id="type_name"
                defaultValue={data?.type_name.toString()}
              />
            </Grid>
          ) : null}

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
