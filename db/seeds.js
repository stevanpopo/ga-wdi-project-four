const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Treatment = require('../models/treatment');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    username: 'Steve',
    email: 's@s.s',
    password: 's',
    passwordConfirmation: 's',
    image: 'https://pbs.twimg.com/profile_images/826712998429458432/EOXWrevI.jpg'
  },{
    username: 'Dave',
    email: 'd@d.d',
    password: 'd',
    passwordConfirmation: 'd',
    image: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_584,q_auto:eco,w_920/https://inews.co.uk/wp-content/uploads/2018/05/Dave-rapper.jpg'
  }])
    .then(users => {
      console.log(`${users.length} users created.`);
      return Treatment.create([{
        dateTime: new Date('July 17, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 17, 2018 18:00:00'),
        title: 'Kidney care @ Edgware Hospital',
        completed: false,
        owner: users[0],
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1986133/580/386/m1/fpnw/wm0/calendar-flat-line-icon-01-.jpg',
        notes: 'Will do blood test and dialysis treatment.'
      },{
        dateTime: new Date('July 18, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 19, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 20, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 17, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[1],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 19, 2018 18:00:00'),
        title: 'Kidney care @ Royal Free Hospital',
        completed: false,
        owner: users[0],
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1986133/580/386/m1/fpnw/wm0/calendar-flat-line-icon-01-.jpg',
        notes: 'Will do blood test and dialysis treatment.'
      }]);
    })
    .then(treatments => console.log(`${treatments.length} treatments created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
