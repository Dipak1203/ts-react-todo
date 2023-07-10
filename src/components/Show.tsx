import { InterfaceTask } from "../Interfaces";
import { Button } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
interface Props {
  task: InterfaceTask;
  completeTask(taskDlt: string): void;
}
const Show = ({ task, completeTask }: Props) => {
  return (
    <div className="list">
      <div>
        <h2>
          <Tooltip label={task.taskDeadline} aria-label="A tooltip">
            {task.taskName}
          </Tooltip>
        </h2>
      </div>
      <Button
        className="btn"
        colorScheme="red"
        size="md"
        onClick={() => completeTask(task.taskName)}
      >
        X
      </Button>
    </div>
  );
};

export default Show;
