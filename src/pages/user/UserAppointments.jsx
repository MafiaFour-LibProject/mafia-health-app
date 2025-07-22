// Shows user's appointments booked
import { useState, useEffect } from "react";
import { getUserAppointments } from "../../services/appointmentsService";
import Loader from "../../components/Loader";

const UserAppointments = () => {
  const [allUserAppointments, setAllUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserAppointments = async () => {
    setLoading(true);
    try {
      const data = await getUserAppointments();

      if (Array.isArray(data)) {
        setAllUserAppointments(data);
      }
    } catch (error) {}
  };

  return <div>UserAppointments</div>;
};

export default UserAppointments;
