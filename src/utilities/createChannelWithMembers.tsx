interface createChannelWithMembersParams {
	access_token: string,
    client: string,
    expiry: string,
    uid: string,
    name: string,
    user_ids: any[]
}


async function createChannelWithMembers (user: createChannelWithMembersParams) {
    // HTTP Method: POST
    // URL: {{url}}/api/v1/channels
    // {
    //     "name": "channel1",
    //     "user_ids": [2]
    // }
    // name	Channel Name	
    // user_ids	List of user ids to be included on the channel. Array	
    // access-token	
    // client	
    // expiry	
    // uid	

    const apiSettings: RequestInit  = {
        method: "post",
        headers: {
            'access-token': user.access_token,
            'expiry': user.expiry,
            'uid': user.uid,
            'client': user.client
        },
		body: JSON.stringify({
			name: user.name,
			user_ids: user.user_ids
		})
    };
    const response = await fetch('http://206.189.91.54/api/v1/channels', apiSettings);
	const data = await response.json();

    console.log(response)
    console.log(data)

    const apiResponse = {
        success: response.ok,
        data: data.data,
        errors: data.data | data.errors
    }

	return apiResponse;
}

export default createChannelWithMembers;