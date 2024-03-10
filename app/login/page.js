
'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import LoaderSpinner from "@/components/LoaderSpinner"; // Import your loader spinner component

const SuspenseWrapper = ({ children }) =>
{
  const router = useRouter()
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);

  const signInWithSuspense = async (email, password) => {
    setIsSigningIn(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Login successful!");
      console.log('login successful')
      router.push("/");
    } catch (error) {
      console.error("Sign in failed:", error.message);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <React.Suspense fallback={<LoaderSpinner />}>
      {children(signInWithSuspense, isSigningIn)}
    </React.Suspense>
  );
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e, signInWithSuspense) => {
    e.preventDefault();
    signInWithSuspense(email, password);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-5xl font-semibold text-carpetMoss"
        >
          <Image
            className=" bg-cover"
            src="/images/logo.png"
            alt="user photo"
            width={100}
            height={100}
          />
          Candy Kush
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="candy@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="************"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <SuspenseWrapper>
                {(signInWithSuspense, isSigningIn) => (
                  <button
                    onClick={(e) => submitHandler(e, signInWithSuspense)}
                    type="submit"
                    className="w-full text-white bg-carpetMoss/80 hover:bg-carpetMoss focus:ring-4 focus:outline-none focus:ring-carpetMoss/25 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? "Signing in..." : "Sign in"}
                  </button>
                )}
              </SuspenseWrapper>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
