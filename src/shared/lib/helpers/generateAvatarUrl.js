import { AVATAR_URL } from '@shared/config/config';

export const generateAvatarUrl = (seed) => `${AVATAR_URL}${seed}.svg`;
