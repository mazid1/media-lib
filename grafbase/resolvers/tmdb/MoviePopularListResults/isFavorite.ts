export default async function IsFavoriteResolver(
  root: unknown,
  args: unknown,
  context: unknown,
  info: unknown
) {
  // const token = context.request.headers.authorization.split(" ")[1];
  // const email = context.request.headers["x-user-email"];

  // console.log(JSON.stringify({ token }));

  return false;
}
