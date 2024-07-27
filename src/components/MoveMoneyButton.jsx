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
        ((type === 'request' || type === 'pay') && (!loan || balance < loan)) ||
        (type === 'open' && isActive) ||
        (type === 'withdraw' && balance < 50) ||
        (type === 'close' && balance > 0) ||
        loan > 0
      }>
      {children}
    </button>
  );
}

export default MoveMoneyButton;
