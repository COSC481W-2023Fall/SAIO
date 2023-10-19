import Sidebar from "../sidebar/Sidebar"
import './TodoComponets/TodoApp.css'
import TodoList from './TodoComponets/TodoList'
/*Created with the Help of Brian Degins video and recourses
    YouTube Channel : https://www.youtube.com/@briandesign
    Video: https://www.youtube.com/watch?v=E1E08i2UJGI&list=LL&index=3
    */
export default function Todo() {
    return (
        <div>
            <Sidebar />
            <div className='todo-app'>
                <TodoList />
            </div >
        </div>
    )
}