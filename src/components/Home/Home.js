import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovie } from '../../Redux/Action/Actions';
import MovieLists from './fetchMovieLists';
import { Box } from '@chakra-ui/layout';
import Header from './Header';
import { useHistory } from 'react-router';

const Home = () => {
    const [ searchTitle, setSearchTitle ] = useState('')
    let movieList = useSelector((state) => state.movieList.movies)
    if( movieList === null){
        movieList = []
    }

    const dispatch = useDispatch()
    const history = useHistory()
    console.log(movieList)
    let movieName = 'name'

    useEffect(() => {
        let movieList1 = localStorage.getItem('movieList')
        movieList1 = JSON.parse(movieList1)
        movieName = localStorage.getItem('movieName')
        movieName = JSON.parse(movieName)
        if( movieList.length !== 0){
            history.go(0)
            if( movieList[0].Search[0].Title !== movieList1[0].Title){
                dispatch(fetchAllMovie(movieName))
            }
        }
    },[movieList])

    //INPUT
    const handleOnChange = (e) => {
        setSearchTitle(e.target.value)
    }

    //SEARCH
    const handleSubmit = (e) => {
        e.preventDefault();
        if( searchTitle !== ''){
            dispatch(fetchAllMovie(searchTitle))
        }
        setSearchTitle('')
    }

    return(
        <Box bgColor='#141414'>
        <Header />
        <Box paddingTop={["100px","100px","100px","120px"]}>
            <MovieLists ></MovieLists>
        </Box>
        </Box>
    )
}

export default Home;

{/* <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleOnChange} value={searchTitle} ></input>
                <button type='submit'>Search</button>
        </form> */}