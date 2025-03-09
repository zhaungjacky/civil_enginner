import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";
import { FormControl, IconButton, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useRef, useState } from "react";
import useFetch from "../../hook/useFetch";
import { useAuth } from "../../context/AuthContext";
import { columns_Contarct } from "./ContractDetail";
import {ContractDataProps} from "../ContractPage";

export interface ProjectNameType {
  id: string;
  projectName: string;
}

export default function ContractCreate() {
  const { data: projectNames } =
    useFetch<ProjectNameType[]>("api/project-name");
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const defaultValue = useRef<HTMLInputElement>(null);

  const handleChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value as string);
    console.log(defaultValue.current?.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const formData = new FormData(e.currentTarget);

    //! let obj: {[index: string]: any} = {

    let obj: ContractDataProps = {
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
      implementationOfAdvices: formData.get(
        "implementationOfAdvices"
      ) as string,
      payment: formData.get("payment") as string,
      operator: formData.get("operator") as string,
      taxRate: parseFloat(formData.get("taxRate") as string) / 100,
      projectName_id: formData.get("projectName") as string,
      user_id: user?.user_id,
      // projectName: formData.get("projectName") as string,
      // project_name: document.getElementById("plan-create-projectname-id")?.innerHTML as string,
    };

    try {
      fetch("api/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + String(authTokens?.access),
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            setMessage("Create success!");
            let timeOut = setTimeout(() => {
              navigate("/contract");
              return () => clearTimeout(timeOut);
            }, 1500);
          } else {
            setMessage(res.statusText);
          }
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid
          container
          spacing={1}
          component="form"
          onSubmit={handleSubmit}
          id="contract-form-add-id"
        >
          {columns_Contarct.map((column) => {
            if (column.id === "project_name") return null;
            return (
              <Grid item xs={12} sm={6} key={column.id} sx={{ mt: 1.5, pr: 1 }}>
                <TextField
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  id={column.id}
                  label={column.label}
                  name={column.id}
                  type={column.type}
                  defaultValue={
                    column.id === "signDate"
                      ? new Date()
                          .toLocaleDateString()
                          .replaceAll("/", "-")
                          .toString()
                      : ""
                  }
                />
              </Grid>
            );
          })}
          <Grid item xs={12} sm={6} sx={{ mt: 1.5, pr: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label" size="small">
                选择已有项目
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="plan-create-projectname-id"
                size="small"
                fullWidth
                onChange={handleChange}
                name="projectName"
                ref={defaultValue}
                required
              >
                {projectNames?.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.projectName}
                  </MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>选择已有项目</FormHelperText> */}
            </FormControl>
          </Grid>

          {message && (
            <Grid item xs={12}>
              <Typography variant="h5" color="success">
                {message}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <ButtonGroup sx={{ p: 1 }} variant="outlined">
              <IconButton type="submit" color="primary">
                <AddIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => navigate(-1)}>
                <UndoIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
