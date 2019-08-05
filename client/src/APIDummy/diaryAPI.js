export default async (args, func, time) => {
    let data = await timer(args, func, time);
    return data;
}

function timer(func, args, time) {
    // Check if 'func' was passed
    if(!func) {return new Promise((resolve, reject) => reject('Error: func \'' + func + '\' in apiSim not defined!'));}
    let promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            // Check if 'func' exists
            let dataRetrieved = SubAPI[func] ? SubAPI[func](args): undefined;
            dataRetrieved ? resolve(dataRetrieved) : reject('Error: func \'' + func + '\' in apiSim doesn\'t exist');
        }, time ? time : 3000);
    });
    return  promise;
}

// -------------------- Sub API Content --------------------
let SubAPI = {

        // Get all Entries for a User
        getAllDiaryEntriesByUserId: function(UserId) {
            return [
                { 
                    id: 1,
                    name: 'Diary 1',
                    text: 'Today is a good day for science!',
                    date: new Date(1115),
                    aval: 3,
                },
                { 
                    id: 2,
                    name: 'Diary 2',
                    text: 'Today is a bad day for science!',
                    date: new Date(1212),
                    aval: 8,
                },
                { 
                    id: 3,
                    name: 'Diary 3',
                    text: 'Oh Mãe, aquele moço bateu-me!',
                    date: new Date(2000, 10, 24),
                    aval: 5,
                }
            ];
        },
    
        // Add an Entry for a User
        addDiaryEntryByUserId: function(newEntry) {
            if(newEntry) {
                return {
                    status: 200,
                    newId: 69,
                    description: newEntry
                };
            } else {
                return 'Error: incorrect body'
            }
        }
    
        // Delete an Entry for a User
    
        // Update an Entry for a User

};


