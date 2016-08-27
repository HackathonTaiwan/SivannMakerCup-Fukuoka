import scriptjs from 'scriptjs';
import events from 'events';

var pending = new events.EventEmitter();
pending.setMaxListeners(0);

var store = {
	css: [],
	script: []
};

class Loader {

	css(url) {

		// It was already loaded
		if (store.css.indexOf(url) != -1)
			return;

		store.css.push(url);

		$('<link rel="stylesheet" type="text/css" href="' + url + '">').appendTo('head');
	}

	async script(url) {
		var urls;
		if (!(url instanceof Array)) {
			urls = [ url ];
		} else {
			urls = url;
		}

		for (var index in urls) {

			var url = urls[index];

			// Waiting if script is still loading
			if (pending.listenerCount(url)) {
				await new Promise(function(resolve) {
					pending.once(url, function() {
						resolve();
					});
				});

				continue;
			}

			// It was already loaded
			if (store.script.indexOf(url) != -1)
				continue;

			store.script.push(url);

			await new Promise(function(resolve, reject) {

				pending.once(url, function() {
					resolve();
				});

				scriptjs(url, function() {
					pending.emit(url);
				});
			});
		}
	}
};

export default Loader;
