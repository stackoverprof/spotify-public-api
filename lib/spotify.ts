import axios from 'axios';

const Spotify = axios.create();

Spotify.defaults.baseURL = 'https://api.spotify.com/v1';

// Request interceptor for API calls
Spotify.interceptors.request.use(
	async (config) => {
		config.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			...config.headers,
		};
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default Spotify;

