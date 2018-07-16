const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Treatment = require('../models/treatment');
const Record = require('../models/record');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    username: 'Steve',
    email: 's@s.s',
    password: 's',
    passwordConfirmation: 's',
    image: 'https://pbs.twimg.com/profile_images/826712998429458432/EOXWrevI.jpg',
    patient: true,
    telephone: 7530486805,
    lovedOnes: ['a@a.a', 'm@m.m']
  },{
    username: 'Dave',
    email: 'd@d.d',
    password: 'd',
    passwordConfirmation: 'd',
    image: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_584,q_auto:eco,w_920/https://inews.co.uk/wp-content/uploads/2018/05/Dave-rapper.jpg',
    patient: true,
    telephone: 7530486805
  },
  {
    username: 'Ana',
    email: 'a@a.a',
    password: 'a',
    passwordConfirmation: 'a',
    image: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_584,q_auto:eco,w_920/https://inews.co.uk/wp-content/uploads/2018/05/Dave-rapper.jpg',
    patient: false,
    telephone: 7530486805,
    lovedOnes: ['s@s.s', 'm@m.m']
  },{
    username: 'Marko',
    email: 'm@m.m',
    password: 'm',
    passwordConfirmation: 'm',
    image: 'https://res.cloudinary.com/jpress/image/fetch/c_fill,f_auto,h_584,q_auto:eco,w_920/https://inews.co.uk/wp-content/uploads/2018/05/Dave-rapper.jpg',
    patient: false,
    telephone: 7530486805,
    lovedOnes: ['a@a.a', 's@s.s']
  }])
    .then(users => {
      console.log(`${users.length} users created.`);
      Treatment.create([{
        dateTime: new Date('July 12, 2018 06:00:00'),
        title: 'Morning pills x 3 - this is the new date',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 14, 2018 06:00:00'),
        title: 'Morning pills x 3',
        completed: false,
        owner: users[0],
        image: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775_960_720.jpg',
        notes: 'To be taken before eating breakfast.'
      },{
        dateTime: new Date('July 16, 2018 10:00:00'),
        title: 'Kidney care @ Edgware Hospital',
        completed: false,
        owner: users[0],
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1986133/580/386/m1/fpnw/wm0/calendar-flat-line-icon-01-.jpg',
        notes: 'Will do blood test and dialysis treatment.'
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
        dateTime: new Date('July 15, 2018 06:00:00'),
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

      return Record.create([{
        user: users[0],
        weight: 100,
        blood: 140,
        glucose: 7.8,
        createdAt: new Date('July 7, 2018 06:00:00')
      }, {
        user: users[0],
        weight: 98,
        blood: 142,
        glucose: 7.2,
        createdAt: new Date('July 9, 2018 06:00:00')
      }, {
        user: users[0],
        weight: 96,
        blood: 148,
        glucose: 7.6,
        createdAt: new Date('July 10, 2018 06:00:00')
      }, {
        user: users[0],
        weight: 99,
        blood: 145,
        glucose: 8.6,
        createdAt: new Date('July 11, 2018 06:00:00')
      },{
        user: users[0],
        weight: 98,
        blood: 146,
        glucose: 8.4,
        createdAt: new Date('July 12, 2018 06:00:00')
      },{
        user: users[1],
        weight: 98,
        blood: 146,
        glucose: 7.9,
        createdAt: new Date('July 10, 2018 06:00:00')
      },{
        user: users[1],
        weight: 104,
        blood: 148,
        glucose: 8.6,
        createdAt: new Date('July 12, 2018 06:00:00')
      },{
        user: users[1],
        weight: 100,
        blood: 149,
        glucose: 8.3,
        createdAt: new Date('July 14, 2018 06:00:00')
      }]);

    })
    .then(treatments => console.log(`${treatments.length} treatments created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
