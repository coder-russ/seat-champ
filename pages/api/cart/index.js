// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cart } from '../../../data.js'

export default function handler(req, res) {
  if (req.method === 'POST') {
    cart.push(req.body);
  }
  res.status(200).json(cart);
}
