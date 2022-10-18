import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import appScreenshot from '../assets/app.png';

function DefaultPage () {
	return (
		<div className="h-screen w-screen bg-white">
			{/* flex items-center justify-center overflow-hidden */}
			<div className="grid grid-cols-2 w-full mt-20">
				<div className="ml-40">
					<img src={logo} className="w-48" />
				</div>
				<div className="flex flex-row-reverse items-center mr-40">
					<Link to="/registration">
						<div className="ml-8">
							<button className="text-white bg-gradient-to-r from-fuchsia-700 via-fuchsia-800 to-fuchsia-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg px-6 py-3 text-center transition-all">
								Register
							</button>
						</div>
					</Link>
					<Link to="/log-in">
						<div>
							<button className="text-fuchsia-900 font-semibold hover:bg-fuchsia-200 px-6 py-3 rounded-lg transition-all">
								Login
							</button>
						</div>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-2 w-full mt-40 place-items-center">
				<div className="ml-40 pr-10">
					<h1 className="mb-8 text-5xl font-extrabold">Where the Future Works</h1>
					<p className="mb-8">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad quasi, odit alias deserunt adipisci aliquam a
						inventore explicabo officia provident obcaecati eaque.
					</p>
					<Link to="/registration">
						<div>
							<button className="text-white bg-gradient-to-r from-fuchsia-700 via-fuchsia-800 to-fuchsia-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-extrabold text-2xl rounded-lg px-8 py-4 text-center transition-all">
								Register
							</button>
						</div>
					</Link>
				</div>
				<div className="relative w-full max-w-lg">
					<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
					<div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
					<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
					<div className="m-8 relative space-y-4">
						<div className="flex items-center justify-center">
							<img className="rounded-lg w-maximum" src={appScreenshot} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DefaultPage;
