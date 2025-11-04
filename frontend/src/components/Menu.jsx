import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow-lg w-48 absolute top-12 right-4 rounded-lg p-4 flex flex-col space-y-2 z-50">
      {!user && (
        <Link to="/login" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>
      )}
      {!user && (
        <Link to="/register" className="text-gray-600 hover:text-blue-600">
          Register
        </Link>
      )}
      {user && (
        <Link to={`/profile/${user._id}`} className="text-gray-600 hover:text-blue-600">
          Profile
        </Link>
      )}
      {user && (
        <Link to="/write" className="text-gray-600 hover:text-blue-600">
          Write
        </Link>
      )}
      {user && (
        <Link to={`/myblogs/${user._id}`} className="text-gray-600 hover:text-blue-600">
          My Blogs
        </Link>
      )}
      {user && (
        <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600 text-left">
          Logout
        </button>
      )}
    </div>
  );
};

export default Menu;