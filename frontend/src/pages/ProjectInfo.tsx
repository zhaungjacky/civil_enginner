import useFetch from "../hook/useFetch";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Loading from "../components/Loading";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const gridStyle = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
};

export type ProjectInfoColType = {
  key: string;
  context: string;
  xsGridSpan: number;
  mdGridSpan: number;
  lgGridSpan: number;
  format?: (val: any) => string;
};

const ProjectInfoCols: ProjectInfoColType[] = [
  {
    key: "contractNo",
    context: "合同号",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "contractDay",
    context: "建设日期",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: Date) =>
      new Date(val).toLocaleDateString().replaceAll("/", "-"),
  },
  {
    key: "contractDuration",
    context: "周期",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "projectPlace",
    context: "项目地点",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "totalPrice",
    context: "合同额￥",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "investment",
    context: "总投资￥",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "economicPerformance",
    context: "经济指标￥",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
    format: (val: number) => String(val / 10000) + "万元",
  },
  {
    key: "hetongfenjiebiao",
    context: "合同分解表",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "xiangguanfang",
    context: "相关方",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "lessor",
    context: "甲方",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "chargertwo",
    context: "负责人",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },

  {
    key: "maxcrane",
    context: "吊车",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },
  {
    key: "liftheight",
    context: "吊高",
    xsGridSpan: 12,
    mdGridSpan: 6,
    lgGridSpan: 4,
  },

  {
    key: "buildingdetails",
    context: "厂房参数",
    xsGridSpan: 12,
    mdGridSpan: 12,
    lgGridSpan: 12,
  },
  {
    key: "constructionContent",
    context: "建设内容",
    xsGridSpan: 12,
    mdGridSpan: 12,
    lgGridSpan: 12,
  },
];

export type ProjectInfoType = {
  contractDay: Date;
  contractNo: string;
  contractDuration: number;
  projectPlace: string;
  totalPrice: number;
  constructionContent: string;
  productModel: string;
  annualcapacity: string;
  buildingdetails: string;
  liftheight: string;
  maxcrane: string;
  whotobuild: string;
  chargerone: string;
  chargertwo: string;
  lessor: string;
  investment: number;
  economicPerformance: number;
  hetongfenjiebiao: string;
  xiangguanfang: string;
  id?: string;
  project_name?: string;
  projectName?: string;
  user?: number;
} & { [index: string]: any };

type Mainsectionprops = {
  items: ProjectInfoType[];
};

const MainSectionPage = ({ items }: Mainsectionprops) => {
  return (
    <Box>
      <Paper elevation={4} sx={{ mt: 2, ml: 3 }}>
        {items
          ? items.map((item) => (
              <Accordion key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={4} lg={2} sx={gridStyle}>
                      <Typography
                        variant="subtitle1"
                        fontSize={{
                          xs: "12px",
                          md: "14px",
                          lg: "18px",
                        }}
                      >
                        <CalendarMonthIcon
                          color="primary"
                          sx={{ fontSize: "24px" }}
                        />{" "}
                        {item.project_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} sx={gridStyle}>
                      <Typography
                        variant="subtitle1"
                        fontSize={{
                          xs: "12px",
                          md: "14px",
                          lg: "18px",
                        }}
                      >
                        {item.productModel}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2} sx={gridStyle}>
                      <Typography
                        variant="subtitle1"
                        fontSize={{
                          xs: "12px",
                          md: "14px",
                          lg: "18px",
                        }}
                      >
                        {item.annualcapacity}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2} sx={gridStyle}>
                      <Typography
                        variant="subtitle1"
                        fontSize={{
                          xs: "12px",
                          md: "14px",
                          lg: "18px",
                        }}
                      >
                        {item.whotobuild}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2} sx={gridStyle}>
                      <Typography
                        variant="subtitle1"
                        fontSize={{
                          xs: "12px",
                          md: "14px",
                          lg: "18px",
                        }}
                      >
                        {item.chargerone}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container>
                    {ProjectInfoCols.map((col) => (
                      <Grid
                        item
                        xs={col.xsGridSpan}
                        md={col.mdGridSpan}
                        lg={col.lgGridSpan}
                        sx={gridStyle}
                        key={col.key}
                      >
                        <Typography
                          sx={{ minWidth: "120px", fontSize: "22px" }}
                          color="text.primary"
                        >
                          {" "}
                          {col.context}:
                        </Typography>
                        <Typography sx={{ fontSize: "18px", ml: 2 }}>
                          {col.format
                            ? col.format(item[col.key])
                            : item[col.key]}
                        </Typography>
                      </Grid>
                    ))}
                    <Container>
                      <IconButton>
                        <Link to={`/project-info/${item?.id}`}>
                          <EditIcon color="success" />
                        </Link>
                      </IconButton>
                    </Container>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          : null}
      </Paper>
    </Box>
  );
};

