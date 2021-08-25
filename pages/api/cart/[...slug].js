import { postCartItem, getCartItems, removeCartItem, makePurchase, getUserPurchases, getTeamPurchases } from '../../../lib/models'

export default function handler(req, res) {
  const { slug } = req.query
  if (req.method === 'GET' && slug.length === 1) {
    return getCartItems(slug[0])
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  if (req.method === 'GET' && slug.length === 2) {
    return getUserPurchases(slug[0])
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  if (req.method === 'GET' && slug.length === 3) {
    return getTeamPurchases(slug[0], slug[1])
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
  if (req.method === 'POST') {
    return makePurchase(slug[0])
      .then((response) => {
        console.log('Purchase complete', response)
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}