/*Created with the Help of Brian Degins video and recourses
    YouTube Channel : https://www.youtube.com/@briandesign
    Video: https://www.youtube.com/watch?v=E1E08i2UJGI&list=LL&index=3
*/

import TodoList from '../../components/todo/TodoList'

import ThemeButton from '../../components/ThemeButton';

// import '../../style/TodoApp.css'

export default function Todo() {
    return (
        <main id="main" className="primaryBackground relative h-full w-full flex ">
            <div className='todo-app'>
                <TodoList />
            </div>
        </main>
    )
}