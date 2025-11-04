import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(""); // Store the current photo URL or file name

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(null); // Reset file input (cannot prefill file input for security reasons)
      setCurrentPhoto(res.data.photo); // Store the current photo URL to display
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
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
      const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mx-0 sm:mx-1 lg:mx-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update a Post</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              className="px-4 py-3"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setCurrentPhoto(e.target.files[0]?.name || currentPhoto); // Update currentPhoto with new file name
              }}
            />
            {currentPhoto && (
              <p className="text-sm text-gray-600">
                Current image: <span className="font-medium">{currentPhoto}</span>
              </p>
            )}
          </div>
          <textarea
            rows={10}
            placeholder="Enter post description"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full sm:w-1/4 mx-auto"
          >
            Update
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;