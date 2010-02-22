/*
---

script: Locate.js
version: 1.0
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
		loiType: 'locate' // locate OR watch
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
		this.position = {
			// For the future I use the full name for the variables!
			// I keep the old long and lat variables for compatibility reasons
			lat: position.coords.latitude,
			latitude: position.coords.latitude,
			long: position.coords.longitude,
			longitude: position.coords.longitude,
			altitude: position.coords.altitude, // null if not supported, meters above the WGS84 ellipsoid
			accuracy: position.coords.accuracy,	// specified in meters
			heading: position.coords.heading, // null if not supported, specified in degrees counting clockwise to true north
			speed: position.coords.speed // null if not supported, specified in meters per second 
		};
	
		this.fireEvent("locate", this.position);		
	},
	handleError: function(error){
		this.fireEvent("error", error.message)
	},
	
	locate: function(){
		navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.handleError);
	},
	
	watcher: function(){
		// have to call it 'watcher'
		// 'watch' is causing errors on Firefox, MobileSafari works perfect
		this.watchId = navigator.geolocation.watchPosition(this.setPosition.bind(this), this.handleError);
	},
	
	stopWatcher: function(){
		this.watchId = navigator.geolocation.clearWatch(this.watchId);		
	}
});