const Footer = () => {
  return (
    <div className="bg-gray-900 text-white mt-12 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-2">
          <p className="font-semibold">Explore</p>
          <p className="hover:text-blue-400 cursor-pointer">Featured Blogs</p>
          <p className="hover:text-blue-400 cursor-pointer">Most Viewed</p>
          <p className="hover:text-blue-400 cursor-pointer">Readers Choice</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-semibold">Community</p>
          <p className="hover:text-blue-400 cursor-pointer">Forum</p>
          <p className="hover:text-blue-400 cursor-pointer">Support</p>
          <p className="hover:text-blue-400 cursor-pointer">Recent Posts</p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-semibold">Legal</p>
          <p className="hover:text-blue-400 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-blue-400 cursor-pointer">About Us</p>
          <p className="hover:text-blue-400 cursor-pointer">Terms & Conditions</p>
        </div>
      </div>
      <p className="text-center text-sm mt-8"> Created by Petchipandi S @ All rights reserved</p>
    </div>
  );
};

export default Footer;

