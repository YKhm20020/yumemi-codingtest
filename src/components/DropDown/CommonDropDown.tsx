'use client';

import type React from 'react';

type DropDownOption = {
    value: number; // 値
    label: string; // ラベル
};

type CommonDropDownProps = {
    label: string; // ラベル
    options: DropDownOption[]; // 選択肢の配列
    onChange: (selectedOption: number) => void; // 選択肢が変更された場合に呼び出される関数
};

export const CommonDropDown: React.FC<CommonDropDownProps> = ({
    label,
    options,
    onChange,
}: CommonDropDownProps) => {
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
