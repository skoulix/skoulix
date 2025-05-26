export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const q = (query.q || '').toLowerCase();

    const results = await queryContent()
        .where({ _search: { $contains: q } })
        .find();

    return results;
});
