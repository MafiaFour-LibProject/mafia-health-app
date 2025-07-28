import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogsService";
import BlogFilters from "./BlogFilters";
import BlogCard from "./BlogCard";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs({ ...filters, page, limit });
        setBlogs(data.blogs);
        setTotal(data.total || data.blogs.length);
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filters, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Explore Articles</h2>
        <h2 className="mb-4 text-unt-deep">
          Empowering Ghanaians with life-saving health knowledge
        </h2>

        <BlogFilters filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-6 h-6 text-green-700" />
            <span className="ml-2">Loading blogs...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No blogs found.</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BlogList;
