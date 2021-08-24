import { cart } from '../../../data.js'

export default function handler(req, res) {
  const { id } = req.query
  if (req.method === 'DELETE') {
    cart.map((item, i) => {
      if(item.id === Number(id)) {
        cart.splice(i, 1);
      }
    })
  }
  res.end('completed');

}