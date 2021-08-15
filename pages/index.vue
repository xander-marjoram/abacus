<template>
    <div class="body-card">
        <settings />
        <abacus />
        <question />
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Abacus from '@/components/Abacus.vue';
import Question from '@/components/Question.vue';
import Settings from '@/components/Settings.vue';

import updateDarkMode from '../services/darkMode';

export default {
    components: {
        Abacus,
        Question,
        Settings
    },

    computed: {
        ...mapState('settings', ['darkMode'])
    },

    mounted () {
        updateDarkMode(this.darkMode);
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/variables';

.body-card {
    border-radius: 4px;
    padding: 16px;
    max-width: 800px;
    margin: auto;
    overflow-x: hidden;
}

button {
    margin: 4px;
    padding: 8px;
    font-size: 1rem;
}
</style>
