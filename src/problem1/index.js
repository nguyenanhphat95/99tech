/**
 * Calculates the sum of all integers from 1 to n (inclusive) using a while loop.
 *
 * @param {number} n - The upper bound of the range to sum. Should be a positive integer.
 * @returns {number} The sum of all integers from 1 to n.
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
 *
 * @param {number} n - The positive integer up to which the sum is calculated.
 * @returns {number} The sum of all integers from 1 to n.
 */
const sum_to_n_b = (n) =>{
    if (n === 1) {
        return 1
    };
    return n + sum_to_n_b(n - 1);
};

/**
 * Calculates the sum of all integers from 1 to n (inclusive).
 *
 * @param {number} n - The upper bound of the range to sum.
 * @returns {number} The sum of all integers from 1 to n.
 */
const sum_to_n_c = (n) => {
    return Array.from({ length: n }, (_, index) => index + 1).reduce((result, num) => result + num, 0);
};
