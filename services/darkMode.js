const updateDarkMode = (darkMode) => {
    if (document) {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
};

export default updateDarkMode;
