import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import minimalist from "../../assets/minimalist.png";

function Dashboard() {
  const auth = getAuth();
  const handleSignOut = (auth) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="flex">
      {/* left */}
      <div className="flex-1 min-h-screen bg-gray-200">
        <div className=" mb-4">
          <div className="text-center p-6 bg-gradient-to-bl from-gray-500 to-gray-700">
            <h1 className="text-white text-4xl font-bold">Dashboard</h1>
          </div>
          <div className="bg-gray-200 text-gray-600 text-left">
            <ul className="flex flex-col font-semibold justify-center items-center">
              <li className="w-full p-4  bg-gradient-to-bl from-red-400 to-red-700">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-2xl text-white" : "bg-blue-400  "
                  }
                >
                  Home
                </NavLink>
                
              </li>
              <li className="p-4 text-2xl text-gray-700  w-full">
                <button className="hover:cursor-pointer" onClick={() => handleSignOut(auth)}>Signout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex-4 p-2 bg-gray-300">
        <div className=" p-4">
          <div>
            <h2 className="text-gray-600 text-4xl font-bold underline">
              Welcome to the Dashboard
            </h2>
          </div>
          <div className="py-4">
            <h2 className="text-gray-600 text-xl font-bold">Choose Template</h2>
          </div>
          <div>
            <div>
              <ul>
                <li>
                  <div className="hover:border w-60 h-70 hover:border-gray-500">
                    <NavLink to="/builder/minimalist">
                      <img
                        src={minimalist}
                        alt="Minimalist Resume Template"
                        className="w-full h-full rounded-md"
                      />
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
