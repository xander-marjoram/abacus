<template>
    <div class="settings-container">
        <button
            :aria-expanded="`${showSettingsWindow}`"
            aria-label="Toggle settings window"
            class="settings-window-button settings-button"
            @click="toggleSettingsWindow">
            <img src="/settings.svg" alt="Settings" class="setting-icon">
        </button>
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
                    Columns<br />{{ digits }}
                </span>
                <button
                    :disabled="digits >= 9"
                    class="settings-button"
                    @click="addDigit">
                    +
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('settings', [
            'digits',
            'showSettingsWindow',
            'soundEnabled'
        ]),

        speakerIconSrc () {
            return this.soundEnabled ? '/speaker-on.svg' : '/speaker-off.svg';
        }
    },

    methods: {
        ...mapMutations('settings', [
            'addDigit',
            'removeDigit',
            'toggleSettingsWindow',
            'toggleSound'
        ])
    }
};
</script>

<style>
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
    height: 120px;
    width: 180px;
    box-shadow: 4px 4px 8px #ccc;
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
</style>
