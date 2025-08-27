import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import axios from "axios";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users/friends`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFriends(res.data);
      } catch (err) {
        console.error("Error fetching friends:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [API_BASE]);

  if (loading) return <p className="p-6">Loading friends...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))
      ) : (
        <p>No friends found.</p>
      )}
    </div>
  );
};

export default FriendsPage;
