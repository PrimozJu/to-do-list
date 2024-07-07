import React from 'react';
import { Button, TextInput } from '@carbon/react';
import { Todo } from '../../interfaces/common';
import './form.css';

interface FormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Form = ({ todos, setTodos }: FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = (event.target as HTMLFormElement).todo.value;
    const newTodo = {
      title: value,
      id: crypto.randomUUID(),
      is_completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    const updatedTodoList = JSON.stringify([...todos, newTodo]);
    localStorage.setItem("todos", updatedTodoList);

    (event.target as HTMLFormElement).reset();
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo" className="form-label">
        <TextInput
          type="text"
          id="todo"
          name="todo"
          labelText="Write your next task"
          placeholder="Write your next task"
          className="form-input"
        />
      </label>
      <Button type="submit" className="form-button">
        +
      </Button>
    </form>
  );
}

export default Form;

  