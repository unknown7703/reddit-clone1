import { ChevronDownIcon } from "@chakra-ui/icons";
import {
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
type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
   

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
              <ChevronDownIcon />
            </Flex>
          </Flex>
        ) : (
          <div></div>
        )}
      </MenuButton>
      <MenuList>
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
          onClick={()=>signOut(auth)}
        >
          <Flex mr={2} ml={3}>
            <Icon as={MdOutlineLogin} />
          </Flex>
          <Text>Log Out</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
