Locate
===========

With Locate you can easily access a visitors geolocation if his browser supports this feature.
The basic geolocation API is a bit complicated (check http://www.w3.org/TR/geolocation-API/ for more info) in my oppinion.
I hope I can make it easier to handle with all the data by using this little MooTools class.
There are so many possibilities by using location based information in your webapp.

Now you can build your own Google Buzz clone with MooTools power.
Let me know on how you used it in your webapplication.

![Screenshot](http://locate.cbeloch.de/Docs/images/logo.jpg)

How to use
----------

Include the Locate.js in your project.

Use Code like this:

	#JS
	var location = new Locate({
		onLocate: function(position){
			// Do stuff with the data position.lat and position.long
		}
	});

Want to frequently get the position (watch you visitor move)? 

	#JS
	var location = new Locate({
		loiType: 'watch',
		onLocate: function(position){
			// Do stuff with the data position.lat and position.long
		}
	});

Don't want to locate directly on initializing the Class? No problem!

	#JS
	var location = new Locate({
		loi: false
	});
	
	// start locating later in your code using this line
	// you can also use location.watcher();
	location.locate();