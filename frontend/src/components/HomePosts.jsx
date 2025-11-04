import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-6 bg-white shadow-lg rounded-lg p-4 mx-8 sm:mx-10 lg:mx-16 transition-transform hover:scale-105">
      <div className="sm:w-1/3 w-64 h-64 flex-shrink-0">
        <img
          src={IF + post.photo}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="sm:w-2/3 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="mt-2 text-gray-600">
          {post.desc.slice(0, 200)}...{" "}
          <span className="text-blue-600 hover:text-blue-800">Read more</span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;