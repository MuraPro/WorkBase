// Преобразует объект профессий в массив для селекта
export const transformProfessions = (data) => {
  return Object.keys(data).map((professionKey) => ({
    label: data[professionKey].name,
    value: data[professionKey]._id,
  }));
};

// Преобразует объект качеств в массив для селекта
export const transformQualities = (data) => {
  return Object.keys(data).map((qualityKey) => ({
    value: data[qualityKey]._id,
    label: data[qualityKey].name,
    color: data[qualityKey].color,
  }));
};

// Находит профессию по id
export const getProfessionById = (professions, id) => {
  return professions.find((p) => p._id === id);
};

// Преобразует массив выбранных качеств из UI в массив для API
// export const getQualitiesByValues = (selected, qualities) => {
//   return selected.reduce((acc, sel) => {
//     const match = qualities.find((q) => q.value === sel.value);
//     if (match) {
//       acc.push({
//         _id: match.value,
//         name: match.label,
//         color: match.color,
//       });
//     }
//     return acc;
//   }, []);
// };

export const getQualitiesByValues = (selected, qualities) => {
  return selected.reduce((acc, sel) => {
    const match = qualities.find((q) => q._id === sel.value);
    if (match) {
      acc.push(match);
    }
    return acc;
  }, []);
};

export const arrayToMapById = (array) =>
  array.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});

export const transformToSelectOptions = (
  items,
  labelKey = 'name',
  valueKey = '_id'
) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

export const extractIds = (items) => {
  return items.map((item) => item.value);
};

export function getUserQualities(user, qualities) {
  if (!user || !qualities) return [];
  return qualities.filter((q) => user.qualities.includes(q._id));
}
