export function filterUsers(
  data,
  { searchQuery = '', selectedProf = null, currentUserId }
) {
  let result = data;

  if (searchQuery) {
    result = result.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedProf) {
    result = result.filter(
      (user) =>
        (typeof user.profession === 'object'
          ? user.profession._id
          : user.profession) === selectedProf._id
    );
  }

  return result.filter((user) => user._id !== currentUserId);
}
