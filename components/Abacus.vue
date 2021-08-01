<template>
    <div class="centre-wrapper">
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
            <div class="centre-wrapper">
                <button type="button" @click="digitValues = buildZerosArrayOfLength(digits)">
                    Reset
                </button>
            </div>
        </div>

        <audio :src="audioSrc1" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Digit from './Digit.vue';

export default {
    components: {
        Digit
    },

    data: () => ({
        audioElement: null,
        digitValues: [],
        audioSrc1: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/22711/deecc96dd7eab255b56ed2f9a551fd5d20279c66/mp3/_Bongo_109.mp3?1548141031',
        audioSrc2: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/45347/85d2c4f2262dfed6d4f4381a2401686bbb7fff1e/mp3/_808-rimshot-snare_C_minor.mp3?1598487790'
    }),

    fetch () {
        this.digitValues = this.buildZerosArrayOfLength(this.digits);
    },

    computed: {
        ...mapState('settings', [
            'digits',
            'showNumbers',
            'soundEnabled'
        ]),

        powersArray () {
            return [...Array(this.digits).keys()].reverse();
        },

        value () {
            return this.powersArray
                .map((power, index) => this.digitValues[index] * 10 ** power)
                .reduce((a, b) => a + b, 0);
        }
    },

    watch: {
        digits (newDigits, oldDigits) {
            if (newDigits < oldDigits) {
                this.digitValues.splice(0, oldDigits - newDigits);
            } else {
                this.digitValues = this.buildZerosArrayOfLength(newDigits - oldDigits).concat(this.digitValues);
            }
        },

        digitValues (_, oldValues) {
            if (oldValues.length) {
                this.playSound();
            }
        }
    },

    mounted () {
        this.audioElement = document.querySelector('audio');
    },

    methods: {
        buildZerosArrayOfLength (length) {
            return [...Array(length)].map(_ => 0);
        },

        playSound () {
            if (this.soundEnabled) {
                this.audioElement.play();
            }
        }
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/variables';

.centre-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.abacus-container {
    display: inline-block;
    margin: 16px 0;
}

.abacus {
    border: $abacus-border-width solid $abacus-border-colour;
    margin: 16px auto;
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
