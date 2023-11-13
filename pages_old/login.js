import { useState, useEffect } from "react";
import { signIn, getCsrfToken, useSession } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  return (
    <div className="overflow-auto signin__modal modal_main in">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(60, "Must be 60 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("window.location.origin", window.location.origin);
          const res = await signIn("credentials", {
            redirect: true,
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });
          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res.url) router.push(res.url);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-title">
                <img
                  src="https://travismathew.com/_ui/responsive/theme-tm/images/tm-rewards-black.svg"
                  alt=""
                  className="modal-rewards"
                />
                <h3 className="f-m f-bold">WELCOME BACK!</h3>
              </div>
              <div className="bg-red-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />

                  <div className="text-red-400 text-md text-center rounded p-2">
                    {error}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      Email
                      <Field
                        name="email"
                        aria-label="enter your email"
                        aria-required="true"
                        type="text"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      password
                      <Field
                        name="password"
                        aria-label="enter your password"
                        aria-required="true"
                        type="password"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 btn btn--primary btn--primary-light text-uppercase btn--expand ajaxLoginButton"
                    >
                      {formik.isSubmitting ? "Please wait..." : "Sign In"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
