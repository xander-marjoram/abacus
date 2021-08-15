<template>
    <div class="centre-wrapper">
        <div class="abacus-container">
            <div
                scaling-wrapper
                :style="{
                    transform: `scale(${scaleFactor})`,
                    padding: '16px'
                }">
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

        <audio :src="audioSrc" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash.throttle';

export default {
    components: {
        Digit: () => import('./Digit.vue')
    },

    data: () => ({
        audioElement: null,
        audioSrc: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/22711/deecc96dd7eab255b56ed2f9a551fd5d20279c66/mp3/_Bongo_109.mp3?1548141031',
        digitValues: [],
        scaleFactor: 1,
        scaleFunction: () => {}
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

        this.scaleFunction = throttle(this.updateAbacusScaling, 25, {
            leading: true,
            trailing: false
        });

        window.addEventListener('resize', this.scaleFunction);
    },

    updated () {
        this.updateAbacusScaling();
    },

    destroyed () {
        window.removeEventListener('resize', this.scaleFunction);
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

        updateAbacusScaling () {
            if (document) {
                const digitsWidth = document.querySelector('[scaling-wrapper]').getBoundingClientRect().width;
                const normalisedDigitsWidth = digitsWidth * (1 / this.scaleFactor);
                const bodyCardWidth = document.querySelector('.body-card').getBoundingClientRect().width;

                const scaleFactor = bodyCardWidth / normalisedDigitsWidth;
                if (scaleFactor < 1) {
                    this.scaleFactor = scaleFactor;
                } else {
                    this.scaleFactor = 1;
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
</style>
