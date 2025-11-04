import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-6 bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105">
      <div className="sm:w-1/3 h-48">
        <img src={IF + p.photo} alt="" className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="sm:w-2/3 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{p.title}</h1>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="mt-2 text-gray-600">
          {p.desc.slice(0, 200)}... <span className="text-blue-600 hover:text-blue-800">Read more</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;