import axios from 'axios';

var maps = axios.create({

	baseURL: "https://developers.zomato.com/api/v2.1/search?start=0&count=15&sort=rating&sort=desc&lat=",
	timeout: 1000000

});

export default {
	search: function (url) {
		return maps.get(url);
	}
};