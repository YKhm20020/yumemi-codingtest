'use client';

import type React from 'react';

type DropdownOption = {
    value: number; // 値
    label: string; // ドロップダウンリストで表示するラベル
};

type CommonDropdownProps = {
    dropdownLabel: string; // ドロップダウンリストが何を選択するかを示すラベル
    options: DropdownOption[]; // 選択肢の配列
    onChange: (selectedOption: number) => void; // 選択肢が変更された場合に呼び出される関数
};

export const CommonDropdown: React.FC<CommonDropdownProps> = ({
    dropdownLabel,
    options,
    onChange,
}: CommonDropdownProps) => {
    return (
        <div>
            <label htmlFor={dropdownLabel}>{dropdownLabel}</label>
            <select id={dropdownLabel} onChange={(e) => onChange(Number(e.target.value))}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};