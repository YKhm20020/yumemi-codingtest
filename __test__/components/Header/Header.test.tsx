import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '@/components/Header/Header';
import '@testing-library/jest-dom/vitest';

describe('Header', () => {
    it('タイトルが正しく表示される', () => {
        const title = 'テストタイトル';
        render(<Header title={title} />);
        const headerElement = screen.getByText(title);
        expect(headerElement).toBeInTheDocument();
    });
});
