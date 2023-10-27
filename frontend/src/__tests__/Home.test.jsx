import Home from '../components/pages/Home.jsx';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Home />);
    const message = screen.queryByText(/Home/i);
    expect(message).toBeVisible();
})