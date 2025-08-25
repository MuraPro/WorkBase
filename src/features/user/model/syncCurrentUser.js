export function syncCurrentUser(users, currentUser) {
  const index = users.findIndex((u) => u._id === currentUser._id);
  if (index !== -1) {
    const isSame = JSON.stringify(users[index]) === JSON.stringify(currentUser);
    if (isSame) return users;

    const updated = [...users];
    updated[index] = currentUser;
    return updated;
  } else {
    return [...users, currentUser];
  }
}
