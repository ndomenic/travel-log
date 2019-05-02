import React, {Component} from 'react';
import axios from 'axios';
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
    viewing: "featuredPhotos",
    images: ["https://cdn.dribbble.com/users/159302/screenshots/1900376/material-spinner2.gif"]
  };

  getLinks = (title, id, viewing) => {
  	let ths = this;
  	axios.get(process.env.REACT_APP_API + '/getLinks/' + this.props.country + '/' + id + '/' + viewing)
  	.then(function(response) {
  		let arr = [];
  		response.data["links"].forEach(function(link) {
  			arr.push(process.env.REACT_APP_API + link);
  		});
  		ths.setState({images: arr});
    });
  }

  open = (title, id) => {
  	let description = "";
  	this.props.mapData["markers"].forEach(function(marker) {
  		if (marker["name"] === title) 
  			description = marker["description"];
  	});
  	this.getLinks(title, id, "featuredPhotos");
  	this.setState({id: id, open: true, viewing: "featuredPhotos", title: title, description: description});
  };

  close = () => {
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({viewing: event.target.value});
    this.getLinks(this.state.title, this.state.id, event.target.value);
  };

  render () {
    return (
      <div>
        <Dialog
        	fullWidth={true}
        	maxWidth={'sm'}
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <DialogTitle id="modal-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="modal-description">
            	{this.state.description.split('\n').map((item, key) => {
							  return <span key={key}>{item}<br/></span>
							})}
            </DialogContentText>
            <FormControl style={{marginTop: '20px', marginBottom: '20px', minWidth: '150px'}}>
              <InputLabel htmlFor="viewing-option">Viewing Option</InputLabel>
              <Select
                value={this.state.viewing}
                onChange={this.handleChange}
              >
                <MenuItem value="featuredPhotos">Featured Photos</MenuItem>
                <MenuItem value="allPhotos">All Photos</MenuItem>
              </Select>
            </FormControl>
            <div style={{margin: 'auto', width: '552px', paddingBottom: '24px'}}>
            <Carousel  	
            	width={'552px'}
            	showStatus={false}
            	infiniteLoop={true}
            	autoPlay
            	interval={7000}
            	showThumbs={false}
            	dynamicHeight={true}
            >
	          	{this.state.images.map(function(link) {
					      return  <div key={link}>
										      <img src={link} alt="loading..."/>
										    </div>
					    })}
	          </Carousel>
	          </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default LocationModal;