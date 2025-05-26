import { field, group } from '@nuxt/content/preview';

export default defineNuxtSchema({
    appConfig: {
        socials: group({
            title: 'Socials',
            description: 'Socials configuration',
            icon: 'lucide:link',
            fields: {
                twitter: field({
                    type: 'string',
                    title: 'Twitter',
                    description: 'Your Twitter account.',
                    icon: 'lucide:twitter',
                    default: 'https://twitter.com/myusername',
                }),
                linkedin: field({
                    type: 'string',
                    title: 'Linkedin',
                    description: 'Your Linkedin account.',
                    icon: 'lucide:linkedin',
                    default: 'https://www.linkedin.com/in/myusername',
                }),
                instagram: field({
                    type: 'string',
                    title: 'Instagram',
                    description: 'Your Instagram account.',
                    icon: 'lucide:instagram',
                    default: 'https://www.instagram.com/myusername',
                }),
            },
        }),
    },
});
