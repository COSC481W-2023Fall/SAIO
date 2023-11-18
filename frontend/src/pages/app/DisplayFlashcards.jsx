import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function flashcard() {
    return (
        <div className="flex w-full primaryBackground">
            <DisplayFlashcards />
            <ThemeButton />
        </div>
    )
}