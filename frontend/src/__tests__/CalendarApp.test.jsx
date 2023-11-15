import CalendarApp from '../pages/app/CalendarApp';
import { render, screen } from '@testing-library/react';

test("New Event Button should be rendered", () => {
    render(<CalendarApp />);
    const message = screen.queryByText(/Enter New Event/i);
    expect(message).toBeVisible();
})

test("Edit Event Button should be rendered", () => {
    render(<CalendarApp />);
    const message = screen.queryByText(/Edit Events/i);
    expect(message).toBeVisible();
})

test("Event List should be rendered", () => {
    render(<CalendarApp />);
    const message = screen.queryByText(/Event List/i);
    expect(message).toBeVisible();
})