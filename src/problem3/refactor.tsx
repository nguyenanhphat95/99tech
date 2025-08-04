/**
 * Issues in the Code
 * 1. Incorrect variable name in the filtering  Logic
 * Issue: 
 * - The `balancePriority` has incorrect
 * Solution:
 * - Instead of `balancePriority`, use `lhsPriority`.
 *
 * 2. Incorrect use of `useMemo` for sorting
 * Issue:
 * - In the `useMemo` hook, the `prices` array is included in the dependency array although it is not used in the computation.
 * Solution:
 * - Remove `prices` from the dependency array since it is not used in the sorting logic
 * 
 * 3. Using key as index
 * Issue:
 * - Using the index as a key in the `WalletRow` component is an anti-pattern in React that can lead to issues with rendering and reconciliation.
 * Solution:
 * - Instead, a unique identifier from the data (e.g., `balance.currency`) should be used as the key.
 *
 * 5. Duplicate declaration of Props
 * Issue:
 * - The `Props` type is declared twice, which can lead to confusion
 * Solution:
 * - Remove the duplicate declaration and ensure that the `Props` type is defined only once.
 * 
 * 6. Repeated map for `formattedBalances` and it is not used
 * Issue:
 * - The `formattedBalances` array is created but never used in the component.
 * Solution:
 * - Remove the `formattedBalances` map if it is not needed and compute the formatted amount directly in the `rows` map.
 * 
 * 7. Type Safety Issue (blockchain field missing in WalletBalance)
 * Issue:
 * - The `blockchain` field is missing in the `WalletBalance` interface, which can lead to type safety issues.
 * Solution:
 * - Add the `blockchain` field to the `WalletBalance` interface.
 *
 * 8. Improve the getPriority function's logic
 * Issue:
 * - The `getPriority` function uses hardcoded values for each blockchain, making it inflexible and difficult to maintain.
 * Solution:
 * - Refactor the `getPriority` function to use a mapping object for better maintainability.
 * 
 * 9. Magic Number Usage
 * Issue:
 * - It uses magic numbers for blockchain priorities, which can make the code less readable and maintainable.
 * Solution:
 * - Use a mapping object to define blockchain priorities, making it easier to understand and modify.
 */

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add blockchain field
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
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
