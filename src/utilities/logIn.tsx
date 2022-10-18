interface logInParams {
	email: string;
	password: string;
}

async function logIn (user: logInParams) {
	const apiSettings = {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: user.email,
			password: user.password
		})
	};
	const response = await fetch('http://206.189.91.54/api/v1/auth/sign_in', apiSettings);
	const data = await response.json();

	const apiResponse = {
		access_token: response.headers.get('access-token'),
		client: response.headers.get('client'),
		expiry: response.headers.get('expiry'),
		uid: response.headers.get('uid'),
		success: response.ok,
		data: data.data,
		errors: data.errors ? data.errors[0] : []
	};

	return apiResponse;
}

export default logIn;
