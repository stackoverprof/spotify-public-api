import generateToken from 'lib/generateToken';
import Spotify from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	if (!Array.isArray(req.query.endpoint)) return;

	const endpoint = '/' + req.query.endpoint.join('/');

	const token = await generateToken();

	const result = await Spotify.get(endpoint, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})
		.then((res) => res.data)
		.catch((err) => console.log(err.response.data));

	return res.status(200).json(result);
};

export default handler;
