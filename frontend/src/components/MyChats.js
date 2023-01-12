import React ,{useState,useEffect} from 'react';
import { useToast } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider'
import axios from 'axios';
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import {Box, Text, Stack } from '@chakra-ui/layout';
import { getSender } from '../config/ChatLogics';
import GroupChatModel from './miscellaneous/GroupChatModel';


const MyChats = ({fetchAgain}) => { 
    const [loggedUser,setLoggedUser]=useState();
    const {user,selectedChat, setSelectedChat,chats,setChats}=ChatState();

    const toast=useToast();

 const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      // flexDirection="column"
      flexDir="column"
      alignItems="center"
      padding={3}    
      background="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"  
      
      marginTop={3}
      paddingBottom={300}
      marginLeft={1}
    >

    <Box
        paddingBottom={3}
        paddingX={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModel>
        <Button
        display="flex"
        fontSize={{base:"17px",md:"10px",lg:"17px"}}
        rightIcon={<AddIcon/>}
        
        >
            New Group Chat
        </Button>
        </GroupChatModel>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        padding={3}
        bg="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ?(
            <Stack overflowY='scroll'>
                {chats.map((chat)=>(
                    <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#e25e66" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                paddingX={3}
                paddingY={2}
                borderRadius="lg"
                key={chat._id}
                    >
                        <Text>
                            {!chat.isGroupChat
                            ?
                             getSender(loggedUser,chat.users)
                            :chat.chatName}
                        </Text>

                    </Box>
                ))}

            </Stack>

        ):(
            <ChatLoading/>
        )}

      </Box>
    </Box>
    
  );
};

export default MyChats;