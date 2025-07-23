import { useState, useEffect } from "react";
import { getFacilityReviews } from "../../services/reviewService";
import Loader from "../../components/Loader";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";

const AdminReviews = () => {
  const { facilityId } = useParams();
  const [facilityReviews, setFacilityReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFacilityReviews = async () => {
    setLoading(true);
    try {
      const res = await getFacilityReviews(facilityId);
      const reviews = Array.isArray(res.data) ? res.data : [];

      setFacilityReviews(reviews);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilityReviews();
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Facility Reviews</h1>

      {facilityReviews.length === 0 ? (
        <p className="text-gray-600">There are no reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {facilityReviews.map((review) => (
            <li
              key={review._id}
              className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
            >
              <div className="mb-2">
                <p className="font-semibold text-gray-800 text-lg">
                  {review.user?.name || "Unknown User"}
                </p>
                <div className="flex items-center mt-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500">
                Facility:{" "}
                <strong>{review.facility?.name || "Unknown Facility"}</strong>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on: {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReviews;
