<template>
    <div class="body-card">
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
.body-card {
    background-color: #ddd;
    border-radius: 4px;
    border: 1px solid #999;
    box-shadow: 2px 2px 4px #777;
    padding: 16px;
    max-width: 800px;
    margin: 32px auto;
    overflow-x: hidden;
}

button {
    background-color: #eee;
    border: 1px solid grey;
    margin: 4px;
    padding: 8px;
}

button:hover,
button:focus {
    outline: 1px solid black;
    background-color: #ddd;
}

button:active {
    background-color: #ccc
}
</style>
