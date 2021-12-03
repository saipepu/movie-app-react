import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchSelectedMovie } from '../../Redux/Action/Actions';
import { Flex,Box,Text } from '@chakra-ui/layout';
import { Divider, Image } from '@chakra-ui/react';
import Header from '../Home/Header';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { addFav } from '../../Redux/Action/Actions';
import { useHistory } from 'react-router';

const MovieDetail = () => {
    const [ favList, setFavList] = useState([])
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    let selectedMovie = useSelector((state) => state.selectedMovie)

    let allMovieList = localStorage.getItem('movieList')
    allMovieList= JSON.parse(allMovieList)
    let len = allMovieList.length / 2;
    let relatedMovies = []
    for(let i=0; i<len; i++){
        if( allMovieList[i].imdbID !== params.id)
        relatedMovies[i] = allMovieList[i]
    }


    const fetchData = async(id) => {
        console.log(id)
        dispatch(fetchSelectedMovie(id))
    }
    useEffect(() => {
        fetchData(params.id)

    },[params.id])
    useEffect(() => {

        let data = localStorage.getItem('favList')
        console.log(data)
        data = JSON.parse(data)
        if( data){
            data.map(data => {
                dispatch(addFav(data))
            })
            setFavList(data)
            console.log('hi')
        }else{
            data = []
        }
    },[])
    const handleClick = (data) => {
        dispatch(addFav(data))
        console.log(data.imdbID)
        
    }
    
    return(
        <Box bgColor='#141414'>
        <Header />
        {selectedMovie === '' || selectedMovie === undefined ? <h1>Loading</h1> : 
           selectedMovie.map((movie,i) => {
               return(
                   <Flex 
                        position="relative" 
                        paddingTop={["100px","100px","100px","120px"]} key={i}
                        w="100vw"
                        display="flex"
                        justifyContent="space-between"
                        paddingX="50px"
                    >
                        <Box
                            maxW="50vw"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-around"
                            textColor="#fff"
                            paddingRight="30px">
                                <Box>
                                    <Text fontSize="2.8em" fontWeight="800">{movie.Title}<Text as="span" fontSize="18px" fontWeight="300" ml="20px">(Rating -{movie.Rated})</Text></Text>
                                    <Text fontSize="1.5em" fontWeight="400">{movie.Genre}</Text>
                                    <Text fontSize="1.5em" fontWeight="400">{movie.Runtime}</Text>

                                </Box>
                                <Box>
                                    <Text fontSize="2em" fontWeight="700">Plot<Text fontSize="0.6em" fontWeight="400">{movie.Plot}</Text></Text>
                                    <Text fontSize="2em" fontWeight="700">Writer<Text fontSize="0.6em" fontWeight="300">{movie.Writer}</Text></Text>
                                    <Text fontSize="2em" fontWeight="700">Awards<Text fontSize="0.6em" fontWeight="300">{movie.Awards}</Text></Text>
                                </Box>
                        </Box>
                        
                       <Box
                            w="50vw"
                            h="85vh"
                            maxW="50vw"
                            maxH="90vh"
                            position="relative"
                            padding="50px"
                       >
                            <Image src={movie.Poster}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            ></Image>
                       </Box>
                   </Flex>
               )
           })
        }
        <Divider marginY="20px" w="80vw" margin="auto"/>
        <Flex overflowX="auto"
                            w="100vw"
                            h="700px"
                            align="center"
                            pl="50px"
                    >
        {relatedMovies.map((data,index) => {
            return (
                <Box direction="column">
                <Link to={`/movieDetail/${data.imdbID}`} key={index} >
                    <Flex   display="flex"
                            direction="column"
                            w={["200px","200px","400px","400px"]}
                            h={["300px","300px","500px","500px"]}
                            minH="fit-content"
                            marginRight="60px"
                            borderRadius="10px"
                            border="1px solid gray"
                            overflow="hidden"
                            bgColor="#202020"
                    >
                        <Image src={data.Poster}
                                objectFit="cover"
                                minH={["250px","250px","400px","400px"]}
                                maxH={["250px","250px","400px","400px"]}
                        ></Image>
                        <Text fontSize={["2em","2em","2.5em","2.5em"]}
                            textColor="#ffffff"
                        >{data.Title}</Text>
                    </Flex>
                </Link>
                <Button
                            w="20%"
                            h="30%"
                            minH="50px"
                            m="20px"
                            fontSize="0.5em"
                            onClick={() => handleClick(data)}
                        >Watch Later</Button>
                </Box>
            )
        })}
        </Flex>

        </Box>
    )
}
export default MovieDetail;