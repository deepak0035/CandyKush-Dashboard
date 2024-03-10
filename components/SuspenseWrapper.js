// SuspenseWrapper.js
import React, { useState } from "react";
import LoaderSpinner from "@/components/LoaderSpinner";

const SuspenseWrapper = ({ children }) => {
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

export default SuspenseWrapper;
