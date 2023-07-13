import { Flex, Icon, Menu, MenuButton, MenuList,Text } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GoHome } from "react-icons/go";
import Communities from "./Communities"
const Directory: React.FC = () => {
  return (
    <Menu >
      <MenuButton
        cursor="pointer"
        borderRadius={2}
        padding="0px 6px"
        mr={1.5}
        ml={{base:0,md:1  }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            <Icon as={GoHome} fontSize={20} mr={{base:1,md:2}}/>
            <Flex display={{base:"none",lg:"flex"}}>
            <Text>Home</Text>
            </Flex>
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities/>
      </MenuList>
    </Menu>
  );
};
export default Directory;
