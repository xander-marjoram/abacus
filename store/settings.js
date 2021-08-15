import { ADD } from '../services/constants';
import updateDarkMode from '../services/darkMode';

export const state = () => ({
    darkMode: false,
    digits: 3,
    selectedOperators: [ADD],
    showNumbers: true,
    showSettingsWindow: false,
    soundEnabled: false
});

export const mutations = {
    addDigit (state) {
        state.digits++;
    },

    removeDigit (state) {
        state.digits--;
    },

    toggleDarkMode (state) {
        state.darkMode = !state.darkMode;
        updateDarkMode(state.darkMode);
    },

    toggleShowNumbers (state) {
        state.showNumbers = !state.showNumbers;
    },

    toggleSettingsWindow (state) {
        state.showSettingsWindow = !state.showSettingsWindow;
    },

    toggleSound (state) {
        state.soundEnabled = !state.soundEnabled;
    },

    updateSelectedOperators (state, operators) {
        state.selectedOperators = operators;
    }
};
