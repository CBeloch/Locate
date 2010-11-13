Locate
======

The Locate class is an easy-to-use MooTools interface over the W3C's Geolocation API.

![Screenshot](http://locate.cbeloch.de/Docs/images/logo.jpg)

How to use
----------

Include the Locate.js in your project.

Use Code like this:

	#JS
	var location = new Locate({
		onLocate: function(position){
			alert('latitude: ' + position.latitude, '; longitude: ' + position.longitude + '; accuracy: ' + position.accuracy);
		}
	});
	
_See below for more details about `position` fields._

Want to frequently get the position (watch your visitor move)? 

	#JS
	var location = new Locate({
		loiType: 'watch',
		onLocate: function(position){
			// Do stuff with the position data
		}
	});

Want to locate directly on instanciation? No problem!

	#JS
	var location = new Locate({
		loi: true
	});

Locating is deactivated by default, since this would display a request to the user to share its location, possibly through a modal (Safari 5), which is aggressive behaviour and lowers your chances of the user accepting to share its location.
	
	// start locating using this line
	location.locate();
	// you could also use location.watcher();

Want to get the distance from the current position to another?
No problem, the function distanceTo() returns the distance in km:

	#JS
	var location = new Locate({
		loiType: 'watch',
		onLocate: function(position){
			$("distance").set('html', this.distanceTo(37.3316591, -122.0301778));
		}
	});

Position data
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
* position.cardinalDirection
  - not part of the official W3C specifications!
  - can be null
  - returns the heading direction as string (cardinal direction): "N", "NE", "E" etc.
* position.speed
  - null if not supported, specified in meters per second

If you use Locate.Extras, you can also use

* position.address
  - returns your current address based on GMaps
  - If you want to use this feature, use this.address() within the onLocate function
  - You have to use the watcher method atm, working on a fix
  
ToDo
----

* make position.address work without watcher method
* find an alternative to GMaps