const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Thing = require('./models/thing');
const Feature = require('./models/feature')
const User = require('./models/user');
const Monitorcart = require('./models/monitorcart');
const CartItem = require('./models/cart-item');
const Selection = require('./models/selection');
const SelectionItem = require('./models/selection-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Thing.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Thing);
User.hasOne(Monitorcart);
Monitorcart.belongsTo(User);
Monitorcart.belongsToMany(Thing, { through: CartItem });
Thing.belongsToMany(Monitorcart, { through: CartItem });
Selection.belongsTo(User);
User.hasMany(Selection);
Selection.belongsToMany(Thing, { through: SelectionItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
