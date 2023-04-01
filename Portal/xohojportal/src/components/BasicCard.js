import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({title, completion, certified, id}) {

  const navigate = useNavigate()

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {completion} % completed
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {certified}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/certs/${id}`} size="small">Learn More</Link>
      </CardActions>
    </Card>
  );
}