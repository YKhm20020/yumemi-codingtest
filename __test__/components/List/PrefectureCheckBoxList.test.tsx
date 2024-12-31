import { PrefectureCheckBoxList } from '@/components/List/PrefectureCheckBoxList';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockPrefectureData } from '../../mocks/prefecture/prefectureData';
import '@testing-library/jest-dom/vitest';

// fetchPrefectures関数をモック化
vi.mock('@/utils/prefecture/fetchPrefectures', () => ({
    fetchPrefectures: vi.fn(() => Promise.resolve({ result: mockPrefectureData })),
}));

describe('PrefectureCheckBoxList', () => {
    afterEach(() => {
        cleanup();
    });

    it('チェックボックスが正しくレンダリングされる', async () => {
        render(<PrefectureCheckBoxList selectedPrefectures={[]} onChange={() => {}} />);

        // 非同期処理の完了を待ち、チェックボックスが正しくレンダリングされていることを確認
        for (const prefecture of mockPrefectureData) {
            expect(await screen.findByLabelText(prefecture.prefName)).toBeInTheDocument();
        }
    });

    it('チェックボックスの選択状態が変更されるとonChangeが呼ばれる', async () => {
        const handleChange = vi.fn();
        render(<PrefectureCheckBoxList selectedPrefectures={[]} onChange={handleChange} />);

        const checkbox = await screen.findByLabelText(mockPrefectureData[0].prefName);
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith([mockPrefectureData[0]]);
    });
});
