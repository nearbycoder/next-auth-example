import { signIn, signOut, getSession } from 'next-auth/client';
import { useState } from 'react';

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
          <button onClick={() => signOut()}>Sign out </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              fetch('/api/posts', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
              });
            }}>
            <div>
              <label htmlFor="title">Title</label>
              <br></br>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="body">Body</label>
              <br></br>
              <textarea
                id="body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
            <button type="submit">Create Post</button>
          </form>
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
