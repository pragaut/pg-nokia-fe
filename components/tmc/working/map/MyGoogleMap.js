// MyGoogleMaps.js
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components'; 
import Marker from './Marker';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {

    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [28.502555, 77.012435],
        zoom: 9,
        address: '',
        draggable: true,
        lat: 28.502555,
        lng: 77.012435
    };

    // componentWillMount() {
    //     //this.setCurrentLocation();
    // }

    componentDidMount() {
        setTimeout(() => {
            this.setCurrentLocation();
        }, 500);
    }

    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: true });
        this._generateAddress();
        setTimeout(() => {
            const { lat, lng, address } = this.state;
            this.props.getSelectedLocation(lat, lng, address);
        }, 500);
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    _onClick = (value) => {
        //console.log("_onClick : ", value);
        this.setState({
            center: [value.lat, value.lng],
            lat: value.lat,
            lng: value.lng
        });
        setTimeout(() => {
            this._generateAddress();
        }, 50);
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this._generateAddress()
        setTimeout(() => {
            const { lat, lng, address } = this.state;
            this.props.getSelectedLocation(lat, lng, address);
        }, 500);
    };

    _generateAddress() {
        const {
            mapApi
        } = this.state;

        const geocoder = new mapApi.Geocoder;

        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            //console.log(results);
            //console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    //if (results[1])
                    //    this.setState({ address: results[1].formatted_address });
                    //else
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
        //console.log("setCurrentLocation");
        setTimeout(() => {
            if (navigator && 'geolocation' in navigator) {
                //console.log("setCurrentLocation if condition");
                navigator.geolocation.getCurrentPosition((position) => {
                    //console.log("Latitude is :", position.coords.latitude);
                    //console.log("Longitude is :", position.coords.longitude);
                    this.setState({
                        center: [position.coords.latitude, position.coords.longitude],
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
            }
        }, 600); 
    }

    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi,
        } = this.state;
        const APIKEY = process.env.GOOGLE_MAP_KEY;

        return (
            <Wrapper>                
                <GoogleMapReact
                    style={{
                        width: "100%",
                        height: "280px",
                        margin: "0px",
                        padding: "0px",
                        position: "relative"
                    }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: APIKEY, //'AIzaSyAM9uE4Sy2nWFfP-Ha6H8ZC6ghAMKJEKps',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >
                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                </GoogleMapReact>

                <div className="info-wrapper">
                    {/* <div style={{ color: "#000" }} className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div> */}
                    {/* <div style={{ color: "#000" }} className="map-details">Zoom: <span>{this.state.zoom}</span></div> */}
                    <div style={{ color: "#000" }} className="map-details">Address: {this.state.address}</div>
                </div>


            </Wrapper >
        );
    }
}

export default MyGoogleMap;