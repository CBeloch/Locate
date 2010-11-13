/*
---

script: Locate.js
version: 1.4 {MSG}
description: An easy-to-use MooTools interface over the W3C's Geolocation API.
license: MIT-style
authors:
- Christopher Beloch
- Matti Schneider-Ghibaudo

requires: 
  core/1.2.4: '*'

provides: [Locate]

...
*/

var Locate = new Class({
	/**Fired events:
	* - locate(position)
	* - error({code: Number, message: String})
	*		`code` is one of the [W3C's Geolocation API](http://dev.w3.org/geo/api/spec-source-v2.html#position_error_interface) or one of:
	*		- -1: browser does not support geolocation
	*/
	Implements: [Options, Events],
	
	options: {
		position: {
			enableHighAccuracy: true, // may result in slower response times or increased power consumption if true
			timeout: 10000, // expressed in milliseconds, can correspond in an error event on timeout
			maximumAge: 5000 // specified time in milliseconds
		}
	},

/*	//instance variables
	timeout: null, //some browsers do not implement the "timeout" option, so we have to handle it ourselves
*/
	position: {},
	
	initialize: function(options){
		this.setOptions(options);
				
		if (! navigator.geolocation) {
			this.fireEvent('error', {code: -1, message: "Your browser does not support geolocation."});
			return false;
		}
	},
	
	setPosition: function(position){
		$clear(this.timeout);
		
		this.position = $merge(this.position, position.coords, {
			cardinalDirection: this.cardinalDirection()
		});
		
		this.fireEvent('locate', this.position);		
	},
	
	handleError: function(error){
		$clear(this.timeout);
		this.fireEvent('error', error);
	},
	
	locate: function(){
		$clear(this.timeout);
		this.timeout = this.fireEvent.delay(this.options.position.timeout, this, ['error', { code: 3, message: 'Timeout' }]);
		
		navigator.geolocation.getCurrentPosition(
			this.setPosition.bind(this),
			this.handleError.bind(this),
			this.options.position
		);
	},
	
	observe: function(){
		this.watchId = navigator.geolocation.watchPosition(
			this.setPosition.bind(this),
			this.handleError.bind(this),
			this.options.positionOptions
		);
	},
	
	stopObserving: function(){
		this.watchId = navigator.geolocation.clearWatch(this.watchId);		
	},
	
	cardinalDirection: function(){
		if (! $defined(this.position.heading))
			return null;
			
		var heading = this.position.heading % 360;
		
		if (heading <= 22.5)
			return "N";
		if (heading <= 67.5)
			return "NE";
		if (heading <= 112.5)
			return "E";
		if (heading <= 157.5)
			return "SE";
		if (heading <= 202.5)
			return "S";
		if (heading <= 247.5)
			return "SW";
		if (heading <= 292.5)
			return "W";
		if (heading <= 337.5)
			return "NW";
			
		return "N";
	}
});
