var koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');
var serve = require('koa-static');

var app = koa();
var router = new Router();

app.use(views(__dirname + '/views', {
	  extension: 'pug',
	  map: {
		      html: 'pug'
	  }
}));

router.get('/', function *() {
	  yield this.render('index', { msg: 'Yeah!' });
});

app.use(router.middleware());
app.use(serve('./public'));
app.listen(3000);
