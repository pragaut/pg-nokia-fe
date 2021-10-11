export const fetchPost = () => async disptach => {

    const api_call = await fetch('https://randomuser.me/api/?results=2');
    const response = await api_call.json();
    const data = response.results;

    disptach({ type: 'FETCH_POSTS', payload: data });
};
