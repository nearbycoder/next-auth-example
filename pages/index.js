import { useState } from 'react';
import { signIn, signOut, getSession } from 'next-auth/client';

export default function Page({ session }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();

              fetch('/api/posts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
              });
            }}>
            <div>
              <label>
                Title:
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"></input>
              </label>
            </div>
            <div>
              <label>
                Body:
                <textarea
                  onChange={(e) => setBody(e.target.value)}
                  name="body"></textarea>
              </label>
            </div>
            <button>Submit</button>
          </form>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
