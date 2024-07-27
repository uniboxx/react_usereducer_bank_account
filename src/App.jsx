import { useReducer } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import MoveMoneyButton from './components/MoveMoneyButton';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...initialState };
    case 'open':
      return { ...state, isActive: true, balance: 500 };
    case 'deposit':
      return { ...state, balance: state.balance + 150 };
    case 'withdraw':
      return { ...state, balance: state.balance - 50 };
    case 'request':
      return {
        ...state,
        balance: state.balance + 5000,
        loan: 5000,
      };
    case 'pay':
      return {
        ...state,
        balance: state.balance - 5000,
        loan: 0,
      };
    case 'close':
      return {
        ...state,
        isActive:
          state.balance === 0 && state.loan === 0 ? false : state.isActive,
      };

    default:
      throw new Error('Unknown action!');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, isActive } = state;

  return (
    <div>
      <Header>
        <h1>useReducer Bank Account</h1>
      </Header>
      <Main>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>

        <MoveMoneyButton dispatch={dispatch} isActive={isActive} type='open'>
          Open account
        </MoveMoneyButton>
        <MoveMoneyButton dispatch={dispatch} isActive={isActive} type='deposit'>
          Deposit 150
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='withdraw'
          balance={balance}>
          Withdraw 50
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='request'
          loan={!loan}>
          Rquest a loan of 5000
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='pay'
          loan={loan}
          balance={balance}>
          Pay loan
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='close'
          balance={balance}
          loan={loan}>
          Close account <small>(only if values = 0)</small>
        </MoveMoneyButton>
      </Main>
      <Footer>
        <p>by unibox</p>
        <p>
          <a href='https://t.me/unibox' target='_blank'>
            <i class='fa-brands fa-telegram'></i>
          </a>
        </p>
      </Footer>
    </div>
  );
}

export default App;
