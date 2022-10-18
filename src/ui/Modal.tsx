import createChannelWithMembers from '../utilities/createChannelWithMembers';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';

function Modal (props: any) {
	const { usersListOfUID } = props

	const [ channelData, setChannelData ] = useState({
		name: '',
		user_ids: ''
	});

	useEffect( () => {
		console.log(channelData)
	}, [channelData])

	function closeHandler () {
		props.onCancel();
	}

	const userOptions = usersListOfUID.map( (user: {uid:string, id:number}, index: number) => {
		return <option value={user.id} key={user.id} >{user.uid}</option>
	})

	async function handleCreateChannel (e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log('channelData.name', channelData.name)
		const userData = JSON.parse(localStorage.getItem('userLogIn')  || '{}')
		const userID = userData.data.id
		const params = {
			access_token: userData.access_token,
			client: userData.client,
			expiry: userData.expiry,
			uid: userData.uid,
			name: channelData.name,
			user_ids: [channelData.user_ids, userID]
		}
		const res = await createChannelWithMembers(params)
		console.log(res)
		props.onCancel();
	}

	function handleOnChangeChannelName (e: ChangeEvent<HTMLInputElement>) {
		setChannelData((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value
			};
		});
	}
	
	function handleOnChangeSelect (e: ChangeEvent<HTMLSelectElement>) {
		setChannelData((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value
			};
		});
		console.log(e.target.value)
	}

	return (
		<form onSubmit={handleCreateChannel} className="flex flex-col items-center justify-center w-maximum z-10 text-black rounded-sm shadow-xl bg-fuchsia-100 p-4 absolute top-1/3 left-1/3">
			<div className="mb-4">
				<h1 className="flex items-center justify-center mb-6 mt-6 text-lg font-semibold">Create a New Channel</h1>
				{/* <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="channelName">
					Channel Name
				</label> */}
				<input
					className="shadow appearance-none text-base border rounded w-96 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Channel name"
					name="name"
					value={channelData.name}
					onChange={handleOnChangeChannelName}
				/>
			</div>
			<div className="mb-4">
				{/* <label className="block mt-4 text-gray-700 text-lg font-bold mb-2" htmlFor="channelName">
					Users
				</label> */}
				<select
					className="shadow appearance-none text-base w-96 border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="user_ids"
					id="user_ids"
					value={channelData.user_ids}
					// onSelect={handleOnChangeSelect}
					onChange={handleOnChangeSelect}
					// multiple
					
				>
					<option defaultChecked>Add users to the channel</option>
					{userOptions}
				</select>
			</div>
			<div className="mb-6 flex justify-center text-base">
				<button
					className="bg-white border-2 border-fuchsia-300 text-black w-48 mt-5 transition-all hover:bg-gray-100 font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline"
					// type="submit"
					onClick={closeHandler}
				>
					Cancel
				</button>
				<button
					className="bg-fuchsia-700 ml-3 w-48 mt-5 transition-all hover:bg-fuchsia-900 text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Create Channel
				</button>
			</div>
		</form>
	);
}

export default Modal;
