import { CommonDropdown } from '@/components/Dropdown/CommonDropdown';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('CommonDropdown', () => {
    // モックデータ
    const options = [
        { value: 0, label: 'ラベル0' },
        { value: 1, label: 'ラベル1' },
        { value: 2, label: 'ラベル2' },
        { value: 3, label: 'ラベル3' },
        { value: 4, label: 'ラベル4' },
    ];

    const handleChange = vi.fn();

    // テストごとにレンダリング
    beforeEach(() => {
        render(
            <CommonDropdown
                dropdownLabel='ドロップダウン'
                options={options}
                onChange={handleChange}
            />,
        );
    });

    // テストごとにレンダリングをクリア
    afterEach(() => {
        cleanup();
    });

    it('ドロップダウンが正しく表示される', () => {
        // ドロップダウンラベルの確認
        expect(screen.getByLabelText('ドロップダウン')).toBeInTheDocument();

        // オプションの確認
        for (const option of options) {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        }
    });

    it('選択肢は全部で5つである', () => {
        expect(screen.getAllByRole('option')).toHaveLength(5);
    });

    it('クリック時に onChange が正しく呼ばれる', () => {
        const dropdownElement = screen.getByRole('combobox');
        fireEvent.change(dropdownElement, { target: { value: options[0].value } });
        expect(handleChange).toHaveBeenCalledWith(options[0].value);
    });
});
