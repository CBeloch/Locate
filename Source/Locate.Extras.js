/*
---

script: Locate.Extras.js
version: 1.3
description: With the Locate.Extras class you can do more things like calculating the distance to another position or get the address for the current position
license: MIT-style
authors:
- Christopher Beloch

requires: 
  core/1.2.4: '*'
  Google Maps API v2 for address()

provides: [Locate.distanceTo(), Locate.address()]

...
*/

Number.extend({
	// Converts the number in degrees to the radian equivalent
	deg2rad: function(angle){
		return angle / 180 * Math.PI;
	}
});

Locate.implement({
	distanceTo: function(dlat, dlong){
		if(!this.position)
			return null;
	
		// Used this: http://www.movable-type.co.uk/scripts/latlong.html
		earthRadius = 6371; // km

		dLat = Number.deg2rad(dlat-this.position.latitude);
		dLon = Number.deg2rad(dlong-this.position.longitude); 
		a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.position.latitude * Math.PI/180 ) * Math.cos(this.position.longitude * Math.PI/180 ) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		distance = earthRadius * c;
		
		return distance;	
	},
	
	address: function(){
		// This function requires an initialized GMaps (Google Maps)
		if(!this.geocoder)
			this.geocoder = new GClientGeocoder();
		
		latlng = new GLatLng(this.position.latitude,this.position.longitude);
		this.geocoder.getLocations(latlng, this.setAddress.bind(this));
	},
	
	setAddress: function(response){
		$extend(this.position, {
			address: response.Placemark[0].address
		});
	}
	
});