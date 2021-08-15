<template>
    <div class="question-container">
        <div class="question">
            <div>
                <span>{{ firstNumber.toLocaleString() }}</span>
                <span>{{ operator }}</span>
                <span>{{ secondNumber.toLocaleString() }}</span>
            </div>
            <span>=</span>
            <div>
                <input
                    v-model="guess"
                    type="number"
                    min="0"
                    step="1"
                    @keydown.enter="checkGuess">
            </div>
        </div>
        <div class="result-container">
            <span
                :class="['result', {
                    correct: correctGuess,
                    incorrect: !correctGuess
                }]">
                {{ resultText }}
            </span>
            <button type="button" @click="checkGuess">
                Check
            </button>
            <button type="button" @click="generateNewNumbers">
                New question
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ADD, SUBTRACT, MULTIPLY, OPERATORS } from '@/services/constants';

export default {
    data: () => ({
        answer: 0,
        correctGuess: false,
        firstNumber: 0,
        guess: null,
        operator: '+',
        resultText: '',
        secondNumber: 0
    }),

    computed: {
        ...mapState('settings', [
            'digits',
            'selectedOperators'
        ])
    },

    watch: {
        digits (newDigits) {
            if (this.answer >= 10 ** newDigits) {
                this.generateNewNumbers();
            }
        }
    },

    created () {
        this.generateNewNumbers();
    },

    methods: {
        checkGuess () {
            this.correctGuess = parseInt(this.guess) === this.answer;
            this.resultText = this.correctGuess ? 'Correct!' : 'Incorrect :(';
        },

        generateNewNumbers () {
            this.resetResults();
            const randomIndex = Math.floor(Math.random() * this.selectedOperators.length);
            const operator = this.selectedOperators[randomIndex];
            this.operator = OPERATORS[operator];

            if (operator === ADD) {
                this.answer = this.getRandomNumberBetween(2, 10 ** this.digits);
                this.firstNumber = this.getRandomNumberBetween(1, this.answer);
                this.secondNumber = this.answer - this.firstNumber;
            } else if (operator === SUBTRACT) {
                this.firstNumber = this.getRandomNumberBetween(2, 10 ** this.digits);
                this.secondNumber = this.getRandomNumberBetween(1, this.firstNumber);
                this.answer = this.firstNumber - this.secondNumber;
            } else if (operator === MULTIPLY) {
                let answer, factors;
                do {
                    // e.g. for a 3 digit number get a number between 100 and 1000
                    answer = this.getRandomNumberBetween(10 ** (this.digits - 1), 10 ** this.digits);
                    factors = this.getInterestingFactors(answer);
                } while (factors.length < 1);

                this.answer = answer;
                this.firstNumber = factors[Math.floor(Math.random() * factors.length)]; // Pick a random factor
                this.secondNumber = answer / this.firstNumber;
            }
        },

        // Returns all factors except 1 and the number itself
        getInterestingFactors (n) {
            const factors = [];

            let i = 2;
            while (i < Math.sqrt(n)) {
                if (n % i === 0) {
                    factors.push(i, n / i);
                }
                i++;
            }
            return factors;
        },

        getRandomNumberBetween (min, max) {
            const diff = max - min;
            const random = Math.random() * diff;
            return min + Math.floor(random);
        },

        resetResults () {
            this.guess = null;
            this.resultText = '';
        }
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/variables.scss';

.question-container {
    margin: auto;
    width: 95%;
    max-width: 600px;
}

.question {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-items: center;
    justify-content: center;
}

.result-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.result {
    min-height: 50px;
    grid-column: 1 / 3;

    &.correct {
        color: green;
    }

    &.incorrect {
        color: $dark-red;
    }
}

span {
    font-size: 36px;
    text-align: center;
    margin: 0 8px;
}

input {
    height: 44px;
    font-size: 32px;
    width: 180px;
    margin-left: 8px;
}
</style>
