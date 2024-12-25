'use client';

import type React from 'react';

type DropdownOption = {
    value: number; // 値
    label: string; // ラベル
};

type CommonDropdownProps = {
    label: string; // ラベル
    options: DropdownOption[]; // 選択肢の配列
    onChange: (selectedOption: number) => void; // 選択肢が変更された場合に呼び出される関数
};

export const CommonDropdown: React.FC<CommonDropdownProps> = ({
    label,
    options,
    onChange,
}: CommonDropdownProps) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <select id={label} onChange={(e) => onChange(Number(e.target.value))}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
