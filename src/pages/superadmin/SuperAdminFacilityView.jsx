import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleFacility } from "../../services/facilityService";
import Loader from "../../components/Loader";
import { MapPin, ArrowLeft, Trash2, Star } from "lucide-react";
import { toast } from "react-toastify";

const SuperAdminFacilityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await getSingleFacility(id);
        setFacility(res.data);
      } catch (err) {
        console.error("Error fetching facility:", err);
        setError("Failed to load facility details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleBack = () => {
    navigate("/superadmin");
  };

  const handleRemove = () => {
    toast.success("Facility removed");
    navigate("/superadmin");
  };

  const dummyReviews = [
    {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/100?img=1",
      stars: 5,
      comment: "Very professional facility!",
    },
    {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/100?img=2",
      stars: 4,
      comment: "Clean environment and friendly staff.",
    },
  ];

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!facility) return <p className="text-center">Facility not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center text-sm text-green-700 hover:underline mb-6"
      >
        <ArrowLeft className="size-4 mr-1" />
        Back to Dashboard
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow p-6 mb-8">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          {facility.name}
        </h1>
        <div className="text-gray-700 mb-2 flex items-center gap-2">
          <MapPin className="text-green-600 size-4" />
          {facility?.location?.address || "Unknown address"},{" "}
          {facility?.location?.city || "Unknown city"}
        </div>
        <p className="capitalize text-sm text-gray-600 mb-1">
          Type: {facility.type || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          Facility ID: <span className="font-mono">{facility._id}</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-600 mb-4">Reviews</h2>
        {dummyReviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-5">
            {dummyReviews.map((review, idx) => (
              <div key={idx} className="flex gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-medium text-gray-800">{review.name}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleRemove}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        <Trash2 className="size-4" />
        Remove Facility
      </button>
    </div>
  );
};

export default SuperAdminFacilityView;
