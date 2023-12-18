const { createFile, test, createUser, updateScript, uploadIcon } = require('../controllers/creator');
const multer  = require('multer');
const { testWebhook } = require('../controllers/webhooks');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+".svg")
    }
  })
const upload = multer({ storage })

const route = require('express').Router();

route.get('/',test);
route.get('/createFile',createFile);
route.post('/createUser',upload.none(),createUser);
route.post('/updateScript',upload.none(),updateScript);
route.post('/uploadIcon',upload.single('icon'),uploadIcon);

// webhook
route.post('/customers/data_request',upload.none(),testWebhook);
route.post('/customers/redact',upload.single('icon'),testWebhook);
route.post('/shop/redact',upload.single('icon'),testWebhook);

module.exports = route;