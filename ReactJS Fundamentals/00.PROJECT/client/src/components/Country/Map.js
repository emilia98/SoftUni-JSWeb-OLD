import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.latitude,
        lng: this.props.longitude
      },
      zoom: 6
    }

  }
  /*static defaultProps = {
   
  };*/


 
  render() {
    return (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC_Dc5xas7eqXzcAknWyjx5ASqwz6e1Xiw' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        > 
        </GoogleMapReact>
    );
  }
}
 
export default SimpleMap;