import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function flashcard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className='create-flashcards primaryBackground'>
                <DisplayFlashcards />
            </div >
            <ThemeButton />
        </div>
    )
}