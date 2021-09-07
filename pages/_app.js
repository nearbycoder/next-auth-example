import { ChakraProvider } from '@chakra-ui/react';
import Auth from '../components/Auth';

function MyApp({ Component, pageProps, session }) {
  return (
    <ChakraProvider>
      <Auth {...pageProps} session={session} Component={Component} />
    </ChakraProvider>
  );
}

export default MyApp;
