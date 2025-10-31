import jwt from 'jsonwebtoken';
import db from '../models/db.js';

const SECRET = process.env.JWT_SECRET || 'trocar_esse_segredo_em_producao';

export default function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) return res.status(401).json({ error: 'Token não fornecido' });
      const parts = auth.split(' ');
      if (parts.length !== 2) return res.status(401).json({ error: 'Token inválido' });
      const scheme = parts[0];
      const token = parts[1];
      if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token inválido' });
      const decoded = jwt.verify(token, SECRET);
      // buscar usuário
      let user = null;
      if (decoded.type === 'medico') user = db.medicos.find(m => m.id === decoded.id);
      if (decoded.type === 'dono') user = db.donos.find(d => d.id === decoded.id);
      if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
      req.user = { id: user.id, role: user.role, type: decoded.type };
      // autorização por role
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      // se dono consultando routes que precisam de verificação de propriedade, o controller deve validar
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  };
}
