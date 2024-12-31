import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../src/app/page';

// ページのレンダリング
const page = render(<Page />);

test('ページに「都道府県別人口推移」と書かれたヘッダーが正しく表示されている', () => {
    expect(page.getByRole('heading', { level: 1, name: '都道府県別人口推移' })).toBeDefined();
});
