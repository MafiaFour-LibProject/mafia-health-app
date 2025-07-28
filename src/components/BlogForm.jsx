import { useState, useEffect } from "react";
import {
  FiSave,
  FiPlusCircle,
  FiTag,
  FiAlignLeft,
  FiType,
} from "react-icons/fi";

const initialForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "",
  tags: "",
  status: "draft",
  // featuredImage: "",
};

const BlogForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({
  //         ...prev,
  //         featuredImage: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Title Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiType className="text-gray-500" />
          Blog Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter blog title"
          required
        />
      </div>

      {/* <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <div className="flex items-center gap-4">
          {formData.featuredImage && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={formData.featuredImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <label className="cursor-pointer">
            <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              {formData.featuredImage ? "Change Image" : "Upload Image"}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div> */}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiAlignLeft className="text-gray-500" />
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows={3}
          placeholder="A short description of blog post"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[200px]"
          rows={8}
          placeholder="Write blog content here..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g. Health Education"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiTag className="text-gray-500" />
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g. mental_health, emergency_kit...etc."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 cursor-pointer bg-unt-deep hover:bg-sac-state-secondary text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
        >
          <FiSave />
          {isEditing ? "Update Blog Post" : "Publish Blog Post"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
