'use client';

import { CommonCheckBox } from '@/components/CheckBox/CommonCheckBox';
import type { PrefectureData } from '@/types/population/populationData';
import { fetchPrefectures } from '@/utils/population/fetchPrefectures';
import { useEffect, useState } from 'react';

type CheckBoxListProps = {
    // チェック状態が変更された場合に呼び出される関数
    // 親コンポーネントに選択された都道府県データの配列を渡す
    onChange: (selectedPrefectures: PrefectureData[]) => void;
    // 選択された都道府県データの配列
    selectedPrefectures: PrefectureData[];
};

export const CheckBoxList = ({ onChange, selectedPrefectures }: CheckBoxListProps) => {
    // TODO: 変数名が都道府県関連に依存しているので、汎用的なコンポーネントにするため、チェックボックスリストとグラフをまとめたコンポーネント実装時に変数名を変更。
    // チェックボックスリスト作成時点では詳細な設計が思いつかなかったため、都道府県に関連した変数名をそのまま使用している。

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
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4'>
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
