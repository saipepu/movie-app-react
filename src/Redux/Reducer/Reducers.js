import { actionTypes } from "../Action/ActioTypes";

const inititalState = {
    movies: []
}
export const movieListReducers = ( state = inititalState , { type, payload} ) => {
    console.log(payload)
    switch(type){
        case actionTypes.ALLMOVIE:
            return{
                ...state,
            movies: [payload],
            }
        default:
            return state;
    }
}
export const selectedMovie = ( state = [], { type, payload} ) => {

    switch(type) {
        case actionTypes.SELECTEDMOVIE:
            return[
                payload,
            ]
        default: 
            return state;
    }
}
const favList = {
    fav: []
}
export const addFav = (state = favList, {type, payload} ) => {
    switch(type) {
        case actionTypes.ADDFAV:{
            console.log(state.fav)
            const movie = payload;
            let existedMovie
            if(state.fav[0] !== null){
                console.log('here')
                existedMovie = state.fav.find((x) => x.imdbID === movie.imdbID)
            }else{
                state.fav[0] = []
            }


            if(existedMovie) {
                console.log('yes')
                console.log(state.fav)
                return{
                    ...state,
                    fav: state.fav.map((x) => x.imdbID === movie.imdbID ? movie: x)
                }
            }else{
                console.log(movie)
                return{
                    ...state,
                    fav: [...state.fav,movie]
                }
            }
        }
        case actionTypes.REMOVEFAV:{
            console.log(payload)
            const list = state.fav.filter(el => el.imdbID !== payload.imdbID )
            console.log(list)
            return(
                {
                    fav: list
                }
            )
        }
        default:
            return state;
    }
}