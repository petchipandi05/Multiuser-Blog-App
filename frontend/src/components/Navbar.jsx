import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const showMenu = () => setMenu(!menu);

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/">Blog App</Link>
        </h1>
        {path === "/" && (
          <div className="flex items-center space-x-2">
            <BsSearch
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
            />
            <input
              type="text"
              placeholder="Search posts..."
              className="border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        )}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to={`/profile/${user._id}`} className="text-gray-600 hover:text-blue-600">
                Profile
              </Link>
              <Link to="/write" className="text-gray-600 hover:text-blue-600">
                Write
              </Link>
              <Link to={`/myblogs/${user._id}`} className="text-gray-600 hover:text-blue-600">
                My Blogs
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <FaBars className="text-2xl cursor-pointer" onClick={showMenu} />
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;