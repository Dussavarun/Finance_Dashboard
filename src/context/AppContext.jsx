// import { createContext, useContext, useReducer, useEffect } from 'react';
// import { INITIAL_TRANSACTIONS } from '../data/mockData';

// const AppContext = createContext(null);

// const STORAGE_KEY = 'fintrack_state';

// const loadState = () => {
//   try {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) return JSON.parse(saved);
//   } catch {}
//   return null;
// };

// const initialState = loadState() || {
//   transactions: INITIAL_TRANSACTIONS,
//   role: 'viewer',
//   theme: 'dark',
//   filters: {
//     search: '',
//     type: 'all',
//     category: 'all',
//     sort: 'date-desc',
//   },
//   activePage: 'dashboard',
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_ROLE':
//       return { ...state, role: action.payload };
//     case 'SET_PAGE':
//       return { ...state, activePage: action.payload };
//     case 'SET_FILTER':
//       return { ...state, filters: { ...state.filters, ...action.payload } };
//     case 'ADD_TRANSACTION':
//       return { ...state, transactions: [action.payload, ...state.transactions] };
//     case 'EDIT_TRANSACTION':
//       return {
//         ...state,
//         transactions: state.transactions.map(t =>
//           t.id === action.payload.id ? action.payload : t
//         ),
//       };
//     case 'DELETE_TRANSACTION':
//       return {
//         ...state,
//         transactions: state.transactions.filter(t => t.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   }, [state]);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useApp = () => useContext(AppContext);


import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'fintrack_state';

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        activePage: 'dashboard',
      };
    }
  } catch {}
  return null;
};

const initialState = loadState() || {
  transactions: INITIAL_TRANSACTIONS,
  role: 'viewer',
  theme: 'dark',
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sort: 'date-desc',
  },
  activePage: 'dashboard',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_PAGE':
      return { ...state, activePage: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { activePage, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);