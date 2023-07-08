import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import React from "react";
import { FIREBASE_ERRORS } from "../../../firebase/errors";


type OAuthButtonsProps = {};

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction="column" width="100%" mb={3}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image src="/images/googlelogo.svg" height="15px" mr={4}></Image>
        Continue with Google
      </Button>
      {error && (
        <Text align="center" color="red">
          {error.message}
        </Text>)}
    </Flex>
  );
};
export default OAuthButtons;
