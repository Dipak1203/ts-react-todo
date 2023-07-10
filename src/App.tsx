import { ChangeEvent, FC, useEffect, useState } from "react";
import { InterfaceTask } from "./Interfaces";
import Show from "./components/Show";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import './App.css'
interface FormValues {
  task: string;
  deadline: string;
}

const App: FC = () => {
  const [todo, setTodo] = useState<InterfaceTask[]>([]);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const addTask = handleSubmit((data: FormValues) => {
    if (!data.task) {
      toast({
        title: "Please fill the add task",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (!data.deadline) {
      toast({
        title: "Please fill the deadline",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const newTask: InterfaceTask = { taskName: data.task, taskDeadline: data.deadline };
    setTodo([...todo, newTask]);
    reset(); // Reset the form fields
  });

  const completeTask = (taskDlt: string): void => {
    setTodo([...todo.filter((task) => task.taskName !== taskDlt)]);
  };

  useEffect(() => {
    const storedTodo = localStorage.getItem("todo");
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="App">
      <div className="header">
        <div>
          <Heading>CliffByte Todo List</Heading>
          <form onSubmit={addTask}>
            <Input
              type="text"
              // name="task"
              placeholder="add todo"
              className="input"
              size="md"
              {...register("task", { required: true })}
            />
            {errors.task && (
              <span className="error">Task field is required.</span>
            )}
            <Input
              // name="deadline"
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              className="input"
              {...register("deadline", { required: true })}
            />
            {errors.deadline && (
              <span className="error">Deadline field is required.</span>
            )}
            <Button type="submit" colorScheme="teal" size="lg">
              Add Task
            </Button>
          </form>
        </div>
      </div>

      <div className="todo_list">
        <Center className="text">My Task</Center>
        {todo.map((task: InterfaceTask, key: number) => {
          return <Show key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
