'use client';

import { CommonDropDown } from '@/components/DropDown/CommonDropDown';
import { PopulationGraph } from '@/components/Graph/PopulationGraph';
import { CheckBoxList } from '@/components/List/CheckBoxList';
import type { PrefectureData } from '@/types/population';
import { PopulationTypeLabels, PopulationTypes } from '@/types/population/populationType';
import { useState } from 'react';

export const PopulationDashboard = () => {
    // 選択された都道府県データの配列を監視
    const [selectedPrefectures, setSelectedPrefectures] = useState<PrefectureData[]>([]);
    const [populationType, setPopulationType] = useState<number>(PopulationTypes.TOTAL);

    // 人口種別のオプションを作成
    const populationOptions = Object.entries(PopulationTypeLabels).map(([value, label]) => ({
        value: Number(value),
        label,
    }));

    // CheckBoxList から選択された都道府県コードを受け取る
    const handlePrefectureChange = (prefectureData: PrefectureData[]) => {
        setSelectedPrefectures(prefectureData);
    };

    // 人口種別の選択が変更された場合に呼び出される関数
    const handlePopulationTypeChange = (value: string | number) => {
        setPopulationType(Number(value));
    };

    return (
        <div>
            <CommonDropDown
                label='人口種別'
                options={populationOptions}
                onChange={handlePopulationTypeChange}
            />
            <CheckBoxList onChange={handlePrefectureChange} />
            <PopulationGraph prefectureData={selectedPrefectures} dataType={populationType} />
        </div>
    );
};
