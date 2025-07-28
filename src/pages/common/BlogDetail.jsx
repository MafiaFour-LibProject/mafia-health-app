import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../../services/blogsService";
import { Loader2, ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { format } from "date-fns";
import Navbar from "../../components/Navbar";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 inline-block">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or may have been
            removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mt-15 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Blogs</span>
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            {blog.category.replaceAll("_", " ")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author?.email || "Unknown Author"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {blog.publishedAt
                  ? format(new Date(blog.publishedAt), "MMMM dd, yyyy")
                  : "Unpublished"}
              </span>
            </div>
          </div>

          {blog.featuredImage && (
            <div className="rounded-xl overflow-hidden mb-8 shadow-md">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        <article className="prose prose-lg max-w-none">
          {blog.content.split("\n").map((para, idx) => (
            <p key={idx} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </article>

        {blog.tags?.length > 0 && (
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
              <Tag className="w-5 h-5 text-gray-500" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blogs?tag=${tag}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;
