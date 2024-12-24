import type React from 'react';

// prefectureData 型でまとめてもよいが、チェックボックスコンポーネントの汎用性が下がるため、IDとラベルを別々に定義
type CommonCheckBoxProps = {
    id: number; // prefCode, 都道府県ごとに一意
    label: string; // ラベル
    checked: boolean; // チェック状態 (true: チェック済み, false: 未チェック)
    onChange: (checked: boolean) => void; // チェックの状態を変更する関数
};

export const CommonCheckBox: React.FC<CommonCheckBoxProps> = ({
    id,
    label,
    checked,
    onChange,
}: CommonCheckBoxProps) => {
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
