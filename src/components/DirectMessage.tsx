import { MouseEventHandler, useEffect, useState } from 'react';
import listOfAllUsers from '../utilities/listOfAllUsers';

// ------API type
interface apiResponseTypes {
	success?: boolean;
	data: [];
	errors?: any;
}

interface listOfUsersParams {
	access_token: string;
	client: string;
	data?: {};
	errors?: [];
	expiry: string;
	success?: boolean;
	uid: string;
}

interface directMessageProps {
	setWhoToChat: React.Dispatch<React.SetStateAction<{ uid: string; id: number }>>;
	setUsersListOfUID: React.Dispatch<React.SetStateAction<[]>>;
	setChat: React.Dispatch<React.SetStateAction<{ body: string; created_at: string; id: number; receiver: { uid: string; }; sender: { uid: string; }; }[]>>
}
// ------API type

function DirectMessage (props: directMessageProps) {
	const { setWhoToChat, setUsersListOfUID, setChat } = props;

	// ------API register user
	const [ userData, setUserData ] = useState<apiResponseTypes>({
		data: []
	});
	const [ listRange, setListRange ] = useState([ 0, 5 ]);

	useEffect(() => {
		// console.log('fetching')
		const userData = JSON.parse(localStorage.getItem('userLogIn') || '{}');
		// console.log(userData)

		const getUsers = async (userData: listOfUsersParams) => {
			const response = await listOfAllUsers(userData);
			setUserData(response);
			setUsersListOfUID(response.data)
		};
		getUsers(userData);
	}, []);

	function handleChat (e: any) {
		setChat([{
			body: "",
			created_at: "",
			id: 0,
			receiver: { uid: ""},
			sender: { uid: "" }
		}])
		setWhoToChat({ uid: e.target.name, id: e.target.id });
	}

	function handleUp () {
		setListRange((prevData) => {
			if (prevData[0] === 0) {
				return prevData;
			}
			return [ prevData[0] - 1, prevData[1] - 1 ];
		});
	}

	function handleDown () {
		setListRange((prevData) => {
			if (prevData[1] === prevData.length - 1) {
				return prevData;
			}
			return [ prevData[0] + 1, prevData[1] + 1 ];
		});
	}

	const slicedData = userData.data.slice(listRange[0], listRange[1]);
	const listOfUsers = slicedData.map((user: any, index: number) => {
		return (
			<button
				className="rounded-full bg-purple-300 hover:ring-1 m-1 p-1 hover:ring-purple-600 truncate text-xs"
				key={user.id}
				onClick={handleChat}
				name={user.uid}
				id={user.id}
			>
				{user.uid}
			</button>
		);
	});

	return (
		<div className="flex flex-col justify-between">
			<button className="rounded-full bg-purple-300" onClick={handleUp}>
				⮙
			</button>
			{listOfUsers.length === 0 ? <div>Loading...</div> : listOfUsers}
			<button className="rounded-full bg-purple-300" onClick={handleDown}>
				⮛
			</button>
		</div>
	);
}

export default DirectMessage;
