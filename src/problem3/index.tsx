interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add blockchain field
}

interface Props extends BoxProps {}

const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
}; // Define blockchain priorities in a mapping object

// Using only one Props interface declaration, no need FC<Props>
const WalletPage: React = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Use a mapping object for blockchain priorities
  const getPriority = (blockchain: string): number => {
    return blockchainPriority[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0; // Filter out balances with priority -99 or less and non-positive amounts
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
      const aPriority = getPriority(a.blockchain);
      const bPriority = getPriority(b.blockchain);
      return bPriority - aPriority; // Sort by priority in descending order
      });
  }, [balances]); // Remove prices from dependency array

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formattedAmount = balance.amount.toFixed();

    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Use unique identifier as key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
