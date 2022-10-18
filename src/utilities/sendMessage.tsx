interface sendMessageParams {
    receiver_id: number
    receiver_class: "User" | "Class"
    body: string
    access_token: string,
    client: string,
    expiry: string,
    uid: string,
}

async function sendMessage (user: sendMessageParams) {
    // HTTP Method: POST
    // URL: {{url}}/api/v1/messages
    // }
    // {
    //     "receiver_id": 1,
    //     "receiver_class": "User", "User" - direct message, "Channel" - message to channel 
    //     "body": "kamusta?"
    // }
    // Headers
    // access-token	    Yes
    // client	        Yes
    // expiry	        Yes
    // uid	            Yes
    const apiSettings: RequestInit = {
        method: "post",
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': user.access_token,
            'expiry':user.expiry,
            'uid':user.uid,
            'client':user.client
        },
        body: JSON.stringify({
            "receiver_id": user.receiver_id,
            "receiver_class": user.receiver_class,
            "body": user.body,
        })
    
    }
    const response = await fetch('http://206.189.91.54/api/v1/messages', apiSettings)
    const data = await response.json()

    const apiResponse = {
        success: response.ok,
        data: data.data,
        errors: data.data | data.errors
    }
    return apiResponse;
}
export default sendMessage;