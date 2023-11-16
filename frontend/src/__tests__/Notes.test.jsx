import Notes from '../pages/app/Notes.jsx';
import {render,screen} from '@testing-library/react';

test("Save Notes Button Should Be Rendered,", () => {
    render(<Notes />);
    const message = screen.queryByText(/Save/i); // add new adjacent
    expect(message).toBeVisible();
})

test("Add Adjacent Notes Button Should Be Rendered.", () => {
    render(<Notes />);
    const message = screen.queryByText(/\+/i); // add new adjacent
    expect(message).toBeVisible();
})