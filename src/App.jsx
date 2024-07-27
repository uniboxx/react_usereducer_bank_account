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
const [openAmount, depositAmount, withDrawAmount, loanAmount] = [
  500, 150, 50, 5000,
];

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;
  switch (action.type) {
    case 'openAccount':
      return { ...state, isActive: true, balance: openAmount };
    case 'deposit':
      return { ...state, balance: state.balance + depositAmount };
    case 'withdraw':
      if (balance < withDrawAmount) return state;
      return { ...state, balance: state.balance - withDrawAmount };
    case 'requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + loanAmount,
        loan: loanAmount,
      };
    case 'payLoan':
      if (state.balance < state.loan) return state;
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;
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

        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='openAccount'>
          Open account
        </MoveMoneyButton>
        <MoveMoneyButton dispatch={dispatch} isActive={isActive} type='deposit'>
          Deposit {depositAmount}
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='withdraw'
          balance={balance}>
          Withdraw {withDrawAmount}
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='requestLoan'
          loan={loan}
          balance={balance}>
          Rquest a loan of {loanAmount}
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='payLoan'
          loan={loan}
          balance={balance}>
          Pay loan
        </MoveMoneyButton>
        <MoveMoneyButton
          dispatch={dispatch}
          isActive={isActive}
          type='closeAccount'
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
