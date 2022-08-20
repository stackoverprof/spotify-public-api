import generateToken from 'lib/generateToken';
import NextCors from 'nextjs-cors';
import Spotify from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	await NextCors(req, res, {
		methods: ['GET'],
		origin: ['https://audiobox.errbint.net', 'https://audiobox.angkasa.one', 'https://dev.audiobox.errbint.net', 'http://localhost:3000'],
		optionsSuccessStatus: 200,
	});

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
