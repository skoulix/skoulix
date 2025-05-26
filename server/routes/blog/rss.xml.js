import { Feed } from 'feed';

export default defineEventHandler(async (event) => {
    const domain = `https://${process.env.APP_HOST}`;

    const posts = await queryCollection(event, 'blog')
        .order('date', 'DESC')
        .limit(20)
        .all();

    const feed = new Feed({
        title: 'RSS Feed',
        id: domain,
        link: domain,
        language: 'en',
        copyright: '',
    });

    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `${domain}${post.path}`,
            link: `${domain}${post.path}`,
            description: post.description,
            date: new Date(post.date),
        });
    });

    setHeader(event, 'Content-Type', 'application/rss+xml');
    return feed.rss2();
});
