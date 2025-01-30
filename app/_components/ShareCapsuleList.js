import useFramerMotion from "../_utils/useFramerMotion";
import { motion } from "framer-motion";

export default function ShareCapsuleList({
  users,
  selectedUsers,
  setSelectedUsers,
}) {
  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const { containerVariants, capsuleVariants } = useFramerMotion();

  return (
    <motion.ul
      className="flex flex-col space-y-2 text-primary-50"
      variants={capsuleVariants}
    >
      {users.length > 0 ? (
        users.map((user) => {
          const isSelected = selectedUsers.includes(user.id);
          return (
            <motion.li
              key={user.id}
              whileTap={{ scale: 0.98 }}
              className={`rounded p-2 px-4 hover:bg-primary-700 transition-colors cursor-pointer ${
                isSelected ? "bg-accent-600" : ""
              }`}
              onClick={() => handleUserSelect(user.id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.imageUrl}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
                <div>
                  <h3 className="text-md">{user.username}</h3>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            </motion.li>
          );
        })
      ) : (
        <h1>No user found</h1>
      )}
    </motion.ul>
  );
}
