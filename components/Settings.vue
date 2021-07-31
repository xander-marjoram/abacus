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
            <button class="settings-button" @click="toggleSound">
                <img
                    :src="speakerIconSrc"
                    alt="Toggle sound"
                    class="setting-icon">
            </button>
            <div class="digit-controls">
                <button
                    :disabled="digits < 2"
                    class="settings-button"
                    @click="removeDigit">
                    -
                </button>
                <span>
                    Columns<br>
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
import { ADD, SUBTRACT } from '../services/constants';

export default {
    data: () => ({
        operators: [ADD, SUBTRACT]
    }),

    computed: {
        ...mapState('settings', [
            'digits',
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

        speakerIconSrc () {
            return this.soundEnabled ? '/speaker-on.svg' : '/speaker-off.svg';
        }
    },

    methods: {
        ...mapMutations('settings', [
            'addDigit',
            'removeDigit',
            'toggleSettingsWindow',
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
    height: 180px;
    width: 190px;
    box-shadow: 2px 2px 4px grey;
}

.settings-window span {
    font-size: 16px;
}

.digit-controls {
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
