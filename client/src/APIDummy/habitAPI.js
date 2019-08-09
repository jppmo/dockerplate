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
            dataRetrieved 
                ? ( dataRetrieved.status >= 400 
                        ? reject(`Error: Received ${dataRetrieved.status} !`) 
                        : resolve(dataRetrieved) 
                    )
                : reject(`Error: func '${func}' in apiSim doesn't exist`);
        }, time ? time : 3000);
    });
    return  promise;
}

// -------------------- Sub API Content --------------------
let SubAPI = {

        // Get all Entries for a User
        getAllHabitsByUserId: function(UserId) {
            return [
                {
                    id: 'habit-1',
                    name: 'Use stairs',
                    description: 'Use the stairs instead of the elevator in any 5th floor building',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 'always', // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 100, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
                {
                    id: 'habit-2',
                    name: 'Do exercise',
                    description: 'Minimum 30 minutes workout',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 3, // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 55, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
                {
                    id: 'habit-3',
                    name: 'Use stairs 3',
                    description: 'Use the stairs instead of the elevator in any 5th floor building',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 'always', // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 0, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
                {
                    id: 'habit-4',
                    name: 'Use stairs 4',
                    description: 'Use the stairs instead of the elevator in any 5th floor building',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 'always', // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 0, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
                {
                    id: 'habit-5',
                    name: 'Use stairs 5',
                    description: 'Use the stairs instead of the elevator in any 5th floor building',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 'always', // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 0, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
                {
                    id: 'habit-6',
                    name: 'Use stairs 6',
                    description: 'Use the stairs instead of the elevator in any 5th floor building',
                    status: 'stack', // Enum: 'stack', 'tracking', 'active - bronze,' 'active - silver', 'active - gold', 'conquered'
                    repetition: 'always', // Enum: 'always', number
                    period: {   // Period for repetitions AND for evaluation, Enum: object, null
                        size: 'week', // Enum: 'week', 'month'
                        qty: '1', // Enum: 'all', 
                    },
                    column: 'stack', // Enum: 'stack', 'tracking', 'active'
                    progress: 0, // by default progress should be 0 when not in 'tracking'
                    doneRep: 0, // by default doneRep should be 0 when not in 'tracking'
                },
            ];
        },

    // Put Habit
    updateHabit: function(newHabit) {
        if(newHabit && newHabit.id != null) {
            return {
                status: 200,
                newId: 69,
                description: newHabit
            };
        } else {
            return {
                status: 404,
            };
        }
    }

}