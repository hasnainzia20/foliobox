import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../utils/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  const registerWithEmail = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-bold">Sign In</h1>

        <button
          onClick={loginWithGoogle}
          className="mb-2 w-full rounded-lg bg-red-500 p-2 text-white"
        >
          Continue with Google
        </button>

        <button
          onClick={loginWithGithub}
          className="mb-4 w-full rounded-lg bg-gray-800 p-2 text-white"
        >
          Continue with GitHub
        </button>

        <input
          type="email"
          placeholder="Email"
          className="mb-2 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-2 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={loginWithEmail}
            className="flex-1 rounded bg-blue-500 p-2 text-white"
          >
            Login
          </button>
          <button
            onClick={registerWithEmail}
            className="flex-1 rounded bg-green-500 p-2 text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