const ProjectInfo = () => {
  const { data } = useFetch<ProjectInfoType[]>("api/project-info");
  const [items, setItems] = useState([] as ProjectInfoType[]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    let timer = setTimeout(() => {
      if (val.length > 0) {
        let searchItems = data?.filter(
          (item) =>
            item.annualcapacity.toLowerCase().includes(val.toLowerCase()) ||
            item.buildingdetails.toLowerCase().includes(val.toLowerCase()) ||
            item.chargerone.toLowerCase().includes(val.toLowerCase()) ||
            item.chargertwo.toLowerCase().includes(val.toLowerCase()) ||
            item.constructionContent
              .toLowerCase()
              .includes(val.toLowerCase()) ||
            item.hetongfenjiebiao.toLowerCase().includes(val.toLowerCase()) ||
            item.lessor.toLowerCase().includes(val.toLowerCase()) ||
            item.liftheight.toLowerCase().includes(val.toLowerCase()) ||
            item.maxcrane.toLowerCase().includes(val.toLowerCase()) ||
            item.productModel.toLowerCase().includes(val.toLowerCase()) ||
            item.projectPlace.toLowerCase().includes(val.toLowerCase()) ||
            item?.project_name?.toLowerCase().includes(val.toLowerCase()) ||
            item.whotobuild.toLowerCase().includes(val.toLowerCase()) ||
            item.xiangguanfang.toLowerCase().includes(val.toLowerCase()) ||
            item.xiangguanfang.toLowerCase().includes(val.toLowerCase())
        ) as ProjectInfoType[];
        if (searchItems?.length > 0) {
          setItems(searchItems);
        }
      } else if (val.length === 0 && data) {
        setItems(data);
      }
      return () => clearTimeout(timer);
    }, 1000);
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Grid
          item
          xs={4}
          sm={0}
          alignContent="flex-start"
          display="flex"
          paddingLeft={2}
        >
          <ArrowDownwardIcon
            sx={{
              color: "lightcoral",
              flexDirection: "row",
              display: {
                xs: "none",
                sm: "inline-block",
              },
            }}
          />
        </Grid>
        <Grid item xs={4} sm={0}>
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "16px",
              md: "20px",
              lg: "24px",
            }}
            sx={{
              display: {
                xs: "none",
                sm: "inline-block",
              },
            }}
          >
            项目信息
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          lg={4}
          sx={{ display: "flex", flexDirection: "row-reverse", pr: 2 }}
        >
          <IconButton color="secondary" onClick={() => navigate("/")}>
            <UndoIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => navigate("/project-info/create")}
          >
            <AddIcon />
          </IconButton>
          <TextField
            id="outlined-select-currency"
            type="input"
            size="small"
            label="输入名称、机型、产量等"
            defaultValue=""
            sx={{ pr: 3 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e)
            }
          />
        </Grid>
      </Grid>
      {items[0] ? (
        <MainSectionPage items={items} />
      ) : (
        <Container>
          <Loading message="Loading" />
          <Box sx={{ mt: 3 }}>
            <Typography color="info">服务器请求数据中....</Typography>
            <Typography color="error">或无数据....</Typography>
            <Typography color="primary">
              <Button onClick={() => navigate("/")}>返回主页</Button>
            </Typography>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default ProjectInfo;
