import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


export default function subCard() {
  

  return (
    <Grid container spacing={1}>
    <Grid item xs={6}>
      <Typography variant="overline" display="block" gutterBottom> Image</Typography>
    </Grid>
    <Grid item xs={6}>
    <Typography variant="overline" display="block" gutterBottom> Desc</Typography>
    </Grid>
  </Grid>
  );
}
