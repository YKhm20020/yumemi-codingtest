'use client';

import { PopulationChart } from '@/components/Graph/PopulationGraph';
import { CheckBoxList } from '@/components/List/CheckBoxList';
import { useState } from 'react';

export const PopulationDashboard = () => {
    const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([]);

    // CheckBoxList から選択された都道府県コードを受け取る
    const handlePrefCodeChange = (prefCodes: string[]) => {
        setSelectedPrefCodes(prefCodes);
    };

    return (
        <div>
            <CheckBoxList onChange={handlePrefCodeChange} />
            <PopulationChart prefCodes={selectedPrefCodes} dataType={1} />
        </div>
    );
};
