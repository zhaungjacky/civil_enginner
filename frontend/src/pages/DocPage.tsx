import { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { Container, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
// import Link,{LinkBaseProps} from "@mui/material/Link"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "type_name", headerName: "类别", width: 100 },
  { field: "fileName", headerName: "文件名称", width: 210 },
  { field: "publishDate", headerName: "签发时间", type: "date", width: 130 },
  { field: "remark", headerName: "备注", width: 160 },
  { field: "jingbanren", headerName: "经办", width: 100 },
  { field: "qianfa", headerName: "签发", width: 100 },
  { field: "neiwaibu", headerName: "内外", width: 100 },
  { field: "duifangmingcheng", headerName: "相关方", width: 40 },
  // { field: "aLink", headerName: "详情", width: 180 },
];

type DocDeterimanledType = {
  type_name: string;
  number: string;
  fileName: string;
  publishDate: Date;
  remark: string;
  jingbanren: string;
  qianfa: string;
  neiwaibu: string;
  duifangmingcheng: string;
};

type DocOptionalType = {
  launchDate?: Date;
  id?: string;
  updated_at?: Date;
  created_at?: Date;
  username?: string;
  user?: number;
  user_id?: number;
  // aLink?:LinkBaseProps;
};

export type DocType = DocDeterimanledType &
  DocOptionalType & { [index: string]: any };

const DocPage = () => {
  const { data } = useFetch<DocType[]>("/api/docs");
  const [items, setItems] = useState<DocType[]>();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  let rows: DocType[] = [];

  items?.forEach((item, index) => {
    rows.push({
      type_name: item.type_name,
      number: item.number,
      fileName: item.fileName,
      publishDate: new Date(item.publishDate),
      // launchDate: new Date(item.launchDate),
      remark: item.remark,
      jingbanren: item.jingbanren,
      qianfa: item.qianfa,
      neiwaibu: item.neiwaibu,
      duifangmingcheng: item.duifangmingcheng,
      id: (index + 1).toString(),
      // aLink: <Link href={`/docs/${item.id}`} >Detail</Link>
    });
    return null;
  });

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});


  return (
    <Container sx={{ maxWidth: "90%" }}>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <DocumentScannerIcon sx={{ color: "lightcoral" }} />
          </Box>
          <Box>
            <Typography>文件台帐</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <IconButton color="secondary" onClick={() => navigate("/")}>
              <UndoIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => navigate("/docs/create")}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <FormControlLabel
          checked={columnVisibilityModel.id !== false}
          onChange={(event) =>
            setColumnVisibilityModel(() => ({
              id: (event.target as any).checked,
            }))
          }
          control={<Switch color="primary" size="small" />}
          label="Show ID column"
        />
        <FormControlLabel
          checked={filterModel.quickFilterExcludeHiddenColumns}
          onChange={(event) =>
            setFilterModel((model) => ({
              ...model,
              quickFilterExcludeHiddenColumns: (event.target as any).checked,
            }))
          }
          control={<Switch color="primary" size="small" />}
          label="Exclude hidden columns"
        />
        <Box sx={{ height: 600 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            disableColumnFilter
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            filterModel={filterModel}
            onFilterModelChange={(newModel) => setFilterModel(newModel)}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default DocPage;
