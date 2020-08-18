import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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
