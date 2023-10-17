'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    const initialDate = new Date('2020-06-01T00:00:00Z');
    const newDate = new Date(initialDate.getTime() + seconds * 1000);
    return newDate;
}
/*console.log(secondsToDate(31536000));
console.log(secondsToDate(0));
console.log(secondsToDate(86400));*/
/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    if (decimal === 0) {
        return "0";
    }

    let binary = "";
    while (decimal > 0) {
        const remainder = decimal % 2;
        binary = remainder + binary;
        decimal = Math.floor(decimal / 2);
    }

    return binary;
}

/*console.log(toBase2Converter(5));
console.log(toBase2Converter(10));*/

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    const lowercasedSubstring = substring.toLowerCase();
    const lowercasedText = text.toLowerCase();
    let count = 0;
    let index = lowercasedText.indexOf(lowercasedSubstring);

    while (index !== -1) {
        index = lowercasedText.indexOf(lowercasedSubstring, index + 1);
        count++;
    }

    return count;
}

/*console.log(substringOccurrencesCounter('a', 'test it'));
console.log(substringOccurrencesCounter('t', 'test it'));
console.log(substringOccurrencesCounter('T', 'test it'));*/

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let result = '';

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (string.indexOf(char) == string.lastIndexOf(char)) {
            result += char + char;
        } else {
            result += char;
        }
    }
    return result;
}

/*console.log(repeatingLitters("Hello"));
console.log(repeatingLitters("Hello world"));*/

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return function () {
        return str;
    };
}

// Test examples
/*const f1 = redundant("apple");
console.log(f1());  // Output: "apple"

const f2 = redundant("pear");
console.log(f2());  // Output: "pear"

const f3 = redundant("");
console.log(f3());  // Output: ""
*/
/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    if (disks <= 0) {
        return 0;
    }

    return Math.pow(2, disks) - 1;
}

/*console.log(towerHanoi(3));
console.log(towerHanoi(4));*/

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const cols2 = matrix2[0].length;

    if (cols1 !== matrix2.length) {
        return "Matrices are not compatible for multiplication.";
    }

    const result = new Array(rows1);
    for (let i = 0; i < rows1; i++) {
        result[i] = new Array(cols2).fill(0);
    }

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

/*const matrixA = [[1, 2], [3, 4]];
const matrixB = [[2, 0], [1, 2]];
const result = matrixMultiplication(matrixA, matrixB);
console.log(result);*/

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    const gatheredStrings = [str];

    const chainFunction = (nextStr) => {
        gatheredStrings.push(nextStr);
        return chainFunction;
    };

    chainFunction.order = (...order) => {
        const orderedStrings = order.map((index) => gatheredStrings[index]);
        const orderChainFunction = (nextIndex) => {
            orderedStrings.push(gatheredStrings[nextIndex]);
            return orderChainFunction;
        };

        orderChainFunction.get = () => orderedStrings.join('');
        return orderChainFunction;
    };
    return chainFunction;
}

const result = gather("a")("b")("c").order(0)(1)(2).get();
console.log(result);
console.log(gather("a")("b")("c").order(2)(1)(0).get());
console.log(gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get());

