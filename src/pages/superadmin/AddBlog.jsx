import BlogForm from "../../components/BlogForm";
import { createBlog } from "../../services/blogsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createBlog(data);
      toast.success("Blog created successfully");
      navigate("/superadmin/blogs");
    } catch (err) {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-sac-state-secondary">
        Create New Blog
      </h1>
      <BlogForm onSubmit={handleCreate} />
    </div>
  );
};

export default AddBlog;
