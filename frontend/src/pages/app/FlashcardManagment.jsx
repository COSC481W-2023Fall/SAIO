import Sidebar from "../../components/sidebar/Sidebar"
import FlashcardManagement from "../../components/flashcards/FlashcardManagment"

export default function flashcard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className='create-flashcards'>
                <FlashcardManagement />
            </div >
        </div>
    )
}