const BlogFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        name="category"
        placeholder="Filter by category"
        className="border px-3 py-1 rounded"
        onChange={handleChange}
        value={filters.category}
      />
      <input
        type="text"
        name="tags"
        placeholder="Filter by tags"
        className="border px-3 py-1 rounded"
        onChange={handleChange}
        value={filters.tags}
      />
      {/* <select
        name="status"
        className="border px-3 py-1 rounded"
        onChange={handleChange}
        value={filters.status}
      >
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select> */}
    </div>
  );
};

export default BlogFilters;
