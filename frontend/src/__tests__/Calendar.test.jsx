import Calendar from '../pages/app/Calendar';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Calendar />);
    const message = screen.queryByText(/Calendar/i);
    expect(message).toBeVisible();
})