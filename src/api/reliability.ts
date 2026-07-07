import api from './api.ts';
import type { TypeReliability } from '../types/reliability.ts';

export async function fetchReliability({ userId, from }: { userId: string; from: string }): Promise<TypeReliability> {
	return await api.get(`/api/users/user_${userId}/reliability?from=${from}`);
}
