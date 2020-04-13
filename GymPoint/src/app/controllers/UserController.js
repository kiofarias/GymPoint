import * as Yup from 'yup';
import User from '../models/User';

class UserControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails.' });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res
        .status(400)
        .json({ error: 'Email already exists in database.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails.' });
    }

    let { email } = req.body;
    const { oldPassword } = req.body;
    const user = await User.findByPk(req.UserId);

    if (email) {
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          res.status(400).json({ error: 'Email already exists in database.' });
        }
      }
    } else {
      email = user.email;
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: `Password doesn't match.` });
    }

    const { id, name } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  index() {}

  show() {}

  delete() {}
}

export default new UserControler();
