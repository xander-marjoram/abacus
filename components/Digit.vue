<template>
    <div class="digit">
        <div class="heavenly">
            <div
                :class="{ bead: true, selected: value >= 5 }"
                @click="updateHeavenlyValue" />
        </div>
        <div class="earthly">
            <div
                v-for="b in 4"
                :key="`bead-${b}`"
                bead
                :class="{
                    bead: true,
                    selected: isBeadSelected(b)
                }"
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

<style>
.digit {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
    margin: 4px;
}

.earthly, .heavenly {
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
    justify-content: flex-start;
    background-color: lightblue;
    padding: 4px;
}

.heavenly {
    height: 60px;
}

.earthly {
    justify-content: flex-end;
    height: 160px;
}

.bead {
    display: block;
    height: 30px;
    width: 60px;
    background-color: brown;
    border-radius: 50%;
    margin: 1px 0;

    text-align: center;
    color: white;
    transition: 0.1s;
}

.earthly .bead.selected {
    transform: translate(0, -30px);
}

.heavenly .bead.selected {
    transform: translate(0, 30px);
}

</style>
