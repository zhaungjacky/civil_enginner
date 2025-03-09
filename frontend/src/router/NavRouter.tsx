import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ContractPage from "../pages/ContractPage";
import ContractDetail from "../pages/contract/ContractDetail";
import ContractCreate from "../pages/contract/ContractCreate";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Header from "../components/Header";
import { Box, Stack } from "@mui/material";
import SiderBar from "../components/SiderBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NotFound from "../components/NotFound";
import DocPage from "../pages/DocPage";
import DocDetail from "../pages/doc/DocDetail";
import DocCreate from "../pages/doc/DocCreate";
import Copyright from "../components/Copyright";
import ProjectInfo from "../pages/ProjectInfo";
import ProjectInfoCreate from "../pages/project-file/ProjectInfoCreate";
import TimelinePage from "../pages/TimelinePage";
import TimelineDetail from "../pages/timeline/TimelineDetail";
import TimelineModify from "../pages/timeline/TimelineModify";
import ProjectPlanPage from "../pages/ProjectPlanPage";
import ProjectPlanDetail from "../pages/project-file/ProjectPlanDetail";
import ProjectPlanCreate from "../pages/project-file/ProjectPlanCreate";
import ProjectInfoDetail from "../pages/project-file/ProjectInfoDetail";
import ShareFile from "../pages/ShareFile";
import StatisticsChart from "../pages/StatisticsChart";

type ThemeMode = "dark" | "light";

const RouterDetail = () => {
  return (
    <Box
      flex={12}
      bgcolor={"background.default"}
      color={"text.primary"}
      minHeight="600px"
      sx={{pt:10,pl:5}}
    >
      <Routes>

        <Route path="/contract">
          <Route index element={<ContractPage />} />
          <Route path=":id" element={<ContractDetail />} />
          <Route path="create" element={<ContractCreate />} />
        </Route>

        <Route path="/docs">
          <Route index element={<DocPage />} />
          <Route path=":id" element={<DocDetail />} />
          <Route path="create" element={<DocCreate />} />
        </Route>

        <Route path="/project-info">
          <Route index element={<ProjectInfo />} />
          <Route path="create" element={<ProjectInfoCreate />} />
          <Route path=":id" element={<ProjectInfoDetail />} />
        </Route>

        <Route path="/timeline">
          <Route index element={<TimelinePage />} />
          <Route path=":id/modify" element={<TimelineModify />} />
          <Route path=":id" element={<TimelineDetail />} />
          {/* <Route path="create" element={<TimelineCreate id/>} /> */}
        </Route>

        <Route path="/plan">
          <Route index element={<ProjectPlanPage />} />
          <Route path=":id" element={<ProjectPlanDetail />} />
          <Route path="create" element={<ProjectPlanCreate />} />
        </Route>

        
        <Route path="/statistics"> 
          <Route index element={<StatisticsChart />} />
        </Route>
     
        <Route path="/share-file">
          <Route index element={<ShareFile />} />
        </Route> 

    

        {/* <Route path="/" element={user ? <HomePage /> : <LoginPage />} /> */}

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

export default function NavRouter() {
  const [mode, setMode] = React.useState<ThemeMode>(() =>
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode")!)
      : "light"
  );

  const myTheme = createTheme({
    palette: {
      mode: mode,
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Box>
          <AuthProvider>
            <Header />
            <Stack direction="row" sx={{ display: "flex" }}>
              <SiderBar mode={mode} setMode={setMode} />
              <RouterDetail />
            </Stack>
            <Copyright sx={{mt:4,mb:4}} />
          </AuthProvider>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
