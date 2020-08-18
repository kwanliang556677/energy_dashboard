import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from "react";
import { EnergyContext } from "./chart-context-provider";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      height:'100%',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  
export default function CardIcon() {
    const classes = useStyles();
    const {greenHouseState}  = useContext(EnergyContext);
    const [greenHouseContext, setGreenHouseState] = greenHouseState;

  return (
<div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: '20%'}}>
          <ListSubheader component="div">Energy Consumption</ListSubheader>
        </GridListTile>
        {console.log(greenHouseContext)}
        {greenHouseContext.map((tile) => (
          <GridListTile key={tile.img} style={{ height: '40%',padding:'10px' }}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                <img src={tile.img} alt={tile.title} style={{ height: '100%', width:'100%' }} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body2" display="block" gutterBottom> {tile.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" display="block" gutterBottom> {tile.author}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
             </Grid>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
