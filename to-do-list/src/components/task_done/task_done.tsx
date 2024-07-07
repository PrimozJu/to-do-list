import React from 'react';
import { Tile } from '@carbon/react';
import './task_done.css';

type TaskDoneProps = {
  todos_completed: number;
  total_todos: number;
};

const TaskDone = ({ todos_completed, total_todos }: TaskDoneProps) => {
  return (
    <Tile className="task-done-tile">
      <div className="task-done-content">
        <div className="task-done-text">
          <p className="task-done-title">Task Done</p>
          <p className="task-done-subtitle">Keep it up G</p>
        </div>
        <div className="task-done-count">
          <p>{todos_completed}/{total_todos}</p>
        </div>
      </div>
    </Tile>
  );
}

export default TaskDone;
