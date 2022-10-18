interface listOfUsersParams {
	access_token: string;
	client: string;
	expiry: string;
	uid: string;
}

async function listOfAllUsers (user: listOfUsersParams) {
	// HTTP Method: Get
	// URL: {{url}}/api/v1/users
	// access-token	Yes
	// client	Yes
	// expiry	Yes
	// uid	Yes
	const apiSettings: RequestInit = {
		method: 'get',
		headers: {
			'access-token': user.access_token,
			expiry: user.expiry,
			uid: user.uid,
			client: user.client
		}
	};
	// console.log('getting data...')
	const response = await fetch('http://206.189.91.54/api/v1/users', apiSettings);
	const data = await response.json();

	const apiResponse = {
		success: response.ok,
		data: data.data,
		errors: data.data | data.errors
	};

	return apiResponse;
}

export default listOfAllUsers;
