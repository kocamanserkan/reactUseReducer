import { useReducer } from "react";
import "./styles.css";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAcc":
      return { ...state, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withDraw":
      return { ...state, balance: state.balance - action.payload };
    case "loan":
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case "closeAcc":
      return {
        ...state,
        isActive: false,
      };
    default:
      throw new Error("Act is unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const hasLoan = loan > 0;
  const hasMoney = balance > 0;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAcc" });
          }}
          disabled={false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withDraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={({}) => {
            dispatch({ type: "loan", payload: 5000 });
          }}
          disabled={hasLoan || !isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!hasLoan || !isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAcc" });
          }}
          disabled={hasMoney || !isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
