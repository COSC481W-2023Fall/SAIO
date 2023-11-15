import EditAccount from '../EditAccount'
import {render,screen} from '@testing-library/react'

test("should have hello world", () => {
    render(<EditAccount />);
    const message = screen.queryByText(/Edit/i);
    expect(message).toBeVisible();
})