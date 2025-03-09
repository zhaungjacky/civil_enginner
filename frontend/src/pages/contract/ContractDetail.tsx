import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import  InputAdornment  from "@mui/material/InputAdornment";
import useFetch from "../../hook/useFetch";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import { ContractDataProps } from "../ContractPage";

export interface ColumnContractType {
  id:
    | "number"
    | "supplier"
    | "signDate"
    | "totalAmount"
    | "content"
    | "bidNumber"
    | "bidType"
    | "financialAdvice"
    | "legalAdvice"
    | "supervisor"
    | "supplyChainManager"
    | "implementationOfAdvices"
    | "payment"
    | "operator"
    | "taxRate"
    | "project_name";
  label: string;
  type: string;
  format?: (value: any) => any;
}

export const columns_Contarct: ColumnContractType[] = [
  {
    id: "number",
    label: "合同编号",
    type: "text",
  },
  {
    id: "supplier",
    label: "供应商",
    type: "text",
  },
  {
    id: "signDate",
    label: "合同日期",
    type: "text",
    format: (value: Date) =>
      new Date(value).toLocaleDateString().replaceAll("/", "-"),
  },
  {
    id: "totalAmount",
    label: "合同金额(元)",
    type: "number",
  },
  {
    id: "content",
    label: "合同内容",
    type: "text",
  },
  {
    id: "bidNumber",
    label: "标书编号",
    type: "text",
  },
  {
    id: "bidType",
    label: "招标类别",
    type: "text",
  },
  {
    id: "financialAdvice",
    label: "财务意见",
    type: "text",
  },
  {
    id: "legalAdvice",
    label: "法务意见",
    type: "text",
  },
  {
    id: "supervisor",
    label: "主管领导",
    type: "text",
  },
  {
    id: "supplyChainManager",
    label: "供应链人员",
    type: "text",
  },
  {
    id: "implementationOfAdvices",
    label: "意见执行情况",
    type: "text",
  },
  {
    id: "payment",
    label: "货款支付",
    type: "text",
  },
  {
    id: "operator",
    label: "经办人",
    type: "text",
  },
  {
    id: "taxRate",
    label: "税率",
    type: "text",
    format: (value: number) => value * 100,
  },
  {
    id: "project_name",
    label: "项目",
    type: "text",
  },
];

export default function ContractDetail() {
  const { id } = useParams();
  const { data } = useFetch<ContractDataProps>("/api/contract/" + id);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const { user, authTokens } = useAuth();
  const [item, setItem] = useState<ContractDataProps>();
  const [editable, setEditable] = useState<boolean>(false)
  useEffect(() => {
    if (data) {
      setItem(data);
      // console.log(item)

      setEditable(data.user === user?.user_id)
    }
  }, [data, id, user?.user_id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    console.log(user?.user_id)
    console.log(data?.user)

    if(!editable){
      alert('仅本合同信息录入同事可修改')
      return
    }
    const formData = new FormData(e.currentTarget);

    //! let obj: { [index: string]: any } = {
    let obj: ContractDataProps = {
      project_name: formData.get("project_name") as string,
      number: formData.get("number") as string,
      supplier: formData.get("supplier") as string,
      signDate: new Date(formData.get("signDate") as string),
      totalAmount: parseFloat(formData.get("totalAmount") as string),
      content: formData.get("content") as string,
      bidNumber: formData.get("bidNumber") as string,
      bidType: formData.get("bidType") as string,
      financialAdvice: formData.get("financialAdvice") as string,
      legalAdvice: formData.get("legalAdvice") as string,
      supervisor: formData.get("supervisor") as string,
      supplyChainManager: formData.get("supplyChainManager") as string,
      implementationOfAdvices: formData.get("implementationOfAdvices") as string,
      payment: formData.get("payment") as string,
      operator: formData.get("operator") as string,
      taxRate: parseFloat(formData.get("taxRate") as string) / 100,
      projectName: item?.projectName as string,
      user_id: user?.user_id,
    }

    fetch("api/contract/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: "Bearer " + String(authTokens?.access),
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Update success!");
          const timeOut = setTimeout(() => {
            navigate("/contract");
            return () => clearTimeout(timeOut);
          }, 1500);
        } else {
          setMessage(res.statusText);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDelete = () => {
    alert("Operate With Cautious!");
  };
  if (!data) {
    return <Loading message="loading" />;
  } else {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <Typography variant="h5" color="success">
                修改-删除合同信息
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Container sx={{ mt: 2 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid
              container
              spacing={1}
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
              id="contract-form-modify-id"
            >
              {item
                ? columns_Contarct.map((column) => {
                    const value = item[column.id];
                    return (
                      <Grid
                        item
                        xs={6}
                        key={String(column.id)}
                        sx={{ mt: 1.5, pr: 1 }}
                      >
                        <TextField
                          size="small"
                          margin="none"
                          required
                          fullWidth
                          id={column.id}
                          label={column.label}
                          name={column.id}
                          type={column.type}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {column.id === "taxRate" ? "%" : ""}
                              </InputAdornment>
                            ),
                          }}
                          defaultValue={
                            column.format && column.id === "signDate"
                              ? column.format(value as Date)
                              : (column.format && column.id === "taxRate")
                              ? column.format(value as number)
                              : value
                          }
                        />
                      </Grid>
                    );
                  })
                : null}

              {message && (
                <Grid item xs={12}>
                  <Typography variant="h5" color="error">
                    {message}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <ButtonGroup sx={{ p: 1 }} variant="outlined">
                  <Button type="submit" color="primary" disabled={!editable}>
                    <SendIcon />
                  </Button>
                  <Button color="secondary" onClick={() => navigate(-1)}>
                    <UndoIcon />
                  </Button>
                  <Button onClick={handleDelete} color="warning"  disabled={!editable}>
                    <DeleteForeverIcon />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Container>
    );
  }
}
