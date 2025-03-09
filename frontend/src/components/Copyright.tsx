import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {new Date().getFullYear()}
        <Link color="inherit" href="https://i.dongfang.com/">
          如使用过程遇到问题,请联系 13550640958 
        </Link>{' '}
        {'.'}
      </Typography>
    );
  }