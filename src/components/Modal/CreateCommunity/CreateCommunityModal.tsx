import {
  Box,
  Icon,
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
import { BsFillPersonFill } from "react-icons/bs";
import { VscEye } from "react-icons/vsc";
import { BiSolidLockAlt } from "react-icons/bi";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};
//modal functions
const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  //in
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //input change handler-name
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharRemaining(21 - event.target.value.length);
  };
  //community type set
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  //firestore functions
  const handleCrreateCommunity = async () => {
    if(error) setError('');
    //Validate the community
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(communityName) || communityName.length < 3) {
      return setError(
        "Community names must be between 321 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }
    //Create the community in firestore databse
    //check if name not taken
    //if unique name - create community

    try {
      setLoading(true);
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        throw new Error(`Sorry community name r/${communityName} is already taken`);
  
      }
      //create community
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
      setLoading(false);
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
      setLoading(false);
    }
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
              <Text fontSize={12} color="red" p={1}>
                {error}
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
                      <Icon
                        as={BsFillPersonFill}
                        color="gray.600"
                        fontSize={12}
                        mr={1}
                      />
                      <Text fontSize={12} mr={1}>
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
                      <Icon as={VscEye} color="gray.600" fontSize={12} mr={1} />
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
                      <Icon
                        as={BiSolidLockAlt}
                        color="gray.600"
                        fontSize={12}
                        mr={1}
                      />
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
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue"
            onClick={handleCrreateCommunity}
            isLoading={loading}
            >Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
