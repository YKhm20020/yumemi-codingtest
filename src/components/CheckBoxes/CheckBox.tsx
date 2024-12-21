'use client';

import type React from 'react';
import { useState } from 'react';

type CheckBoxProps = {
    label: string; // ラベル、都道府県名を表示
};

export const CheckBox: React.FC<CheckBoxProps> = ({ label }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const inputId = `checkbox-${label}`;

    return (
        <div className='flex items-center'>
            <input
                type='checkbox'
                id={inputId}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <label htmlFor={inputId} className='ml-2'>
                {label}
            </label>
        </div>
    );
};
