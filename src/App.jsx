
import './App.css'

import { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'EDIT_TODO':
      return {
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.text,
            };
          }
          return todo;
        }),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoText, setTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: todoText.trim(),
      };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setTodoText('');
    }
  };

  const handleRemoveTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleEdit = todo => {
    setEditTodoId(todo.id);
    setTodoText(todo.text);
  };

  const handleSaveEdit = () => {
    if (todoText.trim() !== '') {
      dispatch({ type: 'EDIT_TODO', payload: { id: editTodoId, text: todoText.trim() } });
      setEditTodoId('');
      setTodoText('');
    }
  };

  return (
    <div>
      <h1>Todo</h1>
      <input
        type="text"
        value={todoText}
        placeholder='Write your todo'
        onChange={e => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {state.todos.map(todo => (
        <table key={todo.id}>
        <tr>
          <td>
          {editTodoId === todo.id ? (
            <>
              <input
                type="text"
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </>
          ) : (
            <>
              {todo.text}
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
            </>
          )}
          </td>
        </tr>
        </table>
      ))}
    </div>
  );
};

export default TodoList;
