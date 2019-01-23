import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ResultComponent from './ResultComponent';
import {shortestPathalgo} from '../util/helper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
 
  button: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  typg:{
      marginTop:theme.spacing.unit * 2,
  }
});



let originalarray = [];
class DrpContainerSrch extends React.Component {
    constructor() {
       super();
       this.state = {
        selectedDeparture: "",
        selectedArrival: "",
        tabvalue:0,
        groupmap:new Map(),
        referencemap:new Map(),
        searchResult: [],
       };
      
    }
    
    componentDidMount(){
        
        fetch(`./assets/response.json`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
          .then((response) => response.json()).then(data => {
            // Work with JSON data here
            originalarray = data.deals;
            const map = new Map();
            const refernceMap = new Map();
        originalarray.forEach((item) => {
        const key = item.departure;
        refernceMap.set(item.reference,item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
        
    });
    this.setState({groupmap:map,referencemap:refernceMap})
   
          });
        
          
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    handleSubmit = (event) => {
       //Make a network call somewhere
       event.preventDefault();
       this.routeCalculation();
    }
    handleReset = (event) => {
        
        event.preventDefault();
        this.setState({
            selectedDeparture: "",
        selectedArrival: "",
        tabvalue:0,
        groupmap:new Map(),
        referencemap:new Map(),
        searchResult: [],
          })
     }
    handleTabChange = (event, value) => {
        event.preventDefault();
        this.setState({ tabvalue:value },()=>{this.routeCalculation()});
        ;
       
      };
      routeCalculation=()=>{
        let resultArray = [];
        this.setState({searchResult:[]});
        resultArray= this.state.groupmap.get(this.state.selectedDeparture).filter(item=>item.arrival === this.state.selectedArrival);
        if(resultArray.length===0){
            let dummyStateObject = this.state;
         resultArray= shortestPathalgo(originalarray,dummyStateObject);
         this.setState({searchResult:resultArray});
        }else{
            if(this.state.tabvalue===0){
             resultArray.sort((a,b)=>(a.cost-a.discount)-(b.cost-b.discount));
             resultArray.length=1;
             this.setState({searchResult:resultArray});
            }else{
             resultArray.sort((a,b)=>(parseInt(a.duration.h)*60+parseInt(a.duration.m))-(parseInt(b.duration.h)*60+parseInt(a.duration.m)));
             resultArray.length=1;
             this.setState({searchResult:resultArray}); 
            }
 
        }
      }
    render() {
        
        const { classes } = this.props;
        const cityArray = Array.from( this.state.groupmap.keys() );
       return( 
        <Grid container spacing={8}>
        <Grid item xs={12}>
          <form className={classes.root} onSubmit={this.handleSubmit}>
          <Grid item xs={5}>
          <Typography className={classes.typg} variant="display1" component="h3">
          Select your origin destination pair:
        </Typography>
          </Grid>
          <Grid item xs={2}>
            <FormControl  className={classes.formControl}>
          <InputLabel htmlFor="origin">Origin</InputLabel>
          <Select
            value={this.state.selectedDeparture}
            onChange={this.handleChange}
            input={<FilledInput name="selectedDeparture" id="origin" />}
          >
          {cityArray.map((color, index) =>
            <MenuItem key={index} value={color}>{color}</MenuItem>
          )}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs ={2}>
        <FormControl  className={classes.formControl}>
          <InputLabel htmlFor="destination">Destination</InputLabel>
          <Select
            value={this.state.selectedArrival}
            onChange={this.handleChange}
            input={<FilledInput name="selectedArrival" id="destination" />}
          >
             {cityArray.map((color, index) =>
            <MenuItem key={index} value={color}>{color}</MenuItem>
          )}
          </Select>
        </FormControl>
        </Grid>

        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>Search Route</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleReset}>Reset </Button>
          </form>
          </Grid>
          <Grid item xs={12}>
          <Paper square>
        <Tabs
          value={this.state.tabvalue}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleTabChange}
          centered
        >
          <Tab label="Cheapest" />
          <Tab label="Fastest" />
        </Tabs>
      </Paper>
          </Grid>
       {this.state.searchResult.length>0? <ResultComponent result={this.state.searchResult} from={this.state.selectedDeparture} to={this.state.selectedArrival}/>:null}
          </Grid>
       )
    }
  }

export default withStyles(styles)(DrpContainerSrch);

