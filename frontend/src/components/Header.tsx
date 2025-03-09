import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`media/${user.user_id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("error");
            setImageUrl("/media/default.jpg");
          }
        })
        .then((data) => {
          let uri = `/media/${data.url}`;
          setImageUrl(uri);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "16px", md: "24px", lg: "30px" },
            }}
          >
            基地建设组
          </Typography>
          {user ? (
            <PersonIcon sx={{ mr: 1 }} color="secondary" />
          ) : (
            <PersonOffIcon color="warning" />
          )}
            {user?.username ? (
              <Avatar
                alt="Remy Sharp"
                src={imageUrl!}
                sx={{ width: 40, height: 40, mr: 2 }}
              />
            ) : null}
          <Typography
            sx={{ mr: 2, fontSize: { xs: "16px", md: "24px", lg: "30px" } }}
          >
            {user?.username}
          </Typography>
          {user ? (
            <Button color="inherit" href="/#/login" onClick={logoutUser}>
              <LogoutIcon />
            </Button>
          ) : (
            <Button color="inherit" href="/#/login">
              <LoginIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
