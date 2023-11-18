import Sidebar from "../../components/sidebar/Sidebar"
import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function flashcard() {
    return (
        <div className="flex primaryBackground">
            <Sidebar />
            <div className='create-flashcards'>
                <DisplayFlashcards />
            </div>
            <ThemeButton />
        </div>
    )
}