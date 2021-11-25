import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux';
import { fetchAllMovie } from '../../Redux/Action/Actions';
import { Flex,Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { Formik,Form,Field } from 'formik';
import { FormControl,FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Link } from '@chakra-ui/layout';
import { useHistory } from 'react-router';

const Header = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  return(
    <>
    <Flex
            bgColor="gray"
            width="100vw"
            top="0"
            position="fixed"
            justifyContent="space-between"
            align="center"
            p="10px 30px"
            zIndex="99"
        >
          <Link href="/" textDecoration="none" >
            <Text fontSize="2em" fontWeight="800" align="center">OMDB</Text>
          </Link>
            <Formik initialValues = {{ name: "name"}}
                    onSubmit={(values,actions) => {
                        setTimeout(() => {
                            console.log(values.name)
                            localStorage.setItem('movieName',JSON.stringify(values.name))
                            dispatch(fetchAllMovie(values.name))
                            actions.setSubmitting(false)
                            history.push("/")
                        },10)
                    }}
            >
                {(props) => (
                    <Form>
                        <Field name="name">
                            {({ field } ) => (
                            <FormControl>
                                <Input {...field} id="name" placeholder="movie"></Input>
                            </FormControl>
                            )}
                        </Field>
                        <Button
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit">
                                Search
                        </Button>
                    </Form>
                )}
            </Formik>
            
        </Flex>
    </>
  )
}
export default Header;