<template>
    <div class="abacus">
        <Digit
            v-for="i in [4,5,6]"
            :key="`digit-${i}`"
            :value="i" />
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
