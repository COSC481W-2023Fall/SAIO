import Flashcard from '../pages/app/Flashcards';
import {render,screen} from '@testing-library/react';

test("should have hello world", () => {
    render(<Flashcard />);
    const message = screen.queryByText(/Flash Cards/i);
    expect(message).toBeVisible();
})