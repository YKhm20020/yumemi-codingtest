import type { PrefectureResponse } from '@/types/prefecture/prefectureData';

export async function fetchPrefectures(): Promise<PrefectureResponse> {
    try {
        const response = await fetch('/api/prefectures');

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
