import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'; 
import { addFav, removeFromFav } from '../../Redux/Action/Actions';
import { Flex,Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Divider } from '@chakra-ui/layout';

const MovieLists = () => {
    let movieList = useSelector((state) => state.movieList.movies)
    const dispatch = useDispatch();
    const history = useHistory();

    movieList = localStorage.getItem('movieList')
    movieList = JSON.parse(movieList)
    console.log(movieList)
    if( movieList === null){
        movieList = []
    }

    const [ favList, setFavList] = useState([])
    const handleClick = (id) => {
        dispatch(addFav(id))
        console.log(id)
        let data = localStorage.getItem('favList')
        data = JSON.parse(data)
        if( data !== '' ){
            console.log(data)
            setFavList(data)
            console.log(favList)
            console.log('hi')
        }
    }
    useEffect(() => {
        let data = localStorage.getItem('favList')
        console.log(data)
        data = JSON.parse(data)

        if( data !== null){

            console.log(data)
            data.map(data => {
                dispatch(addFav(data))
            })
            setFavList(data)
            console.log('hi')
        }else{
            data = []
        }
    },[])


    console.log(favList)

    const removeFav = (id) => {
        dispatch(removeFromFav(id))
        console.log(id)
        let data = localStorage.getItem('favList')
        data = JSON.parse(data)
        if( data !== '' || data.length!==0){
            console.log(data)
            setFavList(data)
            console.log(favList)
            console.log('hi')
        }
    }

    return(
       <>
       <Text fontSize="2em" fontWeight="700" textColor="#fff">Movies</Text>
        {movieList === '' || movieList === undefined ? <h1>Loading</h1> :
                    <Flex overflowX="auto"
                            w="100vw"
                            h="700px"
                            align="center"
                            pl="50px"
                    >
                    {movieList.map((data,index) => {
                        return (
                            <Box direction="column" key={index}>
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
        }
        <Divider />
        <Box textColor="#fff">
        <Text fontSize="2em" fontWeight="700" textColor="#fff">Favourites</Text>

        

        <Flex overflowX="auto"
                            w="100vw"
                            h="700px"
                            align="center"
                            pl="50px"
                    >
        {
        favList.map((data,index) => {
            if( data !== null){
                return <Box direction="column" key={index}>
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
                <Box direction="row" width="100%" justifyContent="space-between">
                <Button
                                w="20%"
                                h="30%"
                                minH="50px"
                                m="20px"
                                fontSize="0.5em"
                                onClick={() => handleClick(data)}
                                textColor="#000"
                    >Add Fav</Button>
                    <Button
                                w="20%"
                                h="30%"
                                minH="50px"
                                m="20px"
                                fontSize="0.5em"
                                onClick={() => removeFav(data)}
                                textColor="#000"
                    >Remove</Button>
                </Box>
                
            </Box>
            }
        })
        }
        </Flex>
        </Box>

       </>
    )
}
export default MovieLists;