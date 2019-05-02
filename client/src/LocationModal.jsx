import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class LocationModal extends Component {
	state = {
    open: false,
    title: "",
    description: "",
    viewing: "featured"
  };

  open = (title) => {
    this.setState({open: true, title: title});
    this.setState({description: "This is a temporary description"});
  };

  close = () => {
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({viewing: event.target.value});
  };

  viewAllPictures = () => {
  	console.log("this should show the user all the pictures");
  }

  render () {
  	let images = this.props.mapData["links"].map(function(link) {
      return  <div>
					      <img src={link} alt="loading..."/>
					    </div>
    });
    
    return (
      <div>
        <Dialog
        	fullWidth={true}
        	maxWidth={'md'}
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <DialogTitle id="modal-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="modal-description">
              {this.state.description}
            </DialogContentText>
            <FormControl style={{marginTop: '20px', marginBottom: '20px', minWidth: '150px'}}>
              <InputLabel htmlFor="viewing-option">Viewing Option</InputLabel>
              <Select
                value={this.state.viewing}
                onChange={this.handleChange}
              >
                <MenuItem value="featured">Featured Photos</MenuItem>
                <MenuItem value="all">All Photos</MenuItem>
              </Select>
            </FormControl>
            <div style={{margin: 'auto', width: '600px'}}>
            <Carousel  	
            	width={'600px'}
            	showStatus={false}
            	infiniteLoop={true}
            	autoPlay
            	interval={7000}
            	dynamicHeight={true}
            >
	          	{images}
	          </Carousel>
	          </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default LocationModal;