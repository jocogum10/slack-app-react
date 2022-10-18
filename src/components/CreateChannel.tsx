

function CreateChannel () {

    function handleCreateChannel () {
        console.log('prompt the modal when click to create the channel')
        
        

    }

    return (
        <div>
            <div className='rounded-full bg-purple-900 w-full p-2'>
                Create Channel
                <button className='rounded-full p-1 m-1 ring-2 ring-purple-100 hover:ring-1 hover:bg-purple-100' onClick={handleCreateChannel}>+</button>
            </div>

            <div id="popup-modal" className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative w-full h-full max-w-md p-4 md:h-auto">
                    <div className="relative bg-purple-700 rounded-lg ring-2 ring-purple-900">

                        <div className="p-6 text-center">
                            <div>
                                <p className="text-lg font-normal">Channel Name</p>
                                <input className="font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2"></input>
                            </div>
                            <div>
                                <p className="text-lg font-normal">Channel Members</p>
                                <input className="font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2"></input>
                            </div>
                            
                            <div>
                                <button className="bg-purple-100 rounded-full p-2 m-2">
                                    Create Channel
                                </button>
                                <button className="bg-purple-100 rounded-full p-2 m-2">No, cancel</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default CreateChannel;