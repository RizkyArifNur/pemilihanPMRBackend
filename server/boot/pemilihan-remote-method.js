module.exports = function(app) {
  const Pemilihan = app.models.Pemilihan;

  /**
   * this hooks will observe all operation that play with saving data ex : create, update, replace
   *
   */
  Pemilihan.observe("before save", async function(ctx, next) {
    // get token from context
    const token = ctx.options && ctx.options.accessToken;
    // get userId from token
    const userId = token && token.userId;

    // if instance is new data (from @post method)
    if (ctx.instance) {
      ctx.instance.createdBy = userId;
      // if instance is updated data (from @put / @patch)
    } else {
      ctx.data.createdBy = userId;
    }
  });
};
