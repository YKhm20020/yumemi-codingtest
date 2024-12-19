export const fetchPrefecture = async () => {
    const url = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

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
        throw new Error(error?.toString() || 'Prefecture データの取得に失敗しました');
    }
};
