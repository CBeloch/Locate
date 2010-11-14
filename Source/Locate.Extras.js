/*
---

script: Locate.Extras.js
version: 1.3
description: With the Locate.Extras class you can do more things like calculating the distance to another position or get the address for the current position
license: MIT-style
authors:
- Christopher Beloch
- Matti Schneider-Ghibaudo

requires: 
  core/1.2.4: '*'
  Google Maps API v2 for address()

provides: [Number.cardinalDirection(), Number.toRadians(), Locate.distanceTo(), Locate.address()]

...
*/


Number.implement({
	/**Considering this number as a heading (in degrees), returns a String like "N", "SW"… describing the pointed direction.
	*/
	cardinalDirection: function() {
		var heading = this % 360;
		
		var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
		
		for (var h = 22.5, i = 0; h < 360; h += 45, i++)
			if (heading <= h)
				return directions[i];
	},
	
	/**Considering this number in degrees, returns its equivalent in radians over [0, 2π].
	*/
	toRadians: function() {
		return (this % 360) / 180 * Math.PI;
	}
});

Locate.implement({
	/**Returns the distance (in kilometers) from the given (lat, long) couple to the latest recorded user position.
	*Uses the harvesine formula, as described in http://www.movable-type.co.uk/scripts/latlong.html .
	*/
	distanceTo: function(dlat, dlong){
		if (! this.position)
			return null;
	
		var earthRadius = 6371; // km

		dlat = (dlat - this.position.latitude).toRadians() / 2;
		dlong = (dlong - this.position.longitude).toRadians() / 2;
		var a = Math.sin(dlat) * Math.sin(dlat)
				+ Math.cos(this.position.latitude.toRadians()) * Math.cos(this.position.longitude.toRadians())
				* Math.sin(dlong) * Math.sin(dlong);
		
		return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	},
	
	address: function(){
		// This function requires an initialized GMaps (Google Maps)
		if (! this.geocoder)
			this.geocoder = new GClientGeocoder();
		
		var latlng = new GLatLng(this.position.latitude,this.position.longitude);
		this.geocoder.getLocations(latlng, this.setAddress.bind(this));
	},
	
	setAddress: function(response){
		$extend(this.position, {
			address: response.Placemark[0].address
		});
	}
	
});