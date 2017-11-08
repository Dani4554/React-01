import axios from 'axios';

const BaseUrl = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";

var instance = axios.create({

	baseURL: BaseUrl,
	timeout: 1000000,
	headers: {
		'Content-Type':'application/octet-stream',
		'Ocp-Apim-Subscription-Key': '6b36e80dd6c6414a8a8df1c803511a13'
	},
	processData: false

});

export default {
	search: function(data){
		return instance.post('',data);
	}
};