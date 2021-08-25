import { postCartItem, getCartItems, removeCartItem } from '../../../lib/models'

export default function handler(req, res) {
  const { slug } = req.query
  if (req.method === 'GET') {
    return getCartItems(slug[0])
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  if (req.method === 'DELETE') {
    return removeCartItem(slug[0])
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}