import { CommonDropdown } from '@/components/Dropdown/CommonDropdown';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockPopulationType } from '../../mocks/population/populationType';
import '@testing-library/jest-dom/vitest';

describe('CommonDropdown', () => {
    // 人口種別モックデータの読み込み
    const options = mockPopulationType;

    // テストごとにレンダリング
    beforeEach(() => {
        render(
            <CommonDropdown dropdownLabel='ドロップダウン' options={options} onChange={() => {}} />,
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

    it('選択肢は全部で4つである', () => {
        expect(screen.getAllByRole('option')).toHaveLength(4);
    });
});
