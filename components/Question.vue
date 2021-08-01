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
            <span class="result">
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
import { ADD, OPERATORS } from '@/services/constants';

export default {
    data: () => ({
        answer: 0,
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
            if (parseInt(this.guess) === this.answer) {
                this.resultText = 'Correct!';
            } else {
                this.resultText = 'Incorrect';
            }
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
            } else {
                this.firstNumber = this.getRandomNumberBetween(2, 10 ** this.digits);
                this.secondNumber = this.getRandomNumberBetween(1, this.firstNumber);
                this.answer = this.firstNumber - this.secondNumber;
            }
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

<style>
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
