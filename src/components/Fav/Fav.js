import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Flex,Box,Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const Fav = () => {
    const dispatch = useDispatch();

    let favList = []

    useEffect(() => {
        let data = localStorage.getItem('favList')
        data = JSON.parse(data)
        if( data !== '' || data.length!==0){
            favList = data
        }
    },[])
    console.log(favList)

    return(
        <><Flex bgColor="red" zIndex="99" textColor="#fff">
            {favList}
        </Flex>
        </>
    )
}
export default Fav;