export const fetchPerYearPopulation = async () => {
    const url = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

    try {
        const response = await fetch(`${url}/api/v1/population/composition/perYear?prefCode=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        const json = await response.json();
        // ここのデータはちゃんと来てそう
        console.log(json);

        if (json?.data?.errorMessage) {
            throw new Error(json.data.errorMessage);
        }

        return json;
    } catch (error) {
        throw new Error(error?.toString() || 'Population データの取得に失敗しました');
    }
};
