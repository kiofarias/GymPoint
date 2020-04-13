import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authCfg from '../../config/authConfig';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: `Email doesn't found.` });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: `Password doesn't match.` });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authCfg.secret, { expiresIn: authCfg.expiresIn }),
    });
  }
}

export default new SessionController();
