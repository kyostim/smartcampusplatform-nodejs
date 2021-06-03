const Thing = require('../models/thing');

exports.getThings = (req, res, next) => {
  Thing.findAll()
    .then(things => {
      res.render('shop/thing-list', {
        prods: things,
        pageTitle: 'All Things',
        path: '/things'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getThing = (req, res, next) => {
  const thi_Id = req.params.thingId;
  // Thing.findAll({ where: { id: thi_Id } })
  //   .then(things => {
  //     res.render('shop/thing-detail', {
  //       thing: things[0],
  //       pageTitle: things[0].name,
  //       path: '/things'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Thing.findByPk(thi_Id)
    .then(thing => {
      res.render('shop/thing-detail', {
        thing: thing,
        pageTitle: thing.name,
        path: '/things'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Thing.findAll()
    .then(things => {
      res.render('shop/index', {
        prods: things,
        pageTitle: 'Smartcampus',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getThings()
        .then(things => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Monitorcart',
            things: things
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const thi_Id = req.body.thingId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getThings({ where: { id: thi_Id } });
    })
    .then(things => {
      let thing;
      if (things.length > 0) {
        thing = things[0];
      }

      if (thing) {
        const oldQuantity = thing.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return thing;
      }
      return Thing.findByPk(thi_Id);
    })
    .then(thing => {
      return fetchedCart.addThing(thing, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteThing = (req, res, next) => {
  const thi_Id = req.body.thingId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getThings({ where: { id: thi_Id } });
    })
    .then(things => {
      const thing = things[0];
      return thing.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postSelection = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getThings();
    })
    .then(things => {
      return req.user
        .createSelection()
        .then(order => {
          return order.addThings(
            things.map(thing => {
              thing.selectionItem = { quantity: thing.cartItem.quantity };
              return thing;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setThings(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getSelections = (req, res, next) => {
  req.user
    .getSelections({include: ['things']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Selections',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getFeutures = (req, res, next) => {
  Thing.findAll()
    .then(features => {
      res.render('shop/feature-list', {
        feats: features,
        pageTitle: 'All Features',
        path: '/features'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
