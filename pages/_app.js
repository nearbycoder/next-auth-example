import { ChakraProvider, Flex } from '@chakra-ui/react';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Flex flexDir="column">
        <Nav />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
