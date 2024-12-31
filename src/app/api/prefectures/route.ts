import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    const url = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

    if (!apiKey || !url) {
        return NextResponse.json(
            {
                error: '必要な環境変数が未定義です。',
            },
            { status: 500 },
        );
    }

    try {
        const response = await fetch(`${url}/api/v1/prefectures`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });
        console.log('APIルートから呼ばれてるよ');

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: `${response.statusText}: 都道府県データの取得に失敗しました`,
                },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`${error}: 都道府県取得エラー`);
        return NextResponse.json(
            {
                error: `${error}: 都道府県データ取得時にエラーが発生しました`,
            },
            { status: 500 },
        );
    }
}
