import { CommonCheckBox } from '@/components/CheckBox/CommonCheckBox';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('CommonCheckBox', () => {
    // テストごとにレンダリングをクリア
    afterEach(() => {
        cleanup();
    });

    it('チェックボックスがチェックされている', () => {
        render(<CommonCheckBox id={1} label='Test Label' checked={true} onChange={() => {}} />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).toBeChecked();
    });

    it('クリック時にonChangeが正しく呼ばれる', () => {
        const handleChange = vi.fn();
        render(
            <CommonCheckBox id={1} label='Test Label' checked={false} onChange={handleChange} />,
        );
        const checkboxElement = screen.getByRole('checkbox');
        fireEvent.click(checkboxElement);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('ラベルが正しく表示される', () => {
        render(<CommonCheckBox id={1} label='Test Label' checked={false} onChange={() => {}} />);
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });
});
