import type { PrefectureResponse } from '@/types/prefecture/prefectureData';

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

        if (!response.ok) {
            throw new Error('都道府県データの取得に失敗しました。');
        }

        const json = await response.json();

        return json;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('都道府県データの取得にあたり、予期しないエラーが発生しました');
    }
}
