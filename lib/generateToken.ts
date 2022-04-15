import axios from 'axios';

const client_id = process.env.NEXT_PRIVATE_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PRIVATE_SPOTIFY_CLIENT_SECRET;

const generateToken = () =>
	axios
		.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
			headers: {
				Authorization:
					'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
			},
		})
		.then((res) => res.data.access_token)
		.catch((err) => console.log(err.response.data));

export default generateToken;

