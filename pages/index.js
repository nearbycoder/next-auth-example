import { signIn, signOut, getSession } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const PostSchema = Yup.object().shape({
  title: Yup.string().required('* Required'),
  body: Yup.string().required('* Required'),
});

export default function Page({ session }) {
  const formik = useFormik({
    initialValues: { title: '', body: '' },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());

      setSubmitting(false);

      if (data?.id) {
        resetForm();
      }
    },
    validationSchema: PostSchema,
    validateOnBlur: true,
  });

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
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>
                Title:{' '}
                <span style={{ color: 'red' }}>
                  {formik.touched?.title && formik?.errors?.title}
                </span>
                <input
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  name="title"></input>
              </label>
            </div>
            <div>
              <label>
                Body:{' '}
                <span style={{ color: 'red' }}>
                  {formik.touched?.body && formik?.errors?.body}
                </span>
                <textarea
                  type="text"
                  onBlur={formik.handleBlur}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  name="body"></textarea>
              </label>
            </div>
            <button type="submit">Submit</button>
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
