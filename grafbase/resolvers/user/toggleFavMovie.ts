const IsFavoriteResolver = async (
  root: any,
  args: any,
  context: any,
  info: any
) => {
  // const token = context.request.headers.authorization.split(" ")[1];
  // const email = context.request.headers["x-user-email"];

  console.log(JSON.stringify({ root, args, context, info }));

  return false;
};

export default IsFavoriteResolver;
