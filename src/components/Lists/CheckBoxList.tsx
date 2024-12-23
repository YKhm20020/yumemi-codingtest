'use client';

import type { PrefectureData } from '@/types/population';
import { fetchPrefectures } from '@/utils/population/fetchPrefectures';
import { useEffect, useState } from 'react';
import { CheckBox } from '../CheckBoxes/CheckBox';

export const CheckBoxList = () => {
    const [selectedPrefectureCodes, setSelectedPrefectureCodes] = useState<Set<number>>(new Set());
    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);

    // prefCode と 都道府県名のデータを取得
    // TODO: CheckBoxList と PopulationGraph をまとめたコンポーネントで改めて実装
    // TODO: データ取得に失敗した場合のエラーハンドリング
    // TODO: 全都道府県の4種類の全人口データを一度に取得するか、都道府県および人口種別ごとに取得するかを決める
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPrefectures();
                setPrefectures(data.result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // チェックボックスの選択状態を更新する関数
    // TODO: グラフにデータを渡すため、CheckBoxList と PopulationGraph をまとめたコンポーネントで改めて実装
    const handleChange = (prefCode: number, checked: boolean) => {
        // 選択された prefCode を更新
        // prefCode の順序は今回は必要ないので、Set オブジェクトで選択した prefCode を管理
        const newSelected = new Set(selectedPrefectureCodes);

        if (checked) {
            newSelected.add(prefCode);
        } else {
            newSelected.delete(prefCode);
        }

        console.log('選択された都道府県:', newSelected);
        setSelectedPrefectureCodes(newSelected);
    };

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4'>
            {prefectures.map((prefecture) => (
                <CheckBox
                    key={prefecture.prefCode}
                    id={prefecture.prefCode}
                    label={prefecture.prefName}
                    checked={selectedPrefectureCodes.has(prefecture.prefCode)}
                    onChange={(checked) => handleChange(prefecture.prefCode, checked)}
                />
            ))}
        </div>
    );
};
