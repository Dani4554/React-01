import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withGoogleMap((props) =>{
	
	return(
	<div>
	<GoogleMap
		defaultZoom={8}
				defaultCenter={{ lat: 40.5349073, lng: -74.5215711 }}
	>
		{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
	</GoogleMap>
	</div>
)
})

export default MyMapComponent;


