import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Star, Trash2, Filter, ArrowLeft } from "lucide-react";
import Loader from "../../components/Loader";
import ReviewModal from "../../components/ReviewModal";
import { useAuth } from "../../contexts/AuthContext";
import { getSingleFacility } from "../../services/facilityService";
import { getFacilityServices } from "../../services/serviceService";
import {
  getFacilityReviews,
  createReview,
  deleteReview,
} from "../../services/reviewService";

const FacilityDetails = () => {
  const { facilityId } = useParams();
  const { user, authReady } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchFacilityDetails = async () => {
    try {
      const res = await getSingleFacility(facilityId);
      setFacility(res.data);
    } catch {
      toast.error("Error loading facility");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getFacilityServices(facilityId);
      setServices(res.data);
    } catch {
      toast.error("Error loading services");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getFacilityReviews(facilityId);
      const sorted = sortReviews(res.data, sortOrder);
      setReviews(sorted);
    } catch {
      toast.error("Error loading reviews");
    }
  };

  useEffect(() => {
    if (!authReady) return;
    setLoading(true);
    Promise.all([
      fetchFacilityDetails(),
      fetchServices(),
      fetchReviews(),
    ]).finally(() => setLoading(false));
  }, [facilityId, authReady]);

  useEffect(() => {
    if (reviews.length > 0) {
      setReviews(sortReviews(reviews, sortOrder));
    }
  }, [sortOrder]);

  useEffect(() => {
    if (!authReady || !user || reviews.length === 0) return;

    const found = reviews.find((r) => r.user?._id === user._id);
    setUserReview(found || null);
  }, [authReady, user, reviews]);

  const sortReviews = (data, order) => {
    const sorted = [...data];
    switch (order) {
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      await createReview({ rating, comment, facility: facilityId });
      toast.success("Review submitted!");
      setShowReviewModal(false);
      fetchReviews();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Review submission failed");
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review deleted");
      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"
        }
      />
    ));

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  if (!authReady || loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-16">
      <div className="relative w-full h-72 md:h-96 flex items-end">
        <img
          src={facility.images?.[0]?.url ?? "/images/hero-image-3.jpg"}
          alt={facility.name}
          className="absolute inset-0 w-full h-full object-cover object-center rounded-b-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl" />
        <div className="relative z-10 p-8 md:p-12 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-white/80 hover:text-white"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-2">
            {facility.name}
          </h1>
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <span className="bg-green-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {facility.type}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                facility.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {facility.isActive ? "Active" : "Inactive"}
            </span>
            {averageRating && (
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                {averageRating} <Star size={14} className="fill-yellow-400" />
              </span>
            )}
          </div>
          <p className="text-white/90 text-lg">
            {facility.location?.address}, {facility.location?.city}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">About</h2>
            <p className="text-gray-700 text-lg">{facility.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Services Offered
            </h2>
            {services.length === 0 ? (
              <p className="text-gray-400">No services available</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <li
                    key={s._id}
                    className="border p-4 rounded-xl shadow-sm bg-green-50"
                  >
                    <h3 className="font-semibold text-gray-800">{s.name}</h3>
                    <p className="text-sm text-gray-600">{s.description}</p>
                    <p className="text-sm text-green-700 font-bold mt-1">
                      GHS {s.price?.amount}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {authReady && !userReview && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              >
                Leave a Review
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">
              Operating Hours
            </h2>
            <ul className="space-y-1 text-sm">
              {facility.hours &&
                Object.entries(facility.hours).map(([day, time]) => (
                  <li key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span className="font-mono">
                      {time.open} - {time.close}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Contact</h2>
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${facility.contact?.email}`}
                  className="text-blue-700 hover:underline"
                >
                  {facility.contact?.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href={`tel:${facility.contact?.phone}`}
                  className="text-blue-700 hover:underline"
                >
                  {facility.contact?.phone}
                </a>
              </p>
              {facility.contact?.website && (
                <p>
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={facility.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {facility.contact.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-green-700">
                Reviews ({reviews.length})
              </h2>
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-sm border px-2 py-1 rounded"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest</option>
                  <option value="lowest">Lowest</option>
                </select>
              </div>
            </div>
            {averageRating && (
              <p className="text-yellow-500 font-bold mb-2">
                Average Rating: {averageRating} ★
              </p>
            )}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-400">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-green-50 border border-green-100 p-4 rounded-xl shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {review.user?.name}
                        </p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      {user?._id === review.user?._id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default FacilityDetails;
