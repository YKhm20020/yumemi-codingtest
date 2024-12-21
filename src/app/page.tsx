'use client';
import { CheckBox } from '@/components/CheckBoxes/CheckBox';
import { PopulationChart } from '@/components/Graphs/PopulationGraph';
import { fetchPrefectures } from '@/utils/population/fetchPrefectures';
import { useEffect, useState } from 'react';

export default function Home() {
    const [label, setLabel] = useState<string>('');

    // データフェッチできるかの確認用。
    // あとで削除し、ページ全体は RSC で作成する。
    // TODO: チェックボックスリストとグラフをまとめたコンポーネントでデータフェッチして、チェックボックスのチェック状態に応じてグラフを表示するようにする。
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPrefectures();
                console.log(data);
                const label = data.result[0]?.prefName;
                setLabel(label);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className='flex items-center gap-4'>
                <CheckBox label={label} />
                <CheckBox label={'青森'} />
            </div>
            <PopulationChart prefCode='1' dataType={1} />
        </div>
    );
}
