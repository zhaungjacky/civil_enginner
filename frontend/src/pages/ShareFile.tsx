import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import { useNavigate } from "react-router-dom";
import { AuthRes, useAuth } from "../context/AuthContext";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Undo from "@mui/icons-material/Undo";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import StorageIcon from "@mui/icons-material/Storage";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FunctionsIcon from "@mui/icons-material/Functions";
import fileDownLoad from "js-file-download";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";

type ShareFileType = {
  id: string;
  user_name: string;
  file_name: string;
  file_path: string;
  download_count: number;
  created_at?: Date;
  updated_at?: Date;
  user: number;
};

type UploadProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  msg: string | null;
};

type DownloadProps = {
  authTokens: AuthRes | null;
  data: ShareFileType[] | null;
};

const UploadPage = ({ handleSubmit, handleFileChange, msg }: UploadProps) => {
  return (
    <Container>
      <Paper sx={{ m: 2, p: 2 }} elevation={4}>
        <Box sx={{ mb: 1 }}>
          <Typography>文件上传</Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          // onClick={() => {
          //   let inputSelect = document.querySelector(
          //     "sharefile-upload-input"
          //   ) as HTMLInputElement;
          //   inputSelect?.click();
          // }}
        >
          <Box sx={{ flex: 6 }}>
            <TextField
              type="file"
              name="file"
              onChange={handleFileChange}
              className="sharefile-upload-input"
              sx={{ flex: 4 }}
            />
            {/* <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
            className="sharefile-upload-input"
            hidden
          /> */}


          </Box>
          <IconButton type="submit" value="Upload File" sx={{ flex: 1 }}>
            <FileUploadIcon color="primary" />
          </IconButton>
        </Box>
        {msg && (
          <Box sx={{ m: 1, p: 1 }}>
            <Typography variant="h6" component="h4" color="#888">
              {msg}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const DownloadPage = ({ authTokens, data }: DownloadProps) => {
  const handleDownload = (item: ShareFileType) => {
    const headersInfo = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    };

    //download file
    try {
      Axios.get(`api/file/${item.id}`, {
        // "Content-Type": "blob",
        headers: { Authorization: "Bearer " + String(authTokens?.access) },
        responseType: "blob",
      }).then((res) => {
        if (res.status === 200) {
          fileDownLoad(res.data, item.file_name);
          updateDownLoadCount();
        }
      });
    } catch (err) {
      console.log(err);
    }

    let updateDownLoadCount = async () => {
      try {
        await Axios.put(
          `api/file/${item.id}`,
          { ...item, download_count: item.download_count + 1 },
          headersInfo
        ).then((response) => {
          if (response.status === 200) {
            let element = document.getElementById(
              item.id
            ) as HTMLParagraphElement;
            let val = parseInt(element.innerHTML);
            element.innerHTML = (val + 1).toString();
          } else {
            console.log("Failed");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  let boxStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    mb: 0.5,
    mt: 0.5,
  };
  return (
    <Box sx={{ pl: 1 }}>
      <Grid container spacing={0.5}>
        {data?.map((item) => (
          <Grid item xs={12} md={6} key={item.id} sx={{ minHeight: 20 }}>
            <Paper elevation={4} sx={{ minHeight: 20, p: 0.5, m: 0.5 }}>
              <Grid container spacing={0.5}>
                <Grid item xs={9} sx={boxStyle}>
                  <Box sx={boxStyle}>
                    <StorageIcon color="secondary" sx={{ fontSize: 24 }} />
                    <Typography variant="subtitle1" fontSize="12px">
                      {item.file_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} sx={boxStyle}>
                  <Box sx={boxStyle}>
                    <PersonAddAltIcon
                      color="error"
                      sx={{
                        fontSize: 24,
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontSize="12px"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      {item.user_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2} sx={boxStyle}>
                  <Box sx={boxStyle}>
                    <IconButton
                      onClick={() => handleDownload(item)}
                      sx={{ marginLeft: 1 }}
                    >
                      {/* <IconButton sx={{ mr: 2 }}> */}
                      <DownloadIcon color="primary" sx={{ fontSize: 24 }} />
                    </IconButton>
                    <FunctionsIcon
                      sx={{
                        color: "#888",
                        fontSize: 20,
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    />
                    <Typography
                      id={item.id}
                      fontSize="16px"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      {item.download_count}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ShareFile = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const { authTokens } = useAuth();
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [items, setItems] = useState<ShareFileType[]>();
  const { data } = useFetch<ShareFileType[]>("api/file");
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
    setMsg(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (file === null) {
      setMsg("no file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const headersInfo = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=something",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    };

    Axios.post("api/file-upload", formData, headersInfo)
      .then((response) => {
        if (response.status === 200) {
          setMsg(response.data);
          let timeOut = setTimeout(() => {
            navigate(0);
            return () => clearTimeout(timeOut);
          }, 1000);
        } else {
          setMsg(response.data);
        }
      })
      .catch((error) => {
        setMsg(error);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let timeOut = setTimeout(() => {
      if (val !== "") {
        let searchData = data?.filter(
          (item) =>
            item.user_name.toLowerCase().includes(val.toLowerCase()) ||
            item.file_name.toLowerCase().includes(val.toLowerCase())
        );
        if (searchData && searchData.length > 0) {
          setItems(searchData);
          // console.log(searchData)
        } else {
          setMsg("无数据");
        }
      } else if (val === "") {
        setItems(data);
      }
      return () => clearTimeout(timeOut);
    }, 1000);
  };

  return (
    <Container>
      <Grid
        container
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Grid
          item
          xs={0}
          sm={4}
          lg={4}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignContent: "flex-start",
            pl: 1,
          }}
        >
          <OfflineShareIcon sx={{ color: "lightcoral" }} />
        </Grid>
        <Grid
          item
          xs={0}
          sm={4}
          lg={4}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            fontSize={{
              xs: "16px",
              md: "20px",
              lg: "24px",
            }}
          >
            文件管理
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 1,
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-select-currency"
            type="input"
            // select
            label="输入文件名、上传人等"
            defaultValue=""
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e)
            }
            sx={{ pr: 3 }}
            // helperText="输入文件名、上传人等"
          />
          <IconButton color="secondary" onClick={() => navigate("/")}>
            <Undo />
          </IconButton>
        </Grid>
      </Grid>

      <UploadPage
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        msg={msg}
      />
      <DownloadPage authTokens={authTokens} data={items ? items : null} />
    </Container>
  );
};

export default ShareFile;
