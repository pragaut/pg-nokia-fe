import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTowerActiveDetails } from '../../../../actions/tmc/working.action'
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            MapData : props.MapData ? props.MapData : []
        }
    } 

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.MapData && nextProps.MapData !== null && nextProps.MapData != this.state.MapData) {
            this.setState({ MapData: nextProps.MapData })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };



    render() {
        const {
            MapData
        } = this.state; 
        console.log("GOOGLE_MAP_KEY : ", process.env.GOOGLE_MAP_KEY);
        // let points =  [ 
        //     { lat: 28.5089, lng: 77.5178 , name : 'Faridabad'},
        //     { lat: 28.50681, lng: 77.0044 , name : 'Gurgaon'}, 
        // ]
        let google = {
            google:this.props.google,
            apiKey :this.props.APIKEY
        };

        return (
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 28.4089,
                    lng: 77.3178 
                }}
                zoom={9}
                onClick={this.onMapClicked} 
            >
                {MapData && MapData.length >0 && MapData.map(item => {

                    return <Marker
                        position={{
                            lat : item.latitude,
                            lng : item.longitude
                        }}
                        name={item.towerName +' <br/>'+ item.towerDetails}
                        onClick={this.onMarkerClick}
                        icon = {item.activeStatus =='Red' ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                    />
                })

                }


                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onMapClicked}
                    visible={this.state.showingInfoWindow}>
                    <div style={{color:'#000000', fontSize:'12px'}}>
                        <span dangerouslySetInnerHTML={{__html:this.state.selectedPlace.name}}></span>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAP_KEY
})(MapContainer)