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
  drawLetters(){
        let lettersInhHand = _.sampleSize(letterBag, 10);
        console.log(lettersInhHand);
      return lettersInhHand
  },
    usesAvailableLetters(input, lettersInHand) {
        let count = lettersInHand.reduce( (tally, letter) => {
            tally[letter] = (tally[letter] || 0) + 1 ;
            return tally;
        } , {});
        console.log(count);

        const checkLetters = input.split('');
        for(let letter of checkLetters){
            // console.log(letter);
            // console.log(count[letter]);
            if (letter in count && count[letter] >= 1){
                count[letter] -= 1
            } else {
                return false;
            }
        }
        console.log(count);
        return true

    },
     scoreWord(word){
      console.log(word);
      let score = 0;
      let wordArray = word.toUpperCase().split('');
      for(let char of wordArray){
          // console.log(`Char ${char} has a score of ${scoreLetters[char]}`);
          score += scoreLetters[char];
      }
      if (wordArray.length >= 7){
          score += 8;
      }
      // console.log(score);
        return score
    },

    highestScoreFrom(words){
      let scoresArray = [];
      let scoreHash = {};
      for (let word of words) {
            console.log(word);
          let tempHash = {
              word: word,
              score: this.scoreWord(word)
          // scoreHash["score"] = this.scoreWord(word);

      };
          scoresArray.push(tempHash);
          console.log('temphash at this point: ' + `${tempHash}`)
          console.log('temphash at this point keys: ' + `${Object.keys(tempHash)}`)
          console.log('scorearray first at this point with temphash key: ' + `${scoresArray[0][tempHash.word]}`)
      }
        // console.log(`words: ${words}`);
        console.log('scoreHash: '  + `${Object.keys(scoreHash)}`);
        // console.log(scoresArray);
      // find max
        const getMax = (object) => {
            return Object.keys(object).filter(x => {
                return object[x] === Math.max.apply(null,
                Object.values(object));
            });
        };
        // console.log(`scores array: ${getMax(scoreHash)}`);
      if(getMax.length > 1){
          getMax.sort(function(a, b){
              // ASC  -> a.length - b.length
              // DESC -> b.length - a.length
              return a.length - b.length;
          });
      }
      const winWord = getMax[0];
        console.log(winWord);
      let winner = {};
      winner["score"] = this.scoreWord(getMax[0]);
      winner["word"] = winWord;
      return winner
      }

    };


// Do not remove this line or your tests will break!
export default Adagrams;
