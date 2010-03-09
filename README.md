Locate
======

With Locate you can easily access a visitors geolocation if his browser supports this feature.
The basic geolocation API is a bit complicated (check [W3C Geolocation API Specification](http://www.w3.org/TR/geolocation-API/) for more info) in my oppinion.
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
			// Do stuff with the position data
		}
	});

Want to frequently get the position (watch your visitor move)? 

	#JS
	var location = new Locate({
		loiType: 'watch',
		onLocate: function(position){
			// Do stuff with the position data
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

position data
-------------

The position data given with the event 'locate' looks like this:

* position.latitude
* position.longitude
* position.altitude
  - null if not supported, meters above the WGS84 ellipsoid
* position.accuracy
  - specified in meters
* position.altitudeAccuracy
  - specified in meters
* position.heading
  - null if not supported, specified in degrees counting clockwise to true north
* position.speed
  - null if not supported, specified in meters per second