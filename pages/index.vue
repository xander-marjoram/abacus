<template>
    <div>
        <abacus :digits="digits" />

        <div class="question-container">
            <div class="question">
                <div>
                    <span>{{ firstNumber }}</span>
                    <span>+</span>
                    <span>{{ secondNumber }}</span>
                </div>
                <span>=</span>
                <div>
                    <input
                        v-model="answer"
                        type="number"
                        min="0"
                        step="1"
                        @keydown.enter="checkAnswer">
                    <span>
                        ?
                    </span>
                </div>
            </div>
            <div class="result-container">
                <span class="result">{{ resultText }}</span>
                <button type="button" @click="checkAnswer">
                    Check
                </button>
                <button type="button" @click="generateNumbers">
                    Reset
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Abacus from '@/components/Abacus.vue';

export default {
    components: {
        Abacus
    },

    data: () => ({
        answer: null,
        digits: 3,
        firstNumber: 0,
        resultText: '',
        secondNumber: 0,
        total: 0
    }),

    created () {
        this.generateNumbers();
    },

    methods: {
        checkAnswer () {
            if (parseInt(this.answer) === this.total) {
                this.resultText = 'Correct!';
            } else {
                this.resultText = 'Incorrect';
            }
        },

        generateNumbers () {
            this.answer = null;
            this.resultText = '';
            this.total = this.getRandomNumberBetween(2, 10 ** this.digits);
            this.firstNumber = this.getRandomNumberBetween(1, this.total);
            this.secondNumber = this.total - this.firstNumber;
        },

        getRandomNumberBetween (min, max) {
            const diff = max - min;
            const random = Math.random() * diff;
            return min + Math.floor(random);
        }
    }
};
</script>

<style>
.question-container {
    margin: auto;
    width: 95%;
    max-width: 500px;
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
    width: 140px;
}
</style>
