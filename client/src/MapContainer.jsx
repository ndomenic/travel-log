import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import LocationModal from './LocationModal'
 
export class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.modal = React.createRef();
    this.markerClicked = this.markerClicked.bind(this);
  }

  markerClicked = (title, id) => event => {
    this.modal.current.open(title, id);
  }

  render() {
    let ths =this;
    let markers = this.props.mapData["markers"].map(function(marker) {
      return <Marker
                onClick={ths.markerClicked(marker["name"], marker["id"])}
                name={marker["name"]}
                key={marker["name"]}
                position={{lat: marker["lat"], lng: marker["lng"]}}
              />;
    });

    return (
      <Map 
        google={this.props.google}
        zoom={8}
        initialCenter={this.props.mapData["center"]}
        style={{width: '100%', height: '100%', position: 'relative'}}
      >
        {markers}
        <LocationModal 
          ref={this.modal}
          country={this.props.mapData["country"]} 
          mapData = {this.props.mapData}
        />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('GOOGLE-API-KEY')
})(MapContainer)