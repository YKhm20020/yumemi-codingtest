'use client';

import type React from 'react';

type CommonDropDownProps = {
    label: string; // ラベル
    options: string[]; // 選択肢の配列
    onChange: (selectedOption: string) => void; // 選択肢が変更された場合に呼び出される関数
};

export const CommonDropDown: React.FC<CommonDropDownProps> = ({
    label,
    options,
    onChange,
}: CommonDropDownProps) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <select id={label} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
