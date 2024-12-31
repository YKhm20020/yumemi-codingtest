import type { PopulationDataPerYearResponse } from '@/types/population/populationData';

export async function fetchPerYearPopulation(
    prefCode: string,
): Promise<PopulationDataPerYearResponse> {
    const url = process.env.NEXT_PUBLIC_RESAS_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_RESAS_API_KEY || '';

    try {
        const response = await fetch(
            `${url}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
            },
        );

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
