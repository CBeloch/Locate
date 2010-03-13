/*
---

script: Locate.js
version: 1.2
description: With the Locate class you can retrieve the current position of your visitors
license: MIT-style
authors:
- Christopher Beloch

requires: 
  core:1.2.4

provides: [Locate]

...
*/

var Locate = new Class({
	Implements: [Options, Events],
	options: {
		loi: true, // loi = locate on init
		loiType: 'locate', // locate OR watch
		positionOptions: {
			enableHighAccuracy: true, // may result in slower response times or increased power consumption if true
			timeout: 0, // expressed in milliseconds, can correspond in an error event on timeout
			maximumAge: 500 // specified time in milliseconds
		}
	},
	
	initialize: function(options){
		this.setOptions(options);
				
		if(!navigator.geolocation)  
		{
			this.fireEvent("error", "geolocation is not supported");
			return false;
		}

		if(this.options.loi){
			switch(this.options.loiType){
				case 'locate':
					this.locate();
					break;
				case 'watch':
					this.watcher();
					break;
				default:
					this.fireEvent("error", "loiType unknown");
			}
		}
	},
	
	setPosition: function(position){
		this.position = position.coords;
		this.position.cardinalDirection = this.cardinalDirection();
		this.fireEvent("locate", this.position);		
	},
	handleError: function(error){
		this.fireEvent("error", "Error " + error.code + " - " + error.message)
	},
	
	locate: function(){
		navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.handleError, this.options.positionOptions);
	},
	
	watcher: function(){
		// have to call it 'watcher'
		// 'watch' is causing errors on Firefox, MobileSafari works perfect
		this.watchId = navigator.geolocation.watchPosition(this.setPosition.bind(this), this.handleError, this.options.positionOptions);
	},
	
	stopWatcher: function(){
		this.watchId = navigator.geolocation.clearWatch(this.watchId);		
	},
	
	cardinalDirection: function(){
		if(!this.position.heading) // if heading is null
			return null;
		if(this.position.heading >= 337.5 || (this.position.heading >= 0 && this.position.heading <= 22.5))
			return "N";
		if(this.position.heading >= 22.5 && this.position.heading <= 67.5)
			return "NE";
		if(this.position.heading >= 67.5 && this.position.heading <= 112.5)
			return "E";
		if(this.position.heading >= 112.5 && this.position.heading <= 157.5)
			return "SE";
		if(this.position.heading >= 157.5 && this.position.heading <= 202.5)
			return "S";
		if(this.position.heading >= 202.5 && this.position.heading <= 247.5)
			return "SW";
		if(this.position.heading >= 247.5 && this.position.heading <= 292.5)
			return "W";
		if(this.position.heading >= 292.5 && this.position.heading <= 337.5)
			return "NW";
	},
	
	distanceTo: function(dlat, dlong){
		if(!this.position)
			return null;
	
		// Used this: http://www.movable-type.co.uk/scripts/latlong.html
		
		earthRadius = 6371; // km
		dLat = (dlat-this.position.latitude) * Math.PI/180 ;
		dLon = (dlong-this.position.longitude) * Math.PI/180 ; 
		a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.position.latitude * Math.PI/180 ) * Math.cos(this.position.longitude * Math.PI/180 ) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		distance = earthRadius * c;
		
		return distance;	
	}
});
