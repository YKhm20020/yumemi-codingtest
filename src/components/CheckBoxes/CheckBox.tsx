import type React from 'react';

type CheckBoxProps = {
    id: number; // prefCode, 都道府県ごとに一意
    label: string; // ラベル
    checked: boolean; // チェック状態 (true: チェック済み, false: 未チェック)
    onChange: (checked: boolean) => void; // チェックの状態を変更する関数
};

export const CheckBox: React.FC<CheckBoxProps> = ({
    id,
    label,
    checked,
    onChange,
}: CheckBoxProps) => {
    const inputId = `checkbox-${id}`;

    return (
        <div className='flex items-center'>
            <input
                type='checkbox'
                id={inputId}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={inputId} className='ml-2'>
                {label}
            </label>
        </div>
    );
};
