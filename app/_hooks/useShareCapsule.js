// hooks/useShareCapsule.js
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers, shareCapsule } from "@/actions";

export default function useShareCapsule(userId) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCapsuleId, setSelectedCapsuleId] = useState(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch users when search query changes
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]); // Clear results if search is empty
      return;
    }

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { users, error } = await getUsers(debouncedQuery);
        if (error) throw error;
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        toast.error("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  const handleShare = async (selectedUsers) => {
    if (!selectedCapsuleId || !userId || !selectedUsers.length) {
      toast.error(
        "Invalid input: capsuleId, userId, or selectedUsers missing."
      );
      return;
    }

    try {
      const { data, error } = await shareCapsule(
        selectedCapsuleId,
        userId,
        selectedUsers
      );

      console.log("Capsule shared successfully:", data);
      toast.success("Capsule shared successfully!");
    } catch (error) {
      console.error("Error sharing capsule:", error.message);
      toast.error("Failed to share capsule. Please try again.");
    }
  };

  return {
    users,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleShare,
    setSelectedCapsuleId,
  };
}
