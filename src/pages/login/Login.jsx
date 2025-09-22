import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This is the signed-in user
      const user = result.user;
      console.log("User:", user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const registerWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      console.log("Registered user:", user);
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log("Logged in user:", user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className=" flex flex-col gap-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-3xl font-bold">Sign In</h1>
        <button
          onClick={loginWithGoogle}
          className="mb-2 w-full rounded-lg bg-red-500 p-2 text-white"
        >
          Continue with Google
        </button>
        <div>
          <div>
            {error && (
              <span className="text-red-500">Invaid Email or Password</span>
            )}
            <input
              type="email"
              placeholder="Email"
              className={
                error
                  ? "mb-2 w-full border-red-500 rounded border p-2 focus:outline-none"
                  : "mb-2 w-full rounded border p-2 focus:outline-none"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className={
                error
                  ? "mb-2 w-full border-red-500 rounded border p-2 focus:outline-none"
                  : "mb-2 w-full rounded border p-2 focus:outline-none"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
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
