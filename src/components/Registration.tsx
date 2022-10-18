import React, { FormEvent, ChangeEvent, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import userRegistration from '../utilities/userRegistration';

// ------API type
interface apiResponseTypes {
	success?: boolean;
	data?: any;
	errors?: any;
}
// ------API type

function Registration () {
	const [ formData, setFormData ] = React.useState({
		email: '',
		password: '',
		password_confirmation: ''
	});

	// ------API register user
	const [ registerUserData, setRegisterInUserData ] = React.useState<apiResponseTypes>({
		success: false,
		data: null,
		errors: null
	});
	console.log('registerUserData', registerUserData);
	// ------API register user

	let history = useHistory();

	useEffect(
		() => {
			if (registerUserData.success) {
				history.push('/log-in');
			}
		},
		[ registerUserData ]
	);

	const [ alertIncomepleteInput, setalertIncomepleteInput ] = React.useState(false);
	const [ alertPasswordMatch, setalertPasswordMatch ] = React.useState(false);
	// const [ loginPage, setLoginPage ] = React.useState(false);

	function handleChange (e: ChangeEvent<HTMLInputElement>) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value
			};
		});
	}

	async function handleRegister (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('registering user');

		if (!formData.email || !formData.password || !formData.password_confirmation) {
			setalertIncomepleteInput(true);
			if (alertPasswordMatch) {
				setalertPasswordMatch(false);
			}
		} else if (formData.password !== formData.password_confirmation) {
			setalertPasswordMatch(true);
			if (alertIncomepleteInput) {
				setalertIncomepleteInput(false);
			}
		} else {
			setalertIncomepleteInput(false);
			setalertPasswordMatch(false);
			console.log('logged in');

			// ------API fetch
			console.log('logging in...');
			const response = await userRegistration({
				email: formData.email,
				password: formData.password,
				password_confirmation: formData.password_confirmation
			});
			setRegisterInUserData(response);

			// ------API fetch
		}
	}

	const renderRegistrationForm = (
		<div className="flex items-center justify-center h-screen">
			<div>
				<div className="flex justify-center w-72 m-auto">
					<img src={logo} className="object-cover" alt="Slack Logo" />
				</div>
				<div>
					<h2 className="flex justify-center text-3xl font-bold pb-3">Create a New Account</h2>
					<p className="flex justify-center text-lg">Register to start collaborating with your team!</p>
				</div>
				<div className="w-96 m-auto mt-7">
					<form onSubmit={handleRegister} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label className="block mt-3 text-gray-700 text-xl font-bold mb-4" htmlFor="email">
								Email
							</label>
							<input
								className="shadow appearance-none text-lg border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="text"
								name="email"
								placeholder="Enter your email"
								onChange={handleChange}
								value={formData.email}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-xl font-bold mb-4" htmlFor="password">
								Password
							</label>
							<input
								className="shadow appearance-none text-lg border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								name="password"
								placeholder="Create a password"
								onChange={handleChange}
								value={formData.password}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-xl font-bold mb-4" htmlFor="confirmPassword">
								Confirm your password
							</label>
							<input
								className="shadow appearance-none text-lg border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="confirmPassword"
								type="password"
								name="password_confirmation"
								placeholder="Retype your password"
								onChange={handleChange}
								value={formData.password_confirmation}
							/>
						</div>
						<div className="mb-6 flex justify-center text-base">
							<button
								className="bg-fuchsia-700 w-full mt-5 transition-all hover:bg-fuchsia-900 text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Create Account
							</button>
						</div>
						<div className="flex justify-center text-base font-medium">
							<p>
								Already have an account?{' '}
								<span className="text-fuchsia-700 font-bold transition-all hover:text-fuchsia-800">
									<Link to="/log-in">Login here.</Link>
								</span>
							</p>
						</div>

						{alertIncomepleteInput && (
							<div
								className="bg-red-100 border text-base mt-5 border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<strong className="font-bold">Error! </strong>
								<span className="block sm:inline"> Please accomplish all fields</span>
								<span className="absolute top-0 bottom-0 right-0 px-4 py-3">
									<svg
										className="fill-current h-6 w-6 text-red-500"
										role="button"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<title>Close</title>
										<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
									</svg>
								</span>
							</div>
						)}

						{alertPasswordMatch && (
							<div
								className="bg-red-100 border text-base mt-5 border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<strong className="font-bold">Error! </strong>
								<span className="block sm:inline"> Passwords do not match</span>
								<span className="absolute top-0 bottom-0 right-0 px-4 py-3">
									<svg
										className="fill-current h-6 w-6 text-red-500"
										role="button"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<title>Close</title>
										<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
									</svg>
								</span>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);

	// return <div>{loginPage ? <Login /> : renderRegistrationForm}</div>;
	return <div>{renderRegistrationForm}</div>;
}

export default Registration;
