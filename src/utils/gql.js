import fetch from 'node-fetch';

const GQL_ENDPOINT = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'kd1unb4b3q4t58fwlpcbzcbnm76a8fp';

export const sendGQL = async (operationName, hash, variables) => {
	return new Promise((resolve, reject) => {
		const extensions = {
			persistedQuery: {
				version: 1,
				sha256Hash: hash,
			},
		};
		fetch(GQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Client-ID': CLIENT_ID,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				operationName,
				extensions,
				variables,
			}),
		})
			.then((response) => response.json())
			.then((result) => resolve(result))
			.catch((error) => reject(error));
	});
};