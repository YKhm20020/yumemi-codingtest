import { PopulationTypeDropdown } from '@/components/Dropdown/PopulationTypeDropdown';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockPopulationType } from '../../mocks/population/populationType';
import '@testing-library/jest-dom/vitest';

describe('PopulationTypeDropdown', () => {
    // 人口種別モックデータの読み込み
    const mockOptions = mockPopulationType;

    // テストごとにレンダリング
    beforeEach(() => {
        render(<PopulationTypeDropdown onChange={handleChange} />);
    });

    // テストごとにレンダリングをクリア
    afterEach(() => {
        cleanup();
    });

    const handleChange = vi.fn();

    it('ドロップダウンが正しく表示される', () => {
        // ドロップダウンラベル の確認
        expect(screen.getByLabelText('人口種別')).toBeInTheDocument();

        // オプションの確認
        for (const option of mockOptions) {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        }
    });

    it('選択肢は全部で4つである', () => {
        expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('クリック時に onChange が正しく呼ばれる', () => {
        const dropdownElement = screen.getByRole('combobox');
        fireEvent.change(dropdownElement, { target: { value: mockOptions[0].value } });
        expect(handleChange).toHaveBeenCalledWith(mockOptions[0].value);
    });
});
