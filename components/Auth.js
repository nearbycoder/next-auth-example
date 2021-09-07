import React from 'react';
import { Flex } from '@chakra-ui/react';
import Nav from './Nav';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Auth({ Component, pageProps }) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <Flex flexDir="column">
      <Nav />
      <Component {...pageProps} session={session} />
    </Flex>
  );
}
