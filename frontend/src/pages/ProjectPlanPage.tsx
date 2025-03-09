import useFetch from "../hook/useFetch";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import Container from "@mui/material/Container";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ConstructionIcon from "@mui/icons-material/Construction";
import CompareIcon from "@mui/icons-material/Compare";
import ScheduleIcon from "@mui/icons-material/Schedule";

export type ProjectPlanType = {
  id?: string;
  project_name?: string;
  fuzeren_xiangmu: string;
  bidType: string;
  gongsilixiang: Date;
  gongyibujudingban: Date;
  keyanzhaobiao: Date;
  touweihui: Date;
  gongsijuece: Date;
  gudong_jituanbeian: Date;
  zhengfulixiang: Date;
  dikancehui: Date;
  tudizheng: Date;
  yongdiguihua: Date;
  zhaobiaodaili: Date;
  shigongfang_zhaobiao: Date;
  chubusheji: Date;
  shigongtu: Date;
  gongchengguihua: Date;
  jianlizhaobiao: Date;
  xiangguanzhaobiao: Date;
  shigongxukezheng: Date;
  jichu: Date;
  gangjiegou_zhizuo: Date;
  gangjiegou_anzhuang: Date;
  gangjiegou_weihu: Date;
  diping_chuli: Date;
  diaochejichu_chuli: Date;
  angmian_wumianban: Date;
  peidianxitong: Date;
  xiaofangxitong: Date;
  yuwuchulixitong: Date;
  gufeizhan: Date;
  qitafushu_sheshi: Date;
  diaoche_shebei_anzhuang: Date;
  charger: string;
  created_at?: Date;
  updated_at?: Date;
  modify_name?: string;
  projectName?: string;
  user?: number;
};

const ProjectPlanPage = () => {
  const { data } = useFetch<ProjectPlanType[]>("api/plan");
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ScheduleIcon sx={{ marginLeft: 3, color: "lightcoral" }} />
        <Typography
          sx={{
            fontSize: {
              xs: 14,
              sm: 20,
              lg: 24,
            },
          }}
        >
          建设计划
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 1 }}>
          <IconButton color="secondary" onClick={() => navigate(-1)}>
            <UndoIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => navigate("/plan/create")}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      {data ? (
        <Grid container spacing={2}>
          {data?.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Box>
                <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                  <Box>
                    <Typography>{item.project_name}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 1,
                    }}
                  >
                    <CompareIcon sx={{ minWidth: "50px" }} color="secondary" />
                    <Typography>{item.bidType}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 1,
                    }}
                  >
                    <ConstructionIcon
                      sx={{ minWidth: "50px" }}
                      color="primary"
                    />
                    <Typography>
                      {item.fuzeren_xiangmu.split("--")[1]}
                    </Typography>
                  </Box>

                  <Link
                    to={`/plan/${item.id}`}
                    state={{ project_name_id: item.projectName }}
                  >
                    <Typography>
                      <IconButton>
                        <DeveloperBoardIcon color="primary" />
                      </IconButton>
                    </Typography>
                  </Link>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper>
          <Loading message="loading..." />
        </Paper>
      )}
    </Container>
  );
};

export default ProjectPlanPage;
