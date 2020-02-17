import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // findByIdAndUpdate => Encontra pela id e atualiza
    const notification = await Notification.findByIdAndUpdate(
      req.params.id, // id do objeto a ser encontrado e atualizado
      { read: true }, // parâmetros a serem atualizados
      { new: true } // returna o objeto atualizado
    );

    return res.json(notification);
  }
}

export default new NotificationController();
