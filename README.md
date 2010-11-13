Locate
======

The Locate class is an easy-to-use MooTools interface over the W3C's Geolocation API.

![Screenshot](http://locate.cbeloch.de/Docs/images/logo.jpg)

How to use
----------

Include the Locate.js in your project.

Use Code like this:

	var myLocator = new Locate({
		onLocate: function(position){
			alert('latitude: ' + position.latitude, '; longitude: ' + position.longitude + '; accuracy: ' + position.accuracy);
		}
	});
	
_See below for more details about `position` fields._

Want to frequently get the position (observe your visitor move)? 

	var location = new Locate({
		onLocate: function(position){
			// do stuff with the position data
		}
	}).observe();

Locating is deactivated by default, since this would display a request to the user to share its location, possibly through a modal (Safari 5), which is aggressive behaviour and lowers your chances of the user accepting to share its location.
However, if you want to locate your user immediately on instantiation, simply call `locate()` right after init :

	var myLocator = new Locate().locate();

Want to get the distance from the current position to another?
No problem, the function distanceTo() returns the distance in km:

	myLocator.addEvent('locate', function(position) {
		$('distance').set('html', this.distanceTo(37.3316591, -122.0301778));
	});

Position data
-------------

The position data given with the event 'locate' looks like this:

* position.latitude
* position.longitude
* position.altitude
  - meters above the WGS84 ellipsoid, or `null` if not supported
* position.accuracy
  - specified in meters
* position.altitudeAccuracy
  - specified in meters
* position.heading
  - specified in degrees counting clockwise to true north, or `null` if not supported
* position.cardinalDirection
  - not part of the official W3C specifications!
  - returns the heading direction as string (cardinal direction): "N", "NE", "E"… or `null` in case position.heading is not available
* position.speed
  - specified in meters per second, or `null` if not supported

If Locate.Extras is included, the following is also available:

* position.address
  - returns your current address based on GMaps
  - If you want to use this feature, use this.address() within the onLocate function
  - You have to use the watcher method atm, working on a fix
  
ToDo
----

* make position.address work without watcher method
* find an alternative to GMaps