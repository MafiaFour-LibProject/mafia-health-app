import { useState } from "react";
import { Star } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");
    onSubmit({ rating, comment });
  };

  const renderStars = () =>
    Array.from({ length: 5 }).map((_, index) => {
      const value = index + 1;
      const isActive = value <= (hovered || rating);
      return (
        <button
          key={value}
          type="button"
          onClick={() => setRating(value)}
          onMouseEnter={() => setHovered(value)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
        >
          <Star
            size={24}
            className={`transition-colors ${
              isActive ? "fill-yellow-400 text-yellow-500" : "text-gray-300"
            }`}
          />
        </button>
      );
    });

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 border border-green-500"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-1">{renderStars()}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              placeholder="Write your feedback..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-unt-deep text-white rounded hover:bg-green-700 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
