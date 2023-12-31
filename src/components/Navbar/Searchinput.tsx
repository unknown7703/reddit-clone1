import { CheckIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";


type SearchinputProps = {
  user?: User |null
};

const Searchinput: React.FC<SearchinputProps> = ({user}) => {
  return (
    <Flex flexGrow={1} maxWidth={user?'auto': "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" mb={1}>
          <SearchIcon color="gray.400"  />
        </InputLeftElement>
        <Input 
          placeholder="Search reddit"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
            borderRadius:"30px",
          }}
          _focus={{
            outline:"none",
            border:"1px solid",
            borderColor:"blue.500",
            borderRadius:"30px",
          }}
          height="34px"
          bg="gray.50"
          borderRadius={30}
        />
      </InputGroup>
    </Flex>
  );
};
export default Searchinput;
