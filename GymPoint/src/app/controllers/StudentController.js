import * as Yup from 'yup';
import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      idade: Yup.number().integer().positive().max(150),
      peso: Yup.number().min(0).max(500),
      altura: Yup.number().min(0).max(3),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails.' });
    }

    if (await Student.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'Student email already exists.' });
    }

    const user = await User.findByPk(req.UserId);

    req.body.user_id = user.id;

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.integer().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number().integer().positive().max(150),
      peso: Yup.number().min(0).max(500),
      altura: Yup.number().min(0).max(3),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails.' });
    }
    if (req.body.email)
      if (await Student.findOne()) {
        return res.status(400).json({ error: 'Student email already exists.' });
      }
    const user = await User.findByPk(req.UserId);

    req.body.user_id = user.id;
    const student = await Student.update(req.body);

    return res.json(student);
  }

  delete() {}

  index() {}

  show() {}
}

export default new StudentController();
