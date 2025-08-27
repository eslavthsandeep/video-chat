import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import axios from "axios";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // adjust this endpoint to match your backend route
        const res = await axios.get("http://localhost:5001/api/users/friends", {
          withCredentials: true, // if using cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT tokens
          },
        });
        setFriends(res.data); // expects array of users
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

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
