import type { PrefectureResponse } from '@/types/population';

export async function fetchPrefectures(): Promise<PrefectureResponse> {
    const url = process.env.NEXT_PUBLIC_RESAS_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_RESAS_API_KEY || '';

    try {
        const response = await fetch(`${url}/api/v1/prefectures`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        const json = await response.json();

        if (json?.data?.errorMessage) {
            throw new Error(json.data.errorMessage);
        }

        return json;
    } catch (error) {
        throw new Error(error?.toString() || 'Prefectures データの取得に失敗しました');
    }
}
