import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    },
    
  
    typg:{
        marginTop:theme.spacing.unit * 2,
    },
    table: {
        minWidth: 700
      },
      exppanelcenter:{
          'div':{
            justifyContent:"center"
          }
          
      }
     
  });
  

class ResultComponent extends Component {
  

  constructor(props) {
    super(props);

    this.state = {
      cost: '',
      time: '',
      transport: '',
      stops: '',
    }
  }

  

  render() {
    const { classes,from,to } = this.props;
    const trips = this.props.result;
    let timeinminutes=0,totalcost=0;

    for(let trip of trips){
        timeinminutes= timeinminutes + parseInt(trip.duration.h)*60+parseInt(trip.duration.m);
        totalcost=totalcost+(trip.cost * (1 - (trip.discount / 100)));
    }
   let hours = Math.floor(timeinminutes/60);
    let minutes = timeinminutes%60;
    return (
        <Grid item xs={12}>
        <Typography className={classes.typg} variant="h5" component="h3" align="center">
     Best route for this selection will cost {totalcost} Euros and take {hours} Hrs and {minutes} mins.
      </Typography>

       <ExpansionPanel>
        <ExpansionPanelSummary className={classes.exppanelcenter} expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.typg} variant="h6" component="h3" align="center">{from} > {to}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableBody>
          {trips.map((row,index) => (
            <TableRow key={index}>
              
              <TableCell align="right">{row.departure}</TableCell>
              <TableCell align="right">{row.arrival}</TableCell>
              <TableCell align="right">{row.transport}</TableCell>
              <TableCell align="right">{(row.cost * (1 - (row.discount / 100)))} Euros</TableCell>
              <TableCell align="right">{row.duration.h} hours and {row.duration.m} mins</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
      
      </Grid>
      
    )
  }
}
export default withStyles(styles)(ResultComponent)