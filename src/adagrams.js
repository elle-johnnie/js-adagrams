const _ = require("lodash");
const letterBag = [
    'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
    'B', 'B',
    'C', 'C',
    'D', 'D', 'D', 'D',
    'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
    'F', 'F',
    'G', 'G', 'G',
    'H', 'H',
    'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
    'J',
    'K',
    'L', 'L', 'L', 'L',
    'M', 'M',
    'N', 'N', 'N', 'N', 'N', 'N',
    'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
    'P', 'P',
    'Q',
    'R', 'R', 'R', 'R', 'R', 'R',
    'S', 'S', 'S', 'S',
    'T', 'T', 'T', 'T', 'T', 'T',
    'U', 'U', 'U', 'U',
    'V', 'V',
    'W', 'W',
    'X',
    'Y', 'Y',
    'Z'];

const scoreLetters = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1,
    J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
    S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

// A, E, I, O, U, L, N, R, S, T	1
// D, G	2
// B, C, M, P	3
// F, H, V, W, Y	4
// K	5
// J, X	8
// Q, Z	10

const Adagrams = {
    // use lodash to get a sample of 10 letters from the letterbag
    drawLetters() {
        let lettersInhHand = _.sampleSize(letterBag, 10);
        console.log(lettersInhHand);
        return lettersInhHand
    },
    // ensure that only lettersInHand valid inputs
    // create an hash object that sums each letterInHand
    // k:letter, v:letter count
    usesAvailableLetters(input, lettersInHand) {

        let count = lettersInHand.reduce((tally, letter) => {
            // ????? I don't know exactly how this next line works but it does :| ?????????
            tally[letter] = (tally[letter] || 0) + 1;
            return tally;
        }, {});
        // I learned that using string interpolation requires interpolating specifics
        // or else js just prints 'object' to the console
        console.log(`hash object of tallied available letters in hand: ${Object.entries(count)}`);
        // logging without string interp. gives me what i want tho
        console.log(count);
        // split letters into an array
        const checkLetters = input.split('');
        // loop through checkLetters array
        // decrement count for each letter used
        // return false if a letter is overused or not in checkLetters hash
        for (let letter of checkLetters) {
            // console.log(letter);
            // console.log(count[letter]);
            if (letter in count && count[letter] >= 1) {
                count[letter] -= 1
            } else {
                return false;
            }
        }
        // console.log(count);
        return true

    },
    // score each word according to value in score object(hash)
    scoreWord(word) {
        // console.log(word);
        let score = 0;
        let wordArray = word.toUpperCase().split('');
        for (let char of wordArray) {
            // console.log(`Char ${char} has a score of ${scoreLetters[char]}`);
            score += scoreLetters[char];
        }
        if (wordArray.length >= 7) {
            score += 8;
        }
        return score
    },

    highestScoreFrom(words) {
        // create a hash-object of k:word and v:scores for each word
        let scoreHash = {};
        for (let word of words) {
            scoreHash[`${word}`] = this.scoreWord(word);
        }

        // console.log( 'scoreHash: ' + `${Object.entries(scoreHash)}` );

        // find max function
        const getMax = (object) => {
            return Object.keys(object).filter(x => {
                return object[x] === Math.max.apply(null,
                    Object.values(object));
            });
        };
        // call getMax on scoreHash to get array of max scores returned
        let max = getMax(scoreHash);
        // console.log( `max score array: ${max}` );
        // console.log( `max score array length: ${max.length}` );
        if (max.length > 1) {
            max.sort(function (a, b) {
                // ASC  -> a.length - b.length
                // DESC -> b.length - a.length
                return a.length - b.length;
            });
        }

        // check for 10 character winners
        let temp = [];
        for (let w of max) {
            if (w.length === 10) {
                temp.push(w);
            }
        }
        // if > 1 word uses all 10 char, pick 1st in order
        if (temp.length >= 1) {
            max[0] = temp[0];
        }
        //???????? why is my IDE telling me that the variable winner is redundant????????
        const winner = {
            score: this.scoreWord(max[0]),
            word: max[0],
        };
        // winner["score"] = this.scoreWord(max[0]);
        // winner["word"] = winWord;
        return winner
    }
};


// Do not remove this line or your tests will break!
export default Adagrams;
/// let g = Adagrams.highestScoreFrom(['x', 'xx', 'xxx', 'aaa']);
// // console.log(g);
