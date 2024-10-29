import jwt from "jsonwebtoken";

const SECRET_KEY = "7d40b71598bd857be3fe85dadfe75de5";

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("Token recebido:", token); // Adicione esta linha
  if (!token) {
    return res.status(403).send("Um token é necessário para autenticação");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Erro na verificação do token:", err); // Adicione esta linha
      return res.status(401).send("Token inválido");
    }
    req.userId = decoded.id;
    console.log("User ID extraído:", req.userId);
    next();
  });
};

export default verifyToken;
