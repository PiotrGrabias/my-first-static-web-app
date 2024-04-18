export default {
    async contactCoach(context, payload){
        const newRequest = {
            id: new Date().toISOString(),
            userEmail: payload.email,
            message: payload.message,
        };    
    const response = await fetch(`https://vue-course-44b77-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
        method: 'POST',
        body: JSON.stringify(newRequest),
    });
    if(!response.ok){
        ///
    }
    const responseData = await response.json();
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    context.commit('sendRequest', newRequest)
},  
    async fetchRequests(context){
        const token = context.rootGetters.token;
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-course-44b77-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth` +  token);
        const Data = await response.json();

        if(!response.ok){
            console.log(response.error);
        }
        const requests = [];
        for (const key in Data){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: Data[key].userEmail,
                message: Data[key].message
            };
            requests.push(request);
        }
        context.commit('setRequests', requests);
    }

};