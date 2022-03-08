export async function login(req, res, next) {
  res.status(200).json({ isAuth: true });
}

export async function register(req, res, next) {
  res.status(200).json({ isRegistered: true });
}
