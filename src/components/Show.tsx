import { InterfaceTask } from "../Interfaces"

interface Props{
    task: InterfaceTask;
    completeTask(taskDlt:string): void;
}
const Show = ({task,completeTask}: Props) => {

  return (
    <div>
        <h2>{task.taskName}</h2>
        <h2>{task.taskDeadline}</h2>
        <button onClick={() => completeTask(task.taskName)}>Remove</button>
    </div>
  )
}

export default Show