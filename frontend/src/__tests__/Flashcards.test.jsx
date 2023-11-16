import FlashcardM from '../pages/app/FlashcardManagment';
import FlashcardD from '../pages/app/DisplayFlashcards';
import {render,screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'

test("show study flashcards", () => {
    render( <BrowserRouter>
        <FlashcardM />
      </BrowserRouter>);
    const message = screen.queryByText(/Study Flashcards/i);
    expect(message).toBeVisible();
})

test("show manage flashcards", () => {
    render( <BrowserRouter>
        <FlashcardD />
      </BrowserRouter>);
    const message = screen.queryByText(/Manage Flashcards/i);
    expect(message).toBeVisible();
})