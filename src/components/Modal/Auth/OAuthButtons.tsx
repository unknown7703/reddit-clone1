import { Button, Flex ,Image} from '@chakra-ui/react';
import React from 'react';



const OAuthButtons:React.FC = () => {
    
    return (
    <Flex direction="column" width="100%" mb={3}>
        <Button variant="oauth" mb={2}>
            <Image src="/images/googlelogo.svg" height="15px" mr={4}>
                </Image>Continue with Google</Button>
    </Flex>
    
    );
}
export default OAuthButtons;