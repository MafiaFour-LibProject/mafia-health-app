import FacilityCard from "../../components/FacilityCard";
import { useState } from "react";
import { Star } from "lucide-react";

const FacilityDetails = () => {
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    reason: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment submitted:", appointment);
  };

  const dummyReviews = [
    {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/100?img=1",
      stars: 5,
      comment: "Excellent service and staff!",
    },
    {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/100?img=2",
      stars: 4,
      comment: "Very clean and professional environment.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 w-full bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <FacilityCard />
        </div>
        <div className="md:w-1/3 w-full space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Book an Appointment
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm text-gray-700"
            >
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Check-up, Consultation, etc."
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Additional Info
                </label>
                <textarea
                  name="additionalInfo"
                  value={appointment.additionalInfo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows="3"
                  placeholder="Any notes or context"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Submit Appointment
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-4">
              Customer Reviews
            </h3>
            <div className="space-y-5">
              {dummyReviews.map((review, index) => (
                <div key={index} className="flex gap-3">
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
                    <p className="text-sm text-gray-600 mt-1">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
