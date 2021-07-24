<template>
    <div>
        <settings />
        <abacus />
        <question />
    </div>
</template>

<script>
import Abacus from '@/components/Abacus.vue';
import Question from '@/components/Question.vue';
import Settings from '@/components/Settings.vue';

export default {
    components: {
        Abacus,
        Question,
        Settings
    }
};
</script>

<style>
button {
    background-color: #eee;
    border: 1px solid grey;
    margin: 4px;
    padding: 8px;
}

button:hover,
button:focus {
    outline: 1px solid black;
}

button:active {
    background-color: #ccc
}
</style>
