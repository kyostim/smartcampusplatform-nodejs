const Thing = require('../models/thing');

exports.getAddThing = (req, res, next) => {
  res.render('admin/edit-thing', {
    pageTitle: 'Add Thing',
    path: '/admin/add-thing',
    editing: false
  });
};


exports.getaddFeutures = (req, res, next) => {
  Thing.findAll()
    .then(features => {
      res.render('shop/edit-feature', {
        feats: features,
        pageTitle: 'Add Features',
        path: '/admin/add-feature'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddThing = (req, res, next) => {
  const name = req.body.name;
/*   const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description; */
  req.user
    .createThing({
      name: name,
/*       price: price,
      imageUrl: imageUrl,
      description: description */
    })
    .then(result => {
      // console.log(result);
      console.log('Created Thing');
      res.redirect('/admin/things');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditThing = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const thi_Id = req.params.thingId;
  req.user
    .getThings({ where: { id: thi_Id } })
    // Thing.findByPk(thi_Id)
    .then(things => {
      const thing = things[0];
      if (!thing) {
        return res.redirect('/');
      }
      res.render('admin/edit-thing', {
        pageTitle: 'Edit Thing',
        path: '/admin/edit-thing',
        editing: editMode,
        thing: thing
      });
    })
    .catch(err => console.log(err));
};

exports.postEditThing = (req, res, next) => {
  const thi_Id = req.body.thingId;
  const updatedTitle = req.body.name;
/*   const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description; */
  Thing.findByPk(thi_Id)
    .then(thing => {
      thing.name = updatedTitle;
/*       thing.price = updatedPrice;
      thing.description = updatedDesc;
      thing.imageUrl = updatedImageUrl; */
      return thing.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/things');
    })
    .catch(err => console.log(err));
};

exports.getThings = (req, res, next) => {
  req.user
    .getThings()
    .then(things => {
      res.render('admin/things', {
        prods: things,
        pageTitle: 'Admin Things',
        path: '/admin/things'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteThing = (req, res, next) => {
  const thi_Id = req.body.thingId;
  Thing.findByPk(thi_Id)
    .then(thing => {
      return thing.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/things');
    })
    .catch(err => console.log(err));
};
