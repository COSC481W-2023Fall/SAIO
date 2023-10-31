import Todo from '../pages/app/Todo';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Todo />);
    const message = screen.queryByText(/Task for today/i);
    expect(message).toBeVisible();
})