import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Star,
  Trash2,
  Filter,
  ArrowLeft,
  Clock,
  Mail,
  Phone,
  Globe,
  CalendarDays,
  Hospital,
  MessageSquareText,
} from "lucide-react";
import Loader from "../../components/Loader";
import ReviewModal from "../../components/ReviewModal";
import { getSingleFacility } from "../../services/facilityService";
import { getFacilityServices } from "../../services/serviceService";
import {
  requestAppointment,
  // getFacilityCalendar,
} from "../../services/appointmentsService";
import {
  getFacilityReviews,
  createReview,
  deleteReview,
} from "../../services/reviewService";
import { useAuth } from "../../hooks/useAuth";

const FacilityDetails = () => {
  const { facilityId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");

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
      const serviceData = Array.isArray(res.data)
        ? res.data
        : res.data?.services || [];
      setServices(serviceData);
    } catch {
      toast.error("Error loading services");
      setServices([]);
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
    setLoading(true);
    Promise.all([
      fetchFacilityDetails(),
      fetchServices(),
      fetchReviews(),
    ]).finally(() => setLoading(false));
  }, [facilityId]);

  useEffect(() => {
    if (reviews.length > 0) {
      setReviews(sortReviews(reviews, sortOrder));
    }
  }, [sortOrder]);

  useEffect(() => {
    if (!user || reviews.length === 0) return;
    const found = reviews.find((r) => r.user?._id === user._id);
    setUserReview(found || null);
  }, [user, reviews]);

  const handleBookAppointment = async () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      toast.error("You must be logged in to book an appointment.");
      return;
    }

    const userData = JSON.parse(stored);
    if (userData?.role !== "user") {
      toast.error("Only users can book appointments.");
      return;
    }

    if (
      !selectedService ||
      !appointmentDate ||
      !startTime ||
      !endTime ||
      !reason
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Directly request the appointment without checking calendar
      await requestAppointment({
        facility: facilityId,
        service: selectedService,
        appointmentDate,
        timeSlot: { start: startTime, end: endTime },
        reason,
      });

      toast.success("Appointment booked successfully!");

      // Clear form
      setSelectedService("");
      setAppointmentDate("");
      setStartTime("");
      setEndTime("");
      setReason("");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Booking failed");
    }
  };

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
        size={18}
        className={
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-96 flex items-end overflow-hidden">
        <img
          src={facility.images?.[0]?.url ?? "/images/hero-image-3.jpg"}
          alt={facility.name}
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="relative z-10 p-6 md:p-12 text-white w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={20} /> Back to Facilities
          </button>
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-3 leading-tight">
            {facility.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-md">
              {facility.type}
            </span>
            <span
              className={`text-xs font-semibold px-4 py-1.5 rounded-full shadow-md ${
                facility.isActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {facility.isActive ? "Active" : "Inactive"}
            </span>
            {averageRating && (
              <span className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                {averageRating}{" "}
                <Star size={16} className="fill-yellow-700 text-yellow-700" />
              </span>
            )}
          </div>
          <p className="text-gray-200 text-lg md:text-xl font-medium">
            {facility.location?.address}, {facility.location?.city},{" "}
            {facility.location?.region}
          </p>
          {facility.location?.coordinates && (
            <p className="text-gray-300 text-sm mt-1">
              GPS: {facility.location.coordinates.lat},{" "}
              {facility.location.coordinates.lng}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b-2 border-blue-100 pb-2">
              <Hospital size={28} className="text-blue-500" /> Our Services
            </h2>
            {!Array.isArray(services) || services.length === 0 ? (
              <p className="text-gray-500 text-lg italic">
                No services are currently listed for this facility.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((s) => (
                  <li
                    key={s._id}
                    className="border border-gray-200 p-6 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 ease-in-out"
                  >
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      {s.name}
                    </h3>
                    <p className="text-base text-gray-600 mb-3 leading-relaxed">
                      {s.description}
                    </p>
                    <p className="text-lg text-blue-700 font-bold mt-2">
                      GHS {s.price?.amount}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-blue-100 pb-2">
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {facility.description}
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b-2 border-blue-100 pb-2">
              <CalendarDays size={28} className="text-blue-500" /> Book Your
              Appointment Today
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm"
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason for Appointment
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full border-gray-300 rounded-xl px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm resize-y"
                placeholder="Describe your reason for the appointment..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleBookAppointment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                Book Appointment
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Content Area */}
        <div className="space-y-10">
          {/* Operating Hours Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2 border-b-2 border-blue-100 pb-2">
              <Clock size={24} className="text-blue-500" /> Operating Hours
            </h2>
            <ul className="space-y-3 text-base text-gray-700">
              {facility.hours &&
                Object.entries(facility.hours).map(([day, time]) => (
                  <li
                    key={day}
                    className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="capitalize font-medium">{day}</span>
                    <span className="font-mono text-gray-800 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                      {time.open} - {time.close}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2 border-b-2 border-blue-100 pb-2">
              <Phone size={24} className="text-blue-500" /> Contact Details
            </h2>
            <div className="space-y-3 text-base text-gray-700">
              <p className="flex items-center gap-3">
                <Mail size={20} className="text-blue-500" />
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${facility.contact?.email}`}
                  className="text-blue-700 hover:underline transition-colors duration-200"
                >
                  {facility.contact?.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500" />
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href={`tel:${facility.contact?.phone}`}
                  className="text-blue-700 hover:underline transition-colors duration-200"
                >
                  {facility.contact?.phone}
                </a>
              </p>
              {facility.contact?.website && (
                <p className="flex items-center gap-3">
                  <Globe size={20} className="text-blue-500" />
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={facility.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline transition-colors duration-200"
                  >
                    {facility.contact.website}
                  </a>
                </p>
              )}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.005] transition-transform duration-200 ease-in-out">
            <div className="flex items-center justify-between mb-5 border-b-2 border-blue-100 pb-2">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquareText size={24} className="text-blue-500" />{" "}
                Reviews ({reviews.length})
              </h2>
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-gray-600" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 shadow-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
            {averageRating && (
              <p className="text-yellow-500 font-bold text-lg mb-4 flex items-center gap-1">
                Average Rating: {averageRating}{" "}
                <Star size={20} className="fill-yellow-500 text-yellow-500" />
              </p>
            )}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-lg italic">
                  No reviews yet. Be the first to share your experience!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {review.user?.name}
                        </p>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      {user?._id === review.user?._id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                          title="Delete your review"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed mt-2 text-base">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
            {!userReview && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  Leave a Review ✨
                </button>
              </div>
            )}
          </section>
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
