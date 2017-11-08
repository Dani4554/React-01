import axios from 'axios';
 


export default {
	search: function () {
		return axios.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDOcZXB-tt-p5rFWYn_uLH9QjG6_OMxvpw&callback=initMap");
	}
};