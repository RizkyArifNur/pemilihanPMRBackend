module.exports = function(app) {
  const Pemilihan = app.models.Pemilihan;

  Pemilihan.observe("before save", async function(ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    if (ctx.instance) {
      ctx.instance.createdBy = userId;
    } else {
      ctx.data.createdBy = userId;
    }
  });
};
