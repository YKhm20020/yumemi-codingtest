import type { PopulationResponse } from '@/types/population';

export async function fetchPerYearPopulation(prefCode: string): Promise<PopulationResponse> {
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

        const json = await response.json();

        if (json?.data?.errorMessage) {
            throw new Error(json.data.errorMessage);
        }

        return json;
    } catch (error) {
        throw new Error(error?.toString() || 'Population データの取得に失敗しました');
    }
}
