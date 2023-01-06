import './App.css';
import { TaskType, Todolist } from './components/Todolist';



const tasks1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
]
const tasks2: Array<TaskType> = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
]

function App() {
    return (
        <div className="App">
            <Todolist title={"What to learn 1"} tasks={tasks1} />
            <Todolist title={"What to learn 2"} tasks={tasks2} />
        </div>
    );
}

export default App;
