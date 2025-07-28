import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-5 flex flex-col">
      <div className="text-sm text-gray-500 capitalize mb-1">
        {blog.category.replaceAll("_", " ")}
      </div>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{blog.excerpt}</p>

      <div className="text-xs text-gray-500 mt-auto">
        By {blog.author?.email?.split("@")[0]} •{" "}
        {new Date(blog.publishedAt).toLocaleDateString()}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link
        to={`/blogs/${blog._id}`}
        className="text-sm text-blue-600 mt-4 hover:underline"
      >
        Read more →
      </Link>
    </div>
  );
};

export default BlogCard;
