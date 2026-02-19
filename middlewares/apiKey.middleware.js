module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  
  if (!apiKey) {
    return res.status(401).json({ message: "API Key requerida" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "API Key inválida" });
  }

  next();
};
