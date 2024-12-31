'use client';

import { CommonCheckBox } from '@/components/CheckBox/CommonCheckBox';
import type { PrefectureData } from '@/types/prefecture/prefectureData';
import { fetchPrefectures } from '@/utils/prefecture/fetchPrefectures';
import { useEffect, useState } from 'react';

type PrefectureCheckBoxListProps = {
    // チェック状態が変更された場合に呼び出される関数
    // 親コンポーネントに選択された都道府県データの配列を渡す
    onChange: (selectedPrefectures: PrefectureData[]) => void;
    // 選択された都道府県データの配列
    selectedPrefectures: PrefectureData[];
};

export const PrefectureCheckBoxList = ({
    onChange,
    selectedPrefectures,
}: PrefectureCheckBoxListProps) => {
    // 都道府県名データを監視
    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);

    // prefCode と 都道府県名のデータを取得
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPrefectures();
                setPrefectures(data.result);
            } catch (error) {
                console.error(`${error}: 都道府県データの取得時にエラーが発生しました。`);
            }
        };
        fetchData();
    }, []);

    // チェックボックスの選択状態を更新する関数
    const handleChange = (prefecture: PrefectureData, checked: boolean) => {
        // 選択された都道府県データを更新
        // 順序は今回必要ではないため、Set オブジェクトで選択した都道府県データを管理
        const newSelected = new Set(selectedPrefectures);

        if (checked) {
            newSelected.add(prefecture);
        } else {
            newSelected.delete(prefecture);
        }

        // 選択された都道府県データの配列を渡す
        onChange(Array.from(newSelected));
    };

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4'>
            {prefectures.map((prefecture) => (
                <CommonCheckBox
                    key={prefecture.prefCode}
                    id={prefecture.prefCode}
                    label={prefecture.prefName}
                    checked={selectedPrefectures.includes(prefecture)}
                    onChange={(checked) => handleChange(prefecture, checked)}
                />
            ))}
        </div>
    );
};
