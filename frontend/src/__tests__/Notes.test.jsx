import Notes from '../pages/app/Notes.jsx';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Notes />);
    const message = screen.queryByText(/Note Taking Page/i);
    expect(message).toBeVisible();
})