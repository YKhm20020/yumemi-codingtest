import { CommonDropdown } from '@/components/Dropdown/CommonDropdown';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPopulationType } from '../../mocks/population/populationType';
import '@testing-library/jest-dom/vitest';

describe('CommonDropdown', () => {
    // 人口種別モックデータの読み込み
    const options = mockPopulationType;

    // ドロップダウンメニューのレンダリング
    const content = render(
        <CommonDropdown dropdownLabel='ドロップダウン' options={options} onChange={() => {}} />,
    );

    it('ドロップダウンが正しく表示される', () => {
        // ドロップダウンラベルの確認
        expect(content.getByLabelText('ドロップダウン')).toBeInTheDocument();

        // オプションの確認
        for (const option of options) {
            expect(content.getByText(option.label)).toBeInTheDocument();
        }
    });

    it('選択肢は全部で4つである', () => {
        expect(content.getAllByRole('option')).toHaveLength(4);
    });
});
