import { combineReducers } from "redux";
import { addFav, movieListReducers , selectedMovie} from "./Reducers";

const Reducers = combineReducers({
    movieList: movieListReducers,
    selectedMovie: selectedMovie,
    favMovie: addFav
})
export default Reducers;