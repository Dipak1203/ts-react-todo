import { ChangeEvent, FC, useState } from "react";
import {InterfaceTask} from './Interfaces'
import Show from "./components/Show";
const App: FC = () => {
  const [task,setTask] = useState<string>("");
  const [deadline,setDeadline] = useState<number>(0);
  const [todo,setTodo] = useState<InterfaceTask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>):void =>{
    if(e.target.name === "task"){
      setTask(e.target.value)
    }else{
      setDeadline(Number(e.target.value))
    }
  }

  const addTask = ():void =>{

    const newTask = {taskName:task,taskDeadline:deadline};

    setTodo([...todo,newTask]);
    setTask("");
    setDeadline(0)
    console.log(todo)
  }

  const completeTask = (taskDlt:string): void =>{
    setTodo([...todo.filter((task) =>{
      return task.taskName != taskDlt
    })])
  }
  return (
    <div className="App">
      <div className="header">
        <div>
          <input type="text" name="task" value={task} placeholder="add todo" onChange={handleChange}/>
          <input type="number" name="deadline" value={deadline} placeholder="deadline" onChange={handleChange}/>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div> 
        {
          todo.map((task: InterfaceTask, key: number) =>{
            return ( <Show key={key} task={task} completeTask={completeTask}/>)
          })
        }
      </div>
    </div>
  );
};

export default App;
