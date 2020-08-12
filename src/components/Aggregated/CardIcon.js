import React, { useContext, useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SubCard from './subCard'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import treeImage from './tree.png';
import gasImage from './gas.png';
import oilImage from './oil.png';
import carImage from './car.jpg';
import { CounterContext } from "./chart-context-provider";


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
    const {dataResults4}  = useContext(CounterContext);
    const [dataResultsContext4, setDataResultsContext4] = dataResults4;


  return (
<div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: '20%'}}>
          <ListSubheader component="div">Energy Consumption</ListSubheader>
        </GridListTile>
        {console.log(dataResultsContext4)}
        {dataResultsContext4.map((tile) => (
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
