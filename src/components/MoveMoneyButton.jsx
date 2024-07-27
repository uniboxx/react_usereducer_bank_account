function MoveMoneyButton({
  dispatch,
  isActive,
  type,
  loan,
  balance,
  children,
}) {
  return (
    <button
      onClick={() => dispatch({ type })}
      disabled={
        (!isActive && type !== 'openAccount') ||
        (type === 'openAccount' && isActive) ||
        (type === 'withdraw' && balance < 50) ||
        (type === 'requestLoan' && loan) ||
        (type === 'payLoan' && (balance < loan || !loan)) ||
        (type === 'closeAccount' && (balance > 0 || loan > 0))
      }>
      {children}
    </button>
  );
}

export default MoveMoneyButton;
