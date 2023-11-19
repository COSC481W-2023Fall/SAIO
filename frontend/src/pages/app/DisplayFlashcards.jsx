import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function flashcard() {
    return (
        <main id="main" className="primaryBackground relative flex h-full w-full">
            <DisplayFlashcards />
        </main>
    )
}