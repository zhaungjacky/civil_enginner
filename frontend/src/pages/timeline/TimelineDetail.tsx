import useFetch from "../../hook/useFetch";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupsIcon from "@mui/icons-material/Groups";
import OutputIcon from "@mui/icons-material/Output";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Undo from "@mui/icons-material/Undo";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useEffect, useState } from "react";
import TimelineCreate from "./TimelineCreate";
import TextField from "@mui/material/TextField";
import * as XLSX from "xlsx";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import { ProjectNameType } from "../contract/ContractCreate";
import EditIcon from "@mui/icons-material/Edit";

/*
{
    "id": "18a019bf-e3c6-4da3-a561-52f79fb6a954",
    "project_name": "广东阳江-自建",
    "user_name": "admin",
    "specifyDay": "2023-07-29T16:00:00Z",
    "keyPoint": "123123",
    "groups": "12312",
    "mainSection": "123123",
    "output": "12312",
    "created_at": "2023-07-30T07:29:31.588444Z",
    "updated_at": "2023-07-30T07:29:31.588459Z",
    "projectName": "689c841c-804e-4dd9-b241-6fcdcdebffec",
    "user": 1
}
*/

export type TimelineType = {
  id?: string;
  project_name?: string;
  user_name?:string;
  specifyDay: Date | string;
  keyPoint: string;
  groups: string;
  mainSection: string;
  output: string;
  created_at?: Date;
  updated_at?: Date;
  projectName?: string;
  projectName_id?: string;
  user?: number;
  user_id?: number;
};

type HeaderProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAddSection: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  handleDownload: () => void;
};

type DetailPageProps = {
  data: TimelineType[];
};

const DetailPage = ({ data }: DetailPageProps) => {
  return (
    <Paper elevation={4}>
      {data?.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container spacing={1}>
              <Grid item xs={4} md={6} lg={6}>
                <Typography variant="subtitle1" component="h4">
                  <CalendarMonthIcon color="primary" />{" "}
                  {new Date(item.specifyDay).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={8} md={6} lg={6}>
                <Typography variant="subtitle1" component="h4">
                  {item.keyPoint}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={4} sx={{ alignItems: "center" }}>
                <CorporateFareIcon color="primary" sx={{ mr: 1 }} />
                <>牵头部门</>
              </Grid>
              <Grid item xs={8}>
                <Typography>{item.mainSection}</Typography>
              </Grid>
              <Grid item xs={4}>
                <GroupsIcon color="primary" sx={{ mr: 1 }} />
                <>相关人员</>
              </Grid>
              <Grid item xs={8}>
                <Typography>{item.groups}</Typography>
              </Grid>
              <Grid item xs={4}>
                <OutputIcon color="primary" sx={{ mr: 1 }} />
                <>输出内容</>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  justifyContent: "left",
                }}
              >
                <Typography>{item.output}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} lg={3}>
                <Container>
                  <IconButton>
                    <Link to={`/timeline/${item.id}/modify`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Container>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

const NoDataPage = () => {
  return (
    <Card>
      {/* <Loading /> */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" component="h2" sx={{ mb: 1 }}>
          <Loading message="loading" />
          加载中... 或该项目无时间轴数据...
        </Typography>

        <Typography variant="subtitle1" component="h2" sx={{ mb: 1 }}>
          请返回上一页
        </Typography>
      </Box>
    </Card>
  );
};

const HeaderSection = ({
  handleSearch,
  setShowAddSection,
  projectName,
  handleDownload,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Grid
        item
        xs={0}
        sm={4}
        lg={4}
        sx={{
          pl: 0,
          display: {
            xs: "none",
            sm: "flex",
          },
          alignContent: "flex-start",
        }}
      >
        <TimelineIcon color="error" sx={{ ml: 3 }} />
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
          alignContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize={{ xs: "16px", sm: "20px", md: "24px" }}
        >
          {projectName}--项目时间轴
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        lg={4}
        sx={{
          display: "flex",
          alignItems: "center",
          // flexDirection: "row",
        }}
      >
        <TextField
          id="outlined-select-currency"
          type="input"
          size="small"
          label="输入关键点、人员、输出等"
          defaultValue=""
          sx={{ pr: 3, alignSelf: "flex-end" }}
          onChange={handleSearch}
          // helperText="输入关键点、人员、输出等"
        />
        <IconButton
          color="primary"
          onClick={() => setShowAddSection((prev) => !prev)}
        >
          <AddIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => navigate("/timeline")}>
          <Undo />
        </IconButton>
        <IconButton>
          <DownloadSharpIcon color="success" onClick={handleDownload} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const TimelineDetail = () => {
  const { id } = useParams();
  const { data } = useFetch<TimelineType[]>("api/timeline/" + id);
  const { data: projectServerName } = useFetch<ProjectNameType>(
    "api/project-name/" + id
  );

  const [showAddSection, setShowAddSection] = useState<boolean>(false);
  const [items, setItems] = useState([] as TimelineType[]);
  const [projectName, setProjectName] = useState<string | null>(null);
  useEffect(() => {
    if (data) {
      setItems(data);
    }
    if (projectServerName) {
      setProjectName(projectServerName?.projectName);
    }
  }, [data, projectServerName]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    let timer = setTimeout(() => {
      if (val !== "") {
        let searchData = items.filter(
          (item) =>
            item.keyPoint.toLowerCase().includes(val.toLowerCase()) ||
            item.groups.toLowerCase().includes(val.toLowerCase()) ||
            item.mainSection.toLowerCase().includes(val.toLowerCase()) ||
            item.output.toLowerCase().includes(val.toLowerCase())
        );
        if (searchData.length > 0) {
          setItems(searchData);
          console.log(searchData);
        }
      } else {
        if (data) setItems(data);
      }
      return () => clearTimeout(timer);
    }, 500);
  };

  const handleDownload = () => {
    let sourceData: { [index: string]: any }[] = [];
    items.forEach((item, index) => {
      sourceData.push({
        序: index + 1,
        项目名称: item.projectName,
        日期: new Date(item.specifyDay).toLocaleDateString(),
        关键点: item.keyPoint,
        相关人员: item.groups,
        牵头部门: item.mainSection,
        输出内容: item.output,
      });
      return null;
    });

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(sourceData);
    let fileTile = projectName + "项目时间轴.xlsx";
    XLSX.utils.book_append_sheet(wb, ws, "sheet-V00");
    XLSX.writeFile(wb, fileTile);
  };

  return (
    <Box>
      {projectName ? (
        <HeaderSection
          handleSearch={handleSearch}
          setShowAddSection={setShowAddSection}
          projectName={projectName}
          handleDownload={handleDownload}
        />
      ) : null}
      {showAddSection && id && projectName ? (
        <TimelineCreate context={id} projectName={projectName} />
      ) : (
        <Container>
          {projectName && items.length > 0 ? (
            <DetailPage data={items} />
          ) : (
            <NoDataPage />
          )}
        </Container>
      )}
    </Box>
  );
};

export default TimelineDetail;
