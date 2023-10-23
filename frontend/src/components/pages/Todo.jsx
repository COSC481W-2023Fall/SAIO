import Sidebar from "../sidebar/Sidebar"
import './TodoComponents/TodoApp.css'
import TodoList from './TodoComponents/TodoList'
/*Created with the Help of Brian Degins video and recourses
    YouTube Channel : https://www.youtube.com/@briandesign
    Video: https://www.youtube.com/watch?v=E1E08i2UJGI&list=LL&index=3
    */
export default function Todo() {
    return (
        <div className="flex">
            <Sidebar />
            <div className='todo-app'>
                <TodoList />
            </div >
        </div>
    )
}