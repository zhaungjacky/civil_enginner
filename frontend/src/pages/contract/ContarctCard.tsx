import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ContractDataProps } from "../ContractPage";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

type cardProps = {
  item: ContractDataProps;
};
export default function ContractCard({item}: cardProps) {
  return (
    <Card sx={{ maxWidth: 375, minHeight: 200,mt:2,mb:2 }} >
      <CardContent sx={{ pb: 0.5 }}>
        <Typography sx={{ fontSize: 18 ,p:0,m:0}} color="text" gutterBottom>
          {item.number}
        </Typography>
        <Divider />
        <Typography
          component="div"
          sx={{ fontSize: 14, pt: 1, pb: 1 }}
        >
          {item.supplier}
        </Typography>
        <Divider />
        <Typography sx={{ mb: 1, pt: 1 }}>
          {(item.totalAmount / 10000)} 万元
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          sx={{
            minHeight: 40,
            pt: 1,
            pb:0.5,
            m: 0,
            textAlign: "left",
            display: "inline-block",
            alignItems: "center",
          }}
        >
          <strong>
            {item.project_name}
            <span> : </span>
          </strong>{" "}
          {item.content}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", m: 0, p: 0 }}
      >
        <Link to={`/contract/${item.id}`} state={item}>
          <Button size="small" sx={{ m: 0, pb: 0.5 }}>
            Learn Detail
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
