<template>
    <div class="centre-wrapper">
        <div class="abacus-container">
            <div
                scaling-wrapper
                :class="`scale-${scaleFactor}`">
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
        audioSrc2: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/45347/85d2c4f2262dfed6d4f4381a2401686bbb7fff1e/mp3/_808-rimshot-snare_C_minor.mp3?1598487790',
        scaleFactor: 100
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

            this.updateAbacusScaling();
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
        },

        async updateAbacusScaling () {
            if (document) {
                await this.$nextTick();
                const digitsWidth = document.querySelector('[scaling-wrapper]').getBoundingClientRect().width;
                const normalisedDigitsWidth = digitsWidth * (100 / this.scaleFactor);
                const bodyCardWidth = document.querySelector('.body-card').getBoundingClientRect().width;

                const scaleFactor = bodyCardWidth / normalisedDigitsWidth;
                if (scaleFactor < 1) {
                    // Round down to nearest 0.1, as a percentage
                    this.scaleFactor = Math.floor(scaleFactor * 10) * 10;
                } else {
                    this.scaleFactor = 100;
                }
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

.scale-90 {
    transform: scale(0.9);
}

.scale-80 {
    transform: scale(0.8);
}

.scale-70 {
    transform: scale(0.7);
}

.scale-60 {
    transform: scale(0.6);
}

.scale-50 {
    transform: scale(0.5);
}
</style>
