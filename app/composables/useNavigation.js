export const useNavigation = () => {
    const { locale } = useI18n();

    const { data: pages } = useAsyncData(
        'nav-pages',
        () => queryCollection('pages').where('locale', '=', locale.value).all(),

        {
            watch: [locale], // reactively refetch on locale change
        }
    );

    const { data: blogCategories } = useAsyncData(
        'nav-blog-categories',
        () =>
            queryCollection('blogCategories')
                .where('locale', '=', locale.value)
                .all(),

        {
            watch: [locale], // reactively refetch on locale change
        }
    );

    const pagesMenu = computed(() => {
        if (!pages.value) return [];
        const visiblePages = pages.value
            .filter((item) => item.navigation.visible)
            .sort((a, b) => a.navigation.order - b.navigation.order);

        return visiblePages.map((item) => ({
            ...item,
            path: item.path,
        }));
    });

    const blogMenu = computed(() => {
        if (!blogCategories.value) return [];
        const visibleCategories = blogCategories.value
            .filter((item) => item.navigation.visible)
            .sort((a, b) => a.navigation.order - b.navigation.order);

        return visibleCategories.map((item) => ({
            ...item,
            path: item.meta.path,
        }));
    });

    // Combine and sort navigation items
    const navigationItems = computed(() => {
        const pageItems =
            pagesMenu.value?.map((item) => ({
                ...item,
                path: item.navigation.type === 'blog' ? '/blog' : item.path,
            })) || [];

        const blogItems =
            blogMenu.value?.map((item) => ({
                ...item,
                path: item.path,
            })) || [];

        // if page from pageItems has an item.navigation.type === "blog" create a submenu with all blogItems for this page
        pageItems.forEach((page) => {
            if (page.navigation.type === 'blog') {
                page.submenu = blogItems;
            }
        });

        return pageItems;
    });

    return navigationItems;
};
