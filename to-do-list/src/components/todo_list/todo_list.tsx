import React, { useState, useEffect, useRef } from 'react';
import { Tile, Checkbox, Button, TextInput } from '@carbon/react';
import { TrashCan , Edit  } from '@carbon/icons-react';
import { Todo } from '../../interfaces/common';
import './todo_list.css';


type TODOListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type ItemProps = {
  item: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TODOList({ todos, setTodos }: TODOListProps) {
  return (
    <div className="todo_list">
      {todos && todos.length > 0 ? (
        todos.map((item, index) => (
          <Item key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>The list is empty</p>
      )}
    </div>
  );
}

const Item = ({ item, todos, setTodos }: ItemProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );

    const updatedTodos = JSON.stringify(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
    localStorage.setItem('todos', updatedTodos);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem('todos', updatedTodos);

    setEditing(false);
  };

  const handleInputBlur = () => {
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem('todos', updatedTodos);

    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));

    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem('todos', updatedTodos);
  };

  return (
    <Tile className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <TextInput
            ref={inputRef}
            id={`edit-todo-${item.id}`}
            labelText=""
            defaultValue={item.title}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
        </form>
      ) : (
        <div className="todo_content">
          <Checkbox
            id={`complete-todo-${item.id}`}
            checked={item.is_completed}
            onChange={completeTodo}
            labelText=""
          />
          <p style={item.is_completed ? { textDecoration: 'line-through' } : {}}>
            {item.title}
          </p>
          <div className="todo_actions">
            <Button
              kind="ghost"
              hasIconOnly
              renderIcon={Edit}
              iconDescription="Edit"
              onClick={handleEdit}
            />
            <Button
              kind="ghost"
              hasIconOnly
              renderIcon={TrashCan}
              iconDescription="Delete"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </Tile>
  );
}

export default TODOList;
