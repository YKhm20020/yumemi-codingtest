'use client';

import { PopulationTypeDropdown } from '@/components/Dropdown/PopulationTypeDropdown';
import { PopulationGraph } from '@/components/Graph/PopulationGraph';
import { PrefectureCheckBoxList } from '@/components/List/PrefectureCheckBoxList';
import { PopulationTypes } from '@/types/population/populationType';
import type { PrefectureData } from '@/types/prefecture/prefectureData';
import { useState } from 'react';

export const PopulationDashboard = () => {
    // 選択された都道府県データの配列を監視
    const [selectedPrefectures, setSelectedPrefectures] = useState<PrefectureData[]>([]);

    // 選択された人口種別をIDで監視
    const [populationType, setPopulationType] = useState<number>(PopulationTypes.TOTAL);

    // CheckBoxList から選択された都道府県コードを受け取る
    const handlePrefectureChange = (prefectureData: PrefectureData[]) => {
        setSelectedPrefectures(prefectureData);
    };

    // 人口種別の選択が変更された場合に呼び出される関数
    const handlePopulationTypeChange = (value: number) => {
        // 人口種別を更新
        setPopulationType(value);

        // チェックボックスの選択状態をリセット
        setSelectedPrefectures([]);
    };

    return (
        <div className='flex flex-col items-center gap-y-8 max-w-screen-md mx-auto'>
            <PopulationTypeDropdown onChange={handlePopulationTypeChange} />
            <PrefectureCheckBoxList
                selectedPrefectures={selectedPrefectures}
                onChange={handlePrefectureChange}
            />
            <PopulationGraph prefectureData={selectedPrefectures} populationType={populationType} />
        </div>
    );
};
