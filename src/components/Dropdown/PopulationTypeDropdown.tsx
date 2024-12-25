import { PopulationTypeLabels } from '@/types/population/populationType';
import { CommonDropdown } from './CommonDropdown';

// 人口種別のオプションを作成
const populationOptions = Object.entries(PopulationTypeLabels).map(([value, label]) => ({
    value: Number(value),
    label,
}));

type PopulationTypeDropdownProps = {
    onChange: (value: number) => void;
};

export const PopulationTypeDropdown = ({ onChange }: PopulationTypeDropdownProps) => {
    return (
        <CommonDropdown dropdownLabel='人口種別' options={populationOptions} onChange={onChange} />
    );
};
