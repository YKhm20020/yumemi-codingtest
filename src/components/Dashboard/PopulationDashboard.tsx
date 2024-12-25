'use client';

import { PopulationTypeDropdown } from '@/components/Dropdown/PopulationTypeDropdown';
import { PopulationGraph } from '@/components/Graph/PopulationGraph';
import { CheckBoxList } from '@/components/List/CheckBoxList';
import type { PrefectureData } from '@/types/population';
import { PopulationTypeLabels, PopulationTypes } from '@/types/population/populationType';
import { useState } from 'react';

export const PopulationDashboard = () => {
    // 選択された都道府県データの配列を監視
    const [selectedPrefectures, setSelectedPrefectures] = useState<PrefectureData[]>([]);
    const [populationType, setPopulationType] = useState<number>(PopulationTypes.TOTAL);

    // CheckBoxList から選択された都道府県コードを受け取る
    const handlePrefectureChange = (prefectureData: PrefectureData[]) => {
        setSelectedPrefectures(prefectureData);
    };

    // 人口種別の選択が変更された場合に呼び出される関数
    const handlePopulationTypeChange = (value: number) => {
        setPopulationType(value);
    };

    return (
        <div>
            <PopulationTypeDropdown onChange={handlePopulationTypeChange} />
            <CheckBoxList onChange={handlePrefectureChange} />
            <PopulationGraph prefectureData={selectedPrefectures} dataType={populationType} />
        </div>
    );
};
