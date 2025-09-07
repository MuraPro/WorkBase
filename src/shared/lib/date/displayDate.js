export function displayDate(timestamp) {
  const date = new Date(parseInt(timestamp));
  const now = new Date();

  const diffMs = now - date; // разница в мс
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffYears = now.getFullYear() - date.getFullYear();

  if (diffMinutes < 5) return '1 минуту назад';
  if (diffMinutes < 10) return '5 минут назад';
  if (diffMinutes < 30) return '10 минут назад';
  if (diffMinutes < 60) return '30 минут назад';

  if (diffHours < 24) return `Более ${diffHours} ч. назад`;

  if (diffDays < 365) return `Более ${diffDays} дн. назад`;

  return `Более ${diffYears} г. назад`;
}
