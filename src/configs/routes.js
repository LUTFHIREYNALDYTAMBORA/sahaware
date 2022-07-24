const routes = {
  HOME() { return `/Home`; },
  ARTICLE() { return `/Article`; },
  ARTICLE_DETAILS(id) { return `/Article/${id}`; },
  CREATE() { return `/Create`; },
};

export default routes;
