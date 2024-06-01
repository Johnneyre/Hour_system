import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const fastAxios = axios.create({
	baseURL: process.env.API
});

export default fastAxios;
