const GQL_ENDPOINT = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'kd1unb4b3q4t58fwlpcbzcbnm76a8fp';

const sendGQL = async (operationName, variables) => {
	return new Promise((resolve, reject) => {
		const extensions = {
			persistedQuery: {
				version: 1,
				sha256Hash: '2dbf505ee929438369e68e72319d1106bb3c142e295332fac157c90638968586',
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

sendGQL('NielsenContentMetadata', {collectionID: "", isCollectionContent: false, isLiveContent: false, isVODContent: true, login: "", vodID: "1882183351" })
    .then(response => console.log(response));