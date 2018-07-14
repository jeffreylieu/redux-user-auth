import types from './types';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';


export function createAccount(userInfo){
    return async(dispatch) => {
        try{
            const resp = await axios.post(`${BASE_URL}/signUp`, userInfo);

            localStorage.setItem('token', resp.data.token);

            dispatch({type: types.SIGN_UP});

        }catch(err){
            console.log('Signup error:', err.message);
        }


    }
}



export function accountSignIn(userInfo){
    return async dispatch =>{
        try{
            const resp = await axios.post(`${BASE_URL}/signIn`, userInfo);


            localStorage.setItem('token', resp.data.token);

            dispatch({type: types.SIGN_IN});

        }catch(err){
            console.log('Error signing in:', err.message);
        }
    }
}

export function signOut(){

    localStorage.removeItem('token');

    return{type:types.SIGN_OUT};
}


export function getMovieQuote(){
    return async dispatch => {
        try{
            const axiosConfig ={
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }

            const resp = await axios.get(BASE_URL, axiosConfig);

            dispatch({
                type: types.GET_MOVIE_QUOTE,
                quote: resp.data.message
            });

        }catch(err){
            console.log('Get Quote Error:', err.message);
        }
    }
}