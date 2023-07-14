import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./Searchinput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import Directory from "./Directory/Directory"

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="47px" padding="6px 12px" justifyContent={{md:"space-between"}}>
      <Flex align="center" width={{base:"40px" ,md:"auto"}} mr={{base:0,md:2}}>
        <Image src="/images/redditface.svg" height="25px" ml={{base:0,md:2}} mr={{base:1.5,md:1}}/>
        <Image
          src="/images/reddittext.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
     {user && <Directory/>}
      
    
      <SearchInput user={user}/>
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
