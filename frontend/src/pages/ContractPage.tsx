import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import ContractCard from "./contract/ContarctCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Undo from "@mui/icons-material/Undo";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import Loading from "../components/Loading";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

// export type ContractDataProps = {
//   id?: string;
//   project_name: string;
//   number: string;
//   supplier: string;
//   signDate: Date;
//   totalAmount: number;
//   content: string;
//   bidNumber: string;
//   bidType: string;
//   financialAdvice: string;
//   legalAdvice: string;
//   supervisor: string;
//   supplyChainManager: string;
//   implementationOfAdvices: string;
//   payment: string;
//   operator: string;
//   taxRate: number;
//   projectName?: string;
//   updated_at?: Date;
//   created_at?: Date;
//   user?: string | null;
//   user_id?:number
//   projectName_id?: string
// };

export type ContractDataProps = ContractDetermineType & ContractOptionalType;

export type ContractDetermineType = {

  number: string;
  supplier: string;
  signDate: Date;
  totalAmount: number;
  content: string;
  bidNumber: string;
  bidType: string;
  financialAdvice: string;
  legalAdvice: string;
  supervisor: string;
  supplyChainManager: string;
  implementationOfAdvices: string;
  payment: string;
  operator: string;
  taxRate: number;
};

export type ContractOptionalType = {
  project_name?: string;
  projectName?: string;
  updated_at?: Date;
  created_at?: Date;
  user?: string | null;
  user_id?: number;
  projectName_id?: string;
  id?: string;
};

type DownloadDataType = {
  序: number;
  项目名称: string;
  合同号: string;
  供应商: string;
  签约时间: Date;
  合同金额: number;
  合同内容: string;
  招标编号: string;
  招标类别: string;
  财务意见: string;
  法务意见: string;
  意见执行情况: string;
  主管领导: string;
  供应链经办人: string;
  部门经办人: string;
  付款情况: string;
  税率: string;
};

export default function ContractPage() {
  const [items, setItems] = useState<ContractDataProps[]>([]);
  const { data } = useFetch<ContractDataProps[]>("/api/contract");
  const navigate = useNavigate();
  const [option, setOption] = useState<string[] | null>();
  const [projectName, setProjectName] = useState<string | null>();

  useEffect(() => {
    if (data) {
      setItems(data);
      let projectNameArray = data
        .map((item) => {
          if(item.project_name){

            return item?.project_name
          } else {
            return ""
          }
        })
        .sort((a, b) => (a > b ? 1 : 0));
      let uniqueName: string[] = [];
      projectNameArray.forEach((item, index) => {
        if (item !== projectNameArray[index + 1]) {
          uniqueName.push(item);
        }
        return null;
      });
      if (uniqueName.length > 0) setOption(uniqueName);
    }
  }, [data]);

  const handleSearch = (event: SelectChangeEvent<HTMLInputElement>): void => {
    let val: string = event.target.value as string;
    let timeOut = setTimeout(() => {
      if (val.length > 0) {
        let tmp = data!.filter((item) => item.project_name === val);
        if (tmp.length > 0) {
          setItems(tmp);
          setProjectName(val);
        } else {
          setProjectName(null);
        }
      } else if (val.length === 0) {
        setItems(data!);
        setProjectName(null);
      }
      return () => clearTimeout(timeOut);
    }, 500);
  };

  const handleDownload = () => {
    let sourceData: DownloadDataType[] = [];
    items.forEach((item, index) => {
      sourceData.push({
        序: index + 1,
        项目名称: item.project_name as string,
        合同号: item.number,
        供应商: item.supplier,
        签约时间: new Date(item.signDate),
        合同金额: item.totalAmount,
        合同内容: item.content,
        招标编号: item.bidNumber,
        招标类别: item.bidType,
        财务意见: item.financialAdvice,
        法务意见: item.legalAdvice,
        意见执行情况: item.implementationOfAdvices,
        主管领导: item.supervisor,
        供应链经办人: item.supplyChainManager,
        部门经办人: item.operator,
        付款情况: item.payment,
        税率: item.taxRate * 100 + "%",
      });
      return null;
    });

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(sourceData);
    let fileTile =
      projectName === null
        ? "合同明细.xlsx"
        : projectName + "项目合同明细.xlsx";
    XLSX.utils.book_append_sheet(wb, ws, "sheet-V00");
    XLSX.writeFile(wb, fileTile);
    return null;
  };
  if (!data) return <Loading message="loading" />;
  return (
    <Container sx={{ mt: 2 }}>
      <Box marginLeft={2}>
        <Grid
          container
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
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
            }}
          >
            <DesignServicesIcon color="warning" />
          </Grid>
          <Grid
            item
            xs={0}
            sm={4}
            lg={4}
            sx={{
              display: {
                xs: "none",
                sm: "inline-block",
              },
            }}
          >
            <Typography variant="h5" component="h2">
              合同信息
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            lg={4}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
              },
              // mt: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                maxWidth: "200px",
                minWidth: {
                  xs: "150px",
                  sm: "200px",
                },
                pr: 2,
              }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label" size="small">
                搜索项目合同
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                onChange={handleSearch}
                name="searchValue"
                // defaultValue=""
              >
                {option?.map((opt) => (
                  <MenuItem value={opt} key={opt}>
                    {opt}
                  </MenuItem>
                ))}
                <MenuItem value="">Reset</MenuItem>
              </Select>
            </FormControl>

            <IconButton
              color="primary"
              onClick={() => navigate("/contract/create")}
            >
              <AddIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => navigate("/")}>
              <Undo />
            </IconButton>
            <IconButton>
              <DownloadSharpIcon
                color="success"
                // sx={{ m: 1 }}
                onClick={handleDownload}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {items?.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id}>
              <ContractCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
