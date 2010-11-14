Locate
======

The Locate class is a MooTools interface over the W3C's Geolocation API, allowing for MooTools-style events listening and masking cross-browser API differences.

![Screenshot](http://locate.cbeloch.de/Docs/images/logo.jpg)

Locate.Extras
-------------

Locate can optionally provide Locate.Extras, a set of geography-related functions that cleanly extend either Locate or Number.
See below for more details.

How to use
----------

Include the Locate.js in your project.
You can then start locating like this:

	var myLocator = new Locate({
		onLocate: function(position){
			alert('latitude: ' + position.latitude, '; longitude: ' + position.longitude + '; accuracy: ' + position.accuracy);
		}
	});
	//…
	//wait for user to ask geolocation
	//…
	myLocator.locate()
	
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

To get the distance from the current position to another, use the function `distanceTo()` that returns the distance in km:

	myLocator.addEvent('locate', function(position) {
		$('distance').set('html', myLocator.distanceTo(37.3316591, -122.0301778));
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
* position.speed
  - specified in meters per second, or `null` if not supported

If Locate.Extras is included, you can easily get the following:

* headed cardinal direction
	- use position.heading.cardinalDirection()
	- returns the heading direction as string (cardinal direction): "N", "NE", "E"…
* position.address
	- returns your current address based on GMaps
	- If you want to use this feature, use this.address() within the onLocate function
	- You have to use the watcher method atm, working on a fix

Locate.Extras
=============

Provides:
* `Number.cardinalDirection()`
	- considering this number as a heading (in degrees), returns a String like "N", "SW"… describing the pointed direction.
* `Number.toRadians()`
	- considering this number in degrees, returns its equivalent in radians over [0, 2π].
* `Locate.distanceTo(long, lat)`
	- returns the distance (in kilometers) from the given (lat, long) couple to the latest recorded user position.
	- uses the harvesine formula, as described in http://www.movable-type.co.uk/scripts/latlong.html.
* `Locate.address()`

ToDo
====

* make position.address work without watcher method
* find an alternative to GMaps