import Sidebar from "../../components/sidebar/Sidebar"
import DisplayFlashcards from "../../components/flashcards/DisplayFlashcards"


export default function flashcard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className='create-flashcards'>
                <DisplayFlashcards />
            </div >
        </div>
    )
}