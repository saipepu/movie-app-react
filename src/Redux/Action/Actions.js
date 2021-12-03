import axios from "axios";
import { actionTypes } from "./ActioTypes";

export const fetchAllMovie = (title) => async (dispatch,getState) => {
    let search = 'movie'
    console.log(title)
    if( title !== undefined){
        search = title
    }
    else{
        console.log('yes')
    }
    const response = await axios.get(`https://www.omdbapi.com/?apikey=89e82956&s=${search}`)

    if(response.data.Response !== 'False'){
        dispatch({
            type: actionTypes.ALLMOVIE,
            payload: response.data
        })
    }
    if(getState().movieList.movies.length > 0){
        console.log(getState().movieList.movies[0].Search)
        localStorage.setItem("movieList",JSON.stringify(getState().movieList.movies[0].Search))
    }

}

export const fetchSelectedMovie = (id) => async (dispatch) => {
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=89e82956`)
    dispatch({
        type: actionTypes.SELECTEDMOVIE,
        payload: response.data
    })
}
let id =0;
export const addFav = (movie) => async(dispatch,getState) => {
    console.log(movie)
    dispatch({
        type: actionTypes.ADDFAV,
        payload: movie
    })
    console.log(getState().favMovie.fav)
    localStorage.setItem('favList',JSON.stringify(getState().favMovie.fav))

}
export const removeFromFav = (movie) => async(dispatch,getState) => {
    console.log(movie)
    dispatch({
        type: actionTypes.REMOVEFAV,
        payload: movie
    })
    console.log(getState().favMovie.fav)
    localStorage.setItem('favList',JSON.stringify(getState().favMovie.fav))

}
