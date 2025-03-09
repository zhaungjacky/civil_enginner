import CircularProgress from "@mui/material/CircularProgress";
import Typography  from "@mui/material/Typography";
import Box  from "@mui/material/Box";
type LoadingProps = {
    message: string
}
export default function Loading({message}:LoadingProps) {
  return (
    <Box>
      <CircularProgress color="primary" sx={{p:3}}/>
      <Typography variant="h5" component='p' sx={{p:2}}>Loading...</Typography>
      <Typography color="error" sx={{p:2}}>{message}</Typography>
    </Box>
  )
}
