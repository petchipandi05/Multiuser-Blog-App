import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";  
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create",
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      fetchPostComments();
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  return (
    <div className="min-h-screen bg-gray-100 animate-fade-in">
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mx-0 sm:mx-1 lg:mx-2">
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="flex items-center space-x-4">
                  <BiEdit
                    className="text-2xl text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => navigate("/edit/" + postId)}
                  />
                  <MdDelete
                    className="text-2xl text-red-600 cursor-pointer hover:text-red-800"
                    onClick={handleDeletePost}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <p className="font-medium">@{post.username}</p>
              <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={IF + post.photo}
                className="w-full max-w-3xl h-96 object-cover rounded-lg mt-6"
                alt={post.title}
              />
            </div>
            <p className="mt-6 text-gray-700 text-lg leading-relaxed">{post.desc}</p>
    
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
              <div className="mt-4 space-y-4">
                {comments.length > 0 ? (
                  comments.map((c) => <Comment key={c._id} c={c} post={post} />)
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <input
                type="text"
                placeholder="Write a comment"
                className="w-full sm:w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={postComment}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 sm:w-1/5 transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;