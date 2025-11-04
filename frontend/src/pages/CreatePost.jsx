import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Post</h1>
        <form className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            className="px-4 py-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <textarea
            rows={10}
            placeholder="Enter post description"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full sm:w-1/4 mx-auto"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;