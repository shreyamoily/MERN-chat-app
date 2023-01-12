import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";


const ChatPage = () => {
    const {user}=ChatState();
    const [fetchAgain, setfetchAgain] = useState(false);
    
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {user && (<MyChats fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
        )}
        {user && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>}
      </Box>
         </div>
  );
}

export default ChatPage;