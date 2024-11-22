"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [password2, setPassword2] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const signUpUser = async () => {
    try {
      toast.loading("Waiting...", {
        duration: 2000,
      });
      const response = await axios.post("/api/signup", user);
      toast.success("SignUp successful");
      router.push("/api/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      password2.length > 0 &&
      user.password === password2
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, password2]);

  return (
    <div className="flex flex-col justify-center items-center my-24">
      <div className="login">
        <h1 className="text-4xl my-8">SignUp</h1>
        <div className="flex space-x-5 items-center">
          <div className="flex flex-col w-full">
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Enter your Username"
              value={user.username}
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            />
          </div>
        </div>

        <input
          className="input"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
        <input
          className="input"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />

        <input
          className="input"
          id="password2"
          type="password"
          placeholder="Re-enter your password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />

        {buttonDisabled ? (
          <div className="flex flex-col">
            <button
              className="my-2 px-12 py-1 border text-neutral-300 w-full bg-neutral-500 rounded-lg"
              disabled
            >
              SignUp
            </button>
            <Link href={"/api/auth/signin"}>Already a User? SignIn</Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <button onClick={signUpUser} className="auth">
              SignUp
            </button>
            <Link href={"/api/auth/signin"}>Already a User? SignIn</Link>
          </div>
        )}
      </div>
    </div>
  );
}
