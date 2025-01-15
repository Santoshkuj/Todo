import { useSelector } from "react-redux";

import TodoItem from "./user/TodoItem";

const TodoList = ({viewMode}) => {
  const { todos } = useSelector((state) => state.todo.user);

  const unfinishedTasks = todos.filter((task) => !task.isFinished);
  const finishedTasks = todos.filter((task) => task.isFinished).reverse();
  const {isAuthenticated} = useSelector((state) => state.todo.user);

  return isAuthenticated && (
    <div>
      <div>
        <ul style={{padding:0,display:'flex', flexDirection : viewMode === 'list' ? 'column' : 'row',flexWrap:'wrap'}}>
          {unfinishedTasks.map((task) => (
            <li key={task.id} style={{listStyleType:"none"}}>
              <TodoItem task={task} viewMode={viewMode} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        {finishedTasks.length > 0 &&<> <p style={{ marginLeft: 4 }}>Finished Tasks</p>
        <ul style={{padding:0}}>
          {finishedTasks.map((task) => (
            <li key={task.id} style={{ listStyleType: "none", marginBottom: 1 }}>
              <TodoItem task={task} />
            </li>
          ))}
        </ul> </>}
      </div>
    </div>
  );
};

export default TodoList;
