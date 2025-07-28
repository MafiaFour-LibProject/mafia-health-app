import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../../services/blogsService";
import Loader from "../../components/Loader";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiEye, FiPlus } from "react-icons/fi";

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res.blogs || []);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlogId);
      toast.success("Blog deleted successfully");
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlogId));
    } catch (err) {
      toast.error("Failed to delete blog");
    } finally {
      setShowModal(false);
      setSelectedBlogId(null);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Blog Manager</h1>
          <p className="text-gray-500 mt-1">Manage all blog posts</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <Link
            to="/superadmin/blogs/create"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-unt-deep hover:bg-sac-state-secondary text-white rounded-lg transition-colors shadow-sm"
          >
            <FiPlus className="h-5 w-5" />
            <span>Add Blog</span>
          </Link>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {searchTerm ? "No matching blogs found" : "No blogs found"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try a different search term"
                : "Get started by creating your first blog post"}
            </p>
            <Link
              to="/superadmin/blogs/create"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus className="h-5 w-5" />
              Add Blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              {blog.featuredImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex flex-col gap-y-2 justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-sac-state-secondary line-clamp-2">
                    {blog.title}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {blog.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-unt-deep"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex gap-2">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View"
                    >
                      <FiEye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/superadmin/blogs/edit/${blog._id}`}
                      className="inline-flex items-center p-2 rounded-full text-orange-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedBlogId(blog._id);
                        setShowModal(true);
                      }}
                      className="inline-flex items-center p-2 cursor-pointer rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setShowModal(false);
          setSelectedBlogId(null);
        }}
      />
    </div>
  );
};

export default BlogsManager;
