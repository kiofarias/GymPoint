import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authCfg from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: 'Token not provide.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, authCfg.secret);
    req.UserId = id;
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Token invalid.' });
  }
};
