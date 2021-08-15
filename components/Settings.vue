<template>
    <div class="settings-container">
        <div>
            <button
                :aria-expanded="`${showSettingsWindow}`"
                aria-label="Toggle settings window"
                class="settings-window-button settings-button"
                @click="toggleSettingsWindow">
                <img src="/settings.svg" alt="Settings" class="setting-icon">
            </button>
        </div>
        <div v-if="showSettingsWindow" class="settings-window">
            <div class="settings-row">
                <button class="settings-button" @click="toggleDarkMode">
                    <img
                        :src="darkModeIconSrc"
                        alt="Toggle dark mode"
                        class="setting-icon">
                </button>
                <span>
                    Dark mode {{ darkMode ? 'on' : 'off' }}
                </span>
            </div>

            <div class="settings-row">
                <button class="settings-button" @click="toggleSound">
                    <img
                        :src="speakerIconSrc"
                        alt="Toggle sound"
                        class="setting-icon">
                </button>
                <span>
                    Sound {{ soundEnabled ? 'on' : 'off' }}
                </span>
            </div>

            <div class="settings-row">
                <button
                    :class="['settings-button', {
                        'x-overlay': !showNumbers
                    }]"
                    @click="toggleShowNumbers">
                    0
                </button>
                <span>
                    Numbers {{ showNumbers ? 'shown' : 'hidden' }}
                </span>
            </div>

            <div class="settings-row">
                <button
                    :disabled="digits < 2"
                    class="settings-button"
                    @click="removeDigit">
                    -
                </button>
                <span>
                    Digits<br>
                    {{ digits }}
                </span>
                <button
                    :disabled="digits >= 9"
                    class="settings-button"
                    @click="addDigit">
                    +
                </button>
            </div>
            <div class="operators">
                <label
                    v-for="operator in operators"
                    :key="`input-${operator}`"
                    :for="`${operator}-checkbox`">
                    <input
                        :id="`${operator}-checkbox`"
                        v-model="selectedOperators"
                        type="checkbox"
                        :value="operator">
                    <span>
                        {{ operator }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { ADD, MULTIPLY, SUBTRACT } from '../services/constants';

export default {
    data: () => ({
        operators: [ADD, SUBTRACT, MULTIPLY]
    }),

    computed: {
        ...mapState('settings', [
            'darkMode',
            'digits',
            'showNumbers',
            'showSettingsWindow',
            'soundEnabled'
        ]),

        selectedOperators: {
            get () {
                return this.$store.state.settings.selectedOperators;
            },
            set (operators) {
                this.updateSelectedOperators(operators);
            }
        },

        darkModeIconSrc () {
            return this.darkMode ? '/dark-mode.png' : '/light-mode.png';
        },

        speakerIconSrc () {
            return this.soundEnabled ? '/speaker-on.svg' : '/speaker-off.svg';
        }
    },

    methods: {
        ...mapMutations('settings', [
            'addDigit',
            'removeDigit',
            'toggleDarkMode',
            'toggleSettingsWindow',
            'toggleShowNumbers',
            'toggleSound',
            'updateSelectedOperators'
        ])
    }
};
</script>

<style>
.settings-window,
.settings-window * {
    z-index: 99;
}

.settings-window-button {
    position: absolute;
    right: 0;
    top: 0;
}

.settings-button {
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 20px;
    margin: 8px;
    padding: 8px;
    padding-bottom: 5px;
    height: 42px;
    width: 42px;
}

.x-overlay:before {
    position: absolute;
    content: "×";
    font-size: 36px;
    margin-top: -12px;
    margin-left: -1px;
}

.setting-icon {
    height: 24px;
    width: 24px;
}

.settings-window {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    margin: 8px;
    padding: 8px;
    top: 48px;
    right: 0;
    border: 1px solid #ccc;
    background-color: #eee;
    height: 320px;
    width: 220px;
    box-shadow: 2px 2px 4px grey;
}

.settings-window span {
    font-size: 16px;
}

.settings-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 16px;
}

.operators {
    display: flex;
    flex-flow: column;
}

input[type="checkbox"] {
    height: 16px;
    width: 16px;
}
</style>
