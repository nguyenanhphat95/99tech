/**
 * Calculates the sum of all integers from 1 to n using a while loop.
 * Time complexity: O(n).
 * Space complexity: O(1).
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
const sum_to_n_a = (n) => {
    let result = 0;
    let i = 1;
    while (i <= n) {
        result += i;
        i++;
    }
    return result;
};

/**
 * Recursively calculates the sum of all integers from 1 to n.
 * Time complexity: O(n).
 * Space complexity: O(n).
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
const sum_to_n_b = (n) =>{
    if (n === 1) {
        return 1
    };
    return n + sum_to_n_b(n - 1);
};

/**
 * Using the Mathematical Formula for Summation
 * Time complexity: O(1).
 * Space complexity: O(1).
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
const sum_to_n_c = (n) => {
    return (n * (n + 1)) / 2;
};
