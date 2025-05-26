export const useCurrentContent = () => {
    const content = useState('current-content', () => null);

    const setContent = (data) => {
        content.value = data;
    };

    const clearContent = () => {
        content.value = null;
    };

    return {
        content,
        setContent,
        clearContent,
    };
};
