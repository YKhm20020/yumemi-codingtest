'use client';

import { PopulationChart } from '@/components/Graph/PopulationGraph';
import { CheckBoxList } from '@/components/List/CheckBoxList';
import type { PrefectureData } from '@/types/population';
import { useState } from 'react';
export const PopulationDashboard = () => {
    // 選択された都道府県データの配列を監視
    const [selectedPrefectures, setSelectedPrefectures] = useState<PrefectureData[]>([]);

    // CheckBoxList から選択された都道府県コードを受け取る
    const handlePrefectureChange = (prefectureData: PrefectureData[]) => {
        setSelectedPrefectures(prefectureData);
    };

    return (
        <div>
            <CheckBoxList onChange={handlePrefectureChange} />
            <PopulationChart prefectureData={selectedPrefectures} dataType={1} />
        </div>
    );
};
