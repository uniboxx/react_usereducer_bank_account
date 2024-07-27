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
        (!isActive && type !== 'open') ||
        (type === 'open' && isActive) ||
        (type === 'withdraw' && balance < 50) ||
        (type === 'request' && loan) ||
        (type === 'pay' && (balance < loan || !loan)) ||
        (type === 'close' && (balance > 0 || loan > 0))
      }>
      {children}
    </button>
  );
}

export default MoveMoneyButton;
