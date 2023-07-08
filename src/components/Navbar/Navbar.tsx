import { Flex,Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from "./Searchinput";
import RightContent from "./RightContent/RightContent"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';

const Navbar:React.FC = () => {
    const[user,loading,error]=useAuthState(auth);
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                  <Image src="/images/redditface.svg" height="30px"/>
                  <Image src="/images/reddittext.svg" height="46px" display={{base:"none" ,md:"unset"}}/>
            </Flex>
            <SearchInput/>
            <RightContent user={user}/>
        </Flex>
    );
       
    
};
export default Navbar;  