import React, { useState, useEffect } from 'react';
import Form from '../components/form/form';
import TaskDone from '../components/task_done/task_done';
import TodoList from '../components/todo_list/todo_list';
import { Grid, Column } from '@carbon/react';
import { Todo } from '../interfaces/common';
import './home.css';

  
export const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
  
    useEffect(() => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }, []);
  
    const todos_completed = todos.filter((todo) => todo.is_completed === true).length;
    const total_todos = todos.length;
  
    return (
        <div className="wrapper">
        <h1>Todo List</h1>
        <Grid>
          <Column sm={4} md={8} lg={12}>
            <Form todos={todos} setTodos={setTodos} />
          </Column>
          <Column sm={4} md={8} lg={12}>
            <TodoList todos={todos} setTodos={setTodos} />
          </Column>
          <Column sm={4} md={8} lg={12}>
            <TaskDone todos_completed={todos_completed} total_todos={total_todos} />
          </Column>
        </Grid>
      </div>
    );
  }
  
export default Home;