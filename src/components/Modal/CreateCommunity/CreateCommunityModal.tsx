import {
  Box,Icon,
  Button,
  Divider,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {BsFillPersonFill} from "react-icons/bs";
import { VscEye } from "react-icons/vsc";
import { BiSolidLockAlt } from "react-icons/bi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(200deg)"
        />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500" pb={1}>
                Community names including capitalization cannot be changed
              </Text>
              {/* <Text position="relative" top="28px" color="gray.500" left="10px" width="20px">r/</Text> */}
              <InputGroup size="sm">
                <InputLeftElement>
                  <Text color="gray.500">r/</Text>
                </InputLeftElement>
                <Input value={communityName} onChange={handleChange} />
              </InputGroup>
              <Text
                pl={1}
                fontSize={13}
                color={charRemaining === 0 ? "red" : "gray.500"}
              >
                {charRemaining} Characters remaining
              </Text>
              <Box mt={3} mb={3}>
                <Text fontSize={15} fontWeight={500}>
                  Community Type
                </Text>
                <Stack pl={2} pt={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex flexDirection="row" align="center" justify="center">
                        <Icon as={BsFillPersonFill} color="gray.600" fontSize={12} mr={1}/>
                      <Text fontSize={12} mr={1} >
                        Public
                      </Text>
                      <Text fontSize={10}>
                        (Anyone can view this community)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex flexDirection="row" align="center" justify="center">
                        <Icon as={VscEye} color="gray.600" fontSize={12} mr={1}/>
                      <Text fontSize={12} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={10}>
                        (Anyone can view but ,Only approved users can post in
                        this community)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex flexDirection="row" align="center" justify="center">
                    <Icon as={BiSolidLockAlt} color="gray.600" fontSize={12} mr={1}/>
                      <Text fontSize={12} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={10}>
                        (Only approved users can view and post in this
                        community)
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter>
            <Button  variant="ghost" mr={3} onClick={handleClose}>
              Cancle
            </Button>
            <Button colorScheme="blue">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
