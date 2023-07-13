import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import {IoIosLogIn} from "react-icons/io"
type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState= useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        borderRadius={2}
        padding="0px 6px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        {user ? (
          <Flex align="center">
            <Flex align="center">
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  color="gray.300"
                  mr={1}
                />
              </>
              
              <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
                <ChevronDownIcon />
            </Flex>
          </Flex>
        ) : (
          <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
        )}
      </MenuButton>
      <MenuList>
        {user ? (     <>
        <MenuItem
          fontSize="13px"
          fontWeight={600}
          _hover={{ bg: "blue.500", color: "white" }}
        >
          <Flex mr={2} ml={3}>
            <Icon as={CgProfile} />
          </Flex>
          <Text>Profile</Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          fontSize="13px"
          fontWeight={600}
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={() => signOut(auth)}
        >
          <Flex mr={2} ml={3}>
            <Icon as={MdOutlineLogin} />
          </Flex>
          <Text>Log Out</Text>
        </MenuItem>
        </>) :(
          <>
          <MenuItem >
          <Flex justify="center" >
          <Icon as={IoIosLogIn} mr={2} mt={1.5}/>
            <Text ml={1} onClick={()=>{setAuthModalState({open:true,view:'login'})}}> Login / </Text>
            <Text onClick={()=>{setAuthModalState({open:true,view:'signup'})}} >Signup</Text>
          
          </Flex>
          </MenuItem>
          </>
        )}
   
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
