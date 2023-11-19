import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function flashcard() {
    return (
        <main id="main" className="relative flex w-full primaryBackground">
            <DisplayFlashcards />
        </main>
    )
}