import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { authModalState } from "../../../atoms/authModalAtom";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
const Signup: React.FC = () => {
  const [signUpForm, setsignUpForm] = useState({
    email: " ",
    password: " ",
    confirmpassword: " ",
  });

  //firebase logic start
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  //firebase end

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if(userError) userError.message='';
    if (signUpForm.password.length < 6) {
      setError("password too small");
      return;
    }
    if (signUpForm.password !== signUpForm.confirmpassword) {
      setError("password do not match !");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email,signUpForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpForm((prev) => ({
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
      <Input
        required
        name="confirmpassword"
        placeholder="confirm - password"
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
      {(error || userError) && (
        <Text align="center" color="red">
          {error ||FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] }
        </Text>
      )}
       {/* {userError && (
        <Text align="center" color="red">
          {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )} */}
      <Button type="submit" height="36px" mb={2} width="100%" mt={2} isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="9pt">
        <Text color="grey.50" mr={2}>
          Already a redditor?
        </Text>
        <Text
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default Signup;

function setLoginForm(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
