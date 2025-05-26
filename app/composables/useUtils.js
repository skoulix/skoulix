export default function useUtils() {
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const route = useRoute();

    const resolveLocalePath = (path) => {
        const isDefaultLocale = locale.value === 'en';

        if (isDefaultLocale && path.startsWith('/en/')) {
            return path.replace('/en/', '/');
        }

        return localePath({ path });
    };

    const formatDate = (date) => {
        if (!date) return;

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return new Date(date).toLocaleDateString(locale.value, options);
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return { resolveLocalePath, formatDate, capitalize };
}
