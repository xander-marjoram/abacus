<template>
    <div class="digit">
        <div class="heavenly">
            <div
                :class="['bead', { selected: value >= 5 }]"
                @click="updateHeavenlyValue" />
        </div>
        <div class="earthly">
            <div
                v-for="b in 4"
                :key="`bead-${b}`"
                bead
                :class="['bead', { selected: isBeadSelected(b) }]"
                @click="updateEarthlyValue(b)" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            validator: n => n >= 0 && n < 10,
            required: true
        }
    },

    computed: {
        earthly () {
            return this.value % 5;
        },
        heavenly () {
            if (this.value >= 5) {
                return 5;
            }
            return 0;
        }
    },

    methods: {
        isBeadSelected (beadNumber) {
            return this.value % 5 >= beadNumber;
        },

        updateEarthlyValue (beadNumber) {
            let value = 0;
            if (beadNumber > this.earthly) {
                value = this.heavenly + beadNumber;
            } else {
                value = this.value - ((this.earthly - beadNumber) + 1);
            }
            this.$emit('update:value', value);
        },

        updateHeavenlyValue () {
            let value = 0;
            if (this.value < 5) {
                value = this.value + 5;
            } else {
                value = this.value - 5;
            }
            this.$emit('update:value', value);
        }
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/variables';

.digit {
    display: flex;
    flex-flow: column nowrap;
}

.earthly, .heavenly {
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
    justify-content: flex-start;
    background: repeating-linear-gradient(90deg, $abacus-background-colour 0 $abacus-background-layer-1-width, $abacus-border-colour 0 $abacus-background-layer-2-width);
    width: $digit-width;
    border: $abacus-border-width solid $abacus-border-colour;
}

.heavenly {
    height: $abacus-heavenly-height;
}

.earthly {
    justify-content: flex-end;
    height: $abacus-earthly-height;
}

.bead {
    display: block;
    height: $bead-height;
    width: $bead-width;
    background-color: $bead-colour;
    border-radius: 45%;
    margin: $bead-vertical-margin $bead-horizontal-margin;
    transition: 0.1s;
}

.earthly .bead.selected {
    transform: translate(0, calc(-1 * #{$bead-move-distance}));
}

.heavenly .bead.selected {
    transform: translate(0, $bead-move-distance);
}

</style>
