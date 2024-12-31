import type { PopulationDataPerYearResponse } from '@/types/population/populationData';

export async function fetchPerYearPopulation(
    prefCode: string,
): Promise<PopulationDataPerYearResponse> {
    try {
        const response = await fetch(`/api/population?prefCode=${prefCode}`);
        if (!response.ok) {
            throw new Error('人口データの取得に失敗しました。');
        }

        const json = await response.json();

        return json;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('人口データの取得にあたり、予期しないエラーが発生しました');
    }
}
