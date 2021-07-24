import { ADD } from '../services/constants';

export const state = () => ({
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
