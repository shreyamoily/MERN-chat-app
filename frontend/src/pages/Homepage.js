import React from 'react';
import {useEffect} from 'react';
import {Container,Box,Text} from '@chakra-ui/layout';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Aunthentication/Login';
import Signup from '../components/Aunthentication/Signup';
import { useHistory } from 'react-router-dom';

const Homepage = () => {
    const history=useHistory();

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    
    if (user) history.push("/chats"); 
  }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
      display="flex"
      justifyContent="center"
      p={3}
      bg={'white'}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize='4xl' fontFamily="Work sans" >Maven</Text>
      </Box>
      <Box p={4} bg={'white'}w="100%" borderRadius="lg"  color='black' borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme="purple">
        <TabList mb='1em'>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Signup/>
          </TabPanel>
        </TabPanels>
        </Tabs>
      </Box>

    </Container>
  )
};

export default Homepage;