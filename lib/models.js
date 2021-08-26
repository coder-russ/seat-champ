import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'


const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export function postCartItem(item) {
  return client.connect()
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      return collection.insertOne(item)
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

export function removeCartItem(id) {
  return client.connect()
  .then((response) => {
    // console.log('Connected to mongoDB', response)
    const collection = client.db("mydb").collection("cart");
    return collection.deleteOne({'_id': ObjectId(`${id}`)})
  })
  .then((response) => {
    client.close()
    return response;
  })
  .catch((err) => {
    return err
  });
}

export function getCartItems(user) {
  return client.connect()
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      const query = {
        email: user,
        purchased: false,
      };
      return collection.find(query).toArray()
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

export function makePurchase(email) {
  return client.connect()
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      const filter = {
        email: email,
        purchased: false,
      };
      const updateDoc = {
        $set: {
          purchased: true,
        },
      };
      return collection.updateMany(filter, updateDoc)
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

export function getUserPurchases(user) {
  return client.connect()
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      const query = {
        email: user,
        purchased: true,
      };
      return collection.find(query).toArray()
    })
    .then((data) => {
      client.close()
      return data;
    })
    .catch((err) => err);
}

export function getTeamPurchases(teamOne, teamTwo) {
  return client.connect()
    .then(() => {
      const collection = client.db("mydb").collection("cart");
      const queryOne = {
        team: teamOne,
        purchased: true,
      };
      const queryTwo = {
        team: teamTwo,
        purchased: true,
      };
      return Promise.all([collection.find(queryOne).toArray(), collection.find(queryTwo).toArray()])
    })
    .then((array) => {
      client.close()
      return array;
    })
    .catch((err) => err);
}

export function getAllPurchases() {
  return client.connect()
  .then(() => {
    const collection = client.db("mydb").collection("cart");
    const query = {
      purchased: true,
    };
    return collection.find(query).toArray()
  })
  .then((data) => {
    client.close()
    return data;
  })
  .catch((err) => err);
}

