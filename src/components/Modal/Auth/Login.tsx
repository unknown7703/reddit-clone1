import { authModalState } from "@/src/atoms/authModalAtom";
import { Text, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";



type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: " ",
    password: " ",
  });
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   signInWithEmailAndPassword(loginForm.email,loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        fontSize="10pt"
        bg="gray.50"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          boderColor: "blue.500",
        }}
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          boderColor: "blue.500",
        }}
        fontSize="10pt"
        bg="gray.50"
        onChange={onChange}
      />
       <Text align="center" color="red">
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      <Button type="submit" height="36px" mb={2} width="100%" mt={2}>
        Log-In
      </Button>
      <Flex fontSize="9pt" ml={3}>
        <Text color="grey.50" mr={2}>
          Forgot Password?
        </Text>
        <Text
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "resetPassword" }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" ml={3}>
        <Text color="grey.50" mr={2}>
          New Here?
        </Text>
        <Text
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
