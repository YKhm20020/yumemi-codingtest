import { PopulationTypeDropdown } from '@/components/Dropdown/PopulationTypeDropdown';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPopulationType } from '../../mocks/population/populationType';
import '@testing-library/jest-dom/vitest';

describe('PopulationTypeDropdown', () => {
    // 人口種別モックデータの読み込み
    const mockOptions = mockPopulationType;

    // ドロップダウンメニューのレンダリング
    const content = render(<PopulationTypeDropdown onChange={() => {}} />);

    it('ドロップダウンが正しく表示される', () => {
        // ドロップダウンラベルの確認
        expect(content.getByLabelText('人口種別')).toBeInTheDocument();

        // オプションの確認
        for (const option of mockOptions) {
            expect(content.getByText(option.label)).toBeInTheDocument();
        }
    });

    it('選択肢は全部で4つである', () => {
        expect(content.getAllByRole('option')).toHaveLength(4);
    });
});
