import axios from 'axios';

const fastAxios = axios.create({
	baseURL: process.env.API,
	headers: {
		'Content-Type': 'application/json'
	}
});

export default fastAxios;
