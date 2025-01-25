export default function ShareCapsuleList({
  users,
  selectedUsers,
  setSelectedUsers,
}) {
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <ul className="flex flex-col space-y-2 text-primary-50">
      {users.length > 0 ? (
        users.map((user) => (
          <li
            key={user.id}
            className={`bg-primary-800 rounded p-2 px-4 hover:bg-primary-700 transition-all cursor-pointer ${
              selectedUsers.includes(user.id) ? "bg-accent-600" : ""
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
          </li>
        ))
      ) : (
        <h1>No user found</h1>
      )}
    </ul>
  );
}
