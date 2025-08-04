# Code Review Notes & Issues

## 1. Incorrect Variable Name in the Filtering Logic

- **Issue**:
  - In the filter condition if `sortedBalances`, the variable `lhsPriority` is used but is undefined. It should be `balancePriority`
- **Solution**:
  - Update the name

## 2. Incorrect use of `useMemo` for Sorting

- **Issue**:
  - The `prices` array is included in the dependency array of the `useMemo` hook, even though it is not used in the computation.
- **Solution**:
  - Remove `prices` from the dependency array to avoid unnecessary re-renders.

## 3. Using Index as Key in List Rendering

- **Issue**:
  - Using the index as a key in the `WalletRow` component is an anti-pattern in React. This can lead to rendering and reconciliation issues.
- **Solution**:
  - Use a unique identifier from the data (e.g., `balance.currency`) as the key instead.

## 4. Duplicate Declaration of `Props`

- **Issue**:
  - The `Props` type is declared more than once, which can create confusion.
- **Solution**:
  - Remove the duplicate declaration and ensure the `Props` type is defined only once.

## 5. Unused Computation of `formattedBalances`

- **Issue**:
  - The `formattedBalances` array is created but never used.
- **Solution**:
  - Remove the `formattedBalances` or compute the formatted amount directly when mapping over `rows`.

## 6. Missing Type Field in `WalletBalance`

- **Issue**:
  - The `blockchain` field is missing in the `WalletBalance` interface, potentially causing type safety issues.
- **Solution**:
  - Adding the `blockchain` field to the `WalletBalance` interface.

## 7. Hardcoded Logic in `getPriority` Function

- **Issue**:
  - The function uses hardcoded values for blockchain priorities, reducing flexibility and maintainability.
- **Solution**:
  - Refactor `getPriority` to use a mapping object for improved readability and maintainability.

## 8. Magic Number Usage

- **Issue**:
  - Magic numbers are used to define blockchain priorities, reducing clarity.
- **Solution**:
  - Use a constant mapping object for blockchain priorities to make the logic more understandable and maintainable.
