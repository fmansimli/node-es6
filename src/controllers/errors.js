export function get404(req, res, next) {
  res.status(404).json();
}

export function handleError(err, req, res, next) {
  res.status(500).json();
}
