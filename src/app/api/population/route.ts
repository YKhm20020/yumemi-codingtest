import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
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

    const { searchParams } = new URL(request.url);
    const prefCode = searchParams.get('prefCode');

    if (!prefCode) {
        return NextResponse.json(
            { error: 'prefCode が未定義のため、人口データを取得できません。' },
            { status: 400 },
        );
    }

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
            return NextResponse.json(
                { error: '人口データの取得に失敗しました。' },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`${error}: 人口データ取得エラー`);
        return NextResponse.json(
            {
                error: `${error}: 人口データ取得時にエラーが発生しました`,
            },
            { status: 500 },
        );
    }
}
