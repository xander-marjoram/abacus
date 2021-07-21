<template>
    <div class="abacus">
        <Digit
            v-for="(power, digitIndex) in powersArray"
            :key="`digit-${power}`"
            :value.sync="digitValues[digitIndex]" />
        <template v-if="showNumbers">
            <span
                v-for="(i, index) in digits"
                :key="`value-${i}`">
                {{ digitValues[index] }}
            </span>
        </template>
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
.abacus {
    border: 1px solid grey;
    width: 100%;
    max-width: 228px;
    margin: 32px auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    background-color: brown;
}
</style>
