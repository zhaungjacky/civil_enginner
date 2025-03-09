import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import HttpIcon from "@mui/icons-material/Http";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TimelineIcon from "@mui/icons-material/Timeline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConstructionIcon from "@mui/icons-material/Construction";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from 'react-router-dom'

const NavSection = () => {
  let columns = [
    { link: "/project-info", icon: <ConstructionIcon />, title: "项目信息" },
    { link: "/docs", icon: <ArticleIcon />, title: "文件台账" },
    { link: "/contract", icon: <EventNoteIcon />, title: "合同管理" },
    { link: "/timeline", icon: <TimelineIcon />, title: "时间轴" },
    { link: "/plan", icon: <ScheduleIcon />, title: "项目计划" },
    { link: "/share-file", icon: <UploadFileIcon />, title: "资料共享" },
    {
      link: "/#/statistics",
      icon: <BarChartIcon color="primary" />,
      title: "数据报表",
    },
  ];
  return (
    <Paper
      sx={{ p: 5, m: 3, display: { sm: "block", md: "none" } }}
      elevation={5}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontSize: {
            xs: "22px",
            md: "26px",
            lg: "30px",
          },
        }}
      >
        功能导航
      </Typography>
      <Grid
        container
        spacing={{
          xs: 0.5,
          md: 2,
          lg: 3,
        }}
      >
        {columns?.map((column) => (
          <Grid xs={12} sm={6} lg={3} item key={column.link}>
            <Box>
              <Link to={column.link}>
                <Button
                  startIcon={column.icon}
                  sx={{
                    mb: 0,
                    fontSize: {
                      xs: "22px",
                      md: "26px",
                      lg: "30px",
                    },
                  }}
                >
                  {column.title}
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const LinkSection = () => {
  let str =
    "https://passport.dongfang.com/login?service=https%3A%2F%2Fpassport.dongfang.com%2Foauth2.0%2Fcallback%3Fclient_name%3Doauth.client.cas%26client_id%3Db5ec7d40-f1a2-454b-a313-24ec88772915";

  let columns = [
    { href: str, icon: <CorporateFareIcon />, title: "智云东方" },
    {
      href: "https://117.174.57.173:8444/",
      icon: <FontDownloadIcon />,
      title: "风电OA",
    },
    {
      href: "http://10.100.250.13:8008/",
      icon: <HttpIcon />,
      title: "上网认证",
    },
    {
      href: "https://mail.dongfang.com",
      icon: <AttachEmailIcon />,
      title: "东方邮箱",
    },
    {
      href: "https://docs.qq.com/sheet/DS1NycXpJUUh2RkxS?tab=BB08J2",
      icon: <ViewListIcon />,
      title: "文件台账",
    },
    {
      href: "https://docs.qq.com/sheet/DVGt0SElIbW9QZHBv",
      icon: <SettingsAccessibilityIcon />,
      title: "工作计划",
    },
    { href: "https://baidu.com", icon: <SearchIcon />, title: "百度搜索" },
    {
      href: "https://fanyi.baidu.com/?aldtype=16047#auto/zh",
      icon: <GTranslateIcon />,
      title: "百度翻译",
    },
    /*
    【腾讯文档】工程员工-工作计划-每周日填写下周

    */
  ];
  return (
    <Paper
      sx={{ p: 5, m: 3, display: { xs: "none", sm: "none", md: "block" } }}
      elevation={5}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        网站导航
      </Typography>
      <Grid container spacing={2}>
        {columns?.map((column) => (
          <Grid item xs={12} sm={6} lg={3} key={column.title}>
            <Link to={column.href} target="_blank" rel="noopener noreferrer">
              <Button
                startIcon={column.icon}
                sx={{
                  mt:1,
                  mb:1,
                  fontSize: {
                    xs: "22px",
                    md: "24px",
                    lg: "28px",
                  },
                }}
              >
                {column.title}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};


export default function HomePage() {
  return (
    <Container>
      <NavSection />
      <LinkSection />
    </Container>
  );
}
