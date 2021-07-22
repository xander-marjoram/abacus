<template>
    <div class="abacus-wrapper">
        <div class="abacus-container">
            <div class="abacus">
                <Digit
                    v-for="(power, digitIndex) in powersArray"
                    :key="`digit-${power}`"
                    :value.sync="digitValues[digitIndex]" />
            </div>
            <div v-if="showNumbers" class="numbers-container">
                <span
                    v-for="(i, index) in digits"
                    :key="`value-${i}`">
                    {{ digitValues[index] }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Digit from './Digit.vue';

export default {
    components: {
        Digit
    },
    props: {
        digits: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        digitValues: [],
        showNumbers: true
    }),
    computed: {
        powersArray () {
            return [...Array(this.digits).keys()].reverse();
        },

        value () {
            return this.powersArray
                .map((power, index) => this.digitValues[index] * 10 ** power)
                .reduce((a, b) => a + b, 0);
        }
    },
    created () {
        this.digitValues = [...Array(this.digits)].map(_ => 0);
    }
};
</script>

<style>
.abacus-wrapper {
    width: 100vw;
    display: flex;
    justify-content: center;
}

.abacus-container {
    display: inline-block;
    margin: 32px 0;
}

.abacus {
    border: 4px solid #551F2A;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-items: center;
}

.numbers-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
</style>
