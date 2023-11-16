import TodoList from '../components/todo/TodoList';
import TodoItems from '../components/todo/TodoItems';
import Todo from '../pages/app/Todo';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Todo />);
    const message = screen.queryByText(/Task for today/i);
    expect(message).toBeVisible();
})

test("New Event Button should be rendered", () => {
    render(<TodoList />);
    const message = screen.queryByText(/Add Todo/i);
    expect(message).toBeVisible();
})

