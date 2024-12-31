import { PopulationGraph } from '@/components/Graph/PopulationGraph';
import { fetchPerYearPopulation } from '@/utils/population/fetchPerYearPopulation';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { mockTotalPopulationData } from '../../mocks/population/populationData';
import { mockPrefectureData } from '../../mocks/prefecture/prefectureData';
import '@testing-library/jest-dom/vitest';

// 人口を取得する関数についてモックを設定
vi.mock('@/utils/population/fetchPerYearPopulation');

describe('PopulationGraph', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetchPerYearPopulation as Mock).mockResolvedValue(mockTotalPopulationData);
    });

    it('初期表示するグラフのタイトルが正しく表示される', async () => {
        render(<PopulationGraph prefectureData={[]} populationType={0} />);
        expect(screen.getByText('都道府県別総人口推移のグラフ')).toBeInTheDocument();
    });

    it('データ取得に失敗した場合はエラーメッセージが表示される', async () => {
        const errorMessage = 'データの取得に失敗しました。';
        (fetchPerYearPopulation as Mock).mockRejectedValue(new Error(errorMessage));

        render(<PopulationGraph prefectureData={mockPrefectureData} populationType={0} />);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('不正な人口種別が指定された場合に正しくエラーメッセージが表示する', () => {
        expect(() => {
            render(<PopulationGraph prefectureData={mockPrefectureData} populationType={4} />);
        }).toThrow('指定した種類のデータ取得には対応していません。');
    });
});
