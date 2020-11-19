import './Index.css'
import React, { useReducer, useContext, useEffect, useRef } from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'reset': {
      return action.payload;
    }
    case 'add': {
      return [
        ...state,
        {
          id: Date.now(),
          text: '',
          completed: false,
        },
      ];
    }
    case 'delete': {
      return state.filter(item => item.id !== action.payload);
    }
    case 'completed': {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    }
    default: {
      return state;
    }
  }
}

const Context = React.createContext();

function useEffectOnce(cb) {
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      cb();
      didRun.current = true;
    }
  });
}

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, []);

  useEffectOnce(() => {
    const raw = localStorage.getItem('data');
    dispatch({ type: 'reset', payload: raw ? JSON.parse(raw) : [] });
  });

  useEffect(
    () => {
      localStorage.setItem('data', JSON.stringify(state));
    },
    [state]
  );

  return (
      <div className="Main">
    <Context.Provider value={dispatch}>
      <h1>Tugas Modul 4 Kelompok 33</h1>
      <button className="Button" onClick={() => dispatch({ type: 'add' })}>Buat Daftar Belanjaan Baru</button>
      <br />
      <br />
      <TodosList items={state} />
    </Context.Provider>
      </div>

  );
}

function TodosList({ items }) {
  return items.map(item => <TodoItem key={item.id} {...item} />);
}

function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context);
  return (
    <div>
      <input
        className="inputtextbox"
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: 'completed', payload: id })}/>

      <input className="belanjaan" type="text" defaultValue={text} />
      <button  onClick={() => dispatch({ type: 'delete', payload: id })} className="ButtonDel">
        Delete
      </button>
    </div>
  );
}
