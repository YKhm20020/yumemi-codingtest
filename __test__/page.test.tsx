import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../src/app/page';

test('ページに「都道府県別人口推移」と書かれたヘッダーが正しく表示されている', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: '都道府県別人口推移' })).toBeDefined();
});
