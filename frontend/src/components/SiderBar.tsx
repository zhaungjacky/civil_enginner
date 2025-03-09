import * as React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TimelineIcon from "@mui/icons-material/Timeline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConstructionIcon from "@mui/icons-material/Construction";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import Switch from "@mui/material/Switch";
import ListItem from "@mui/material/ListItem";
import StayPrimaryLandscapeIcon from "@mui/icons-material/StayPrimaryLandscape";
import BarChartIcon from '@mui/icons-material/BarChart';

import List from "@mui/material/List";

type ModeType = 'light' | 'dark';

type SiderBarProps = {
  mode: ModeType
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
};

const cols = [
  {
    link: "/#/",
    icon: <StayPrimaryLandscapeIcon color="primary" />,
    title: "主页",
  },
  {
    link: "/#/project-info",
    icon: <ConstructionIcon color="primary" />,
    title: "项目信息",
  },
  {
    link: "/#/docs",
    icon: <ArticleIcon color="secondary" />,
    title: "文件台账",
  },
  {
    link: "/#/contract",
    icon: <EventNoteIcon color="success" />,
    title: "合同管理",
  },
  {
    link: "/#/timeline",
    icon: <TimelineIcon color="error" />,
    title: "时间轴",
  },
  { link: "/#/plan", icon: <ScheduleIcon color="info" />, title: "项目计划" },
  {
    link: "/#/share-file",
    icon: <UploadFileIcon color="warning" />,
    title: "资料共享",
  },
  {
    link: "/#/statistics",
    icon: <BarChartIcon color="primary" />,
    title: "数据报表",
  },
];

export default function SiderBar({mode,setMode}: SiderBarProps) {
  return (
    <Box
      flex={2}
      bgcolor={"background.default"}
      color={"text.primary"}
      display={{ xs: "none", sm: "none", md: "block" }}
      minHeight="600px"
    >
      <Box position="fixed" top={80}>
        <List>
          {cols.map((col) => (
            <ListItem disablePadding key={col.link}>
              <ListItemButton href={`${col.link}`} >
                <ListItemIcon >{col.icon}</ListItemIcon>
                <ListItemText primary={col.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding component="a">
            <ListItemButton>
              <ListItemIcon>
                {mode === "dark" ? (
                  <LightModeIcon sx={{ color: "yellow" }} />
                ) : (
                  <ModeNightIcon />
                )}
              </ListItemIcon>
              <Switch
                checked={mode === "light" ? false : true}
                onChange={(e) => {
                  let currentMode:ModeType = mode === "light" ? "dark" : "light";
                  setMode(currentMode);
                  localStorage.setItem("mode", JSON.stringify(currentMode));
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
