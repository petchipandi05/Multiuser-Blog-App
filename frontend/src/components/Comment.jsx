import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg my-2 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">@{c.author}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId && (
            <MdDelete className="text-red-600 cursor-pointer" onClick={() => deleteComment(c._id)} />
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">{c.comment}</p>
    </div>
  );
};

export default Comment;