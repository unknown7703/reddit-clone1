import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose:()=> void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,handleClose
}) => {
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay 
         bg='orange.400'
         backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent>
          <ModalHeader>Create Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Make your own community</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost">Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
