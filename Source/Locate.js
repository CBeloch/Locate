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
		
		thisBind = this; // Need some bind variable for later, don't know it better
		
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
		thisBind.position = {
			lat: position.coords.latitude,
			long: position.coords.longitude
		};
	
		thisBind.fireEvent("locate", thisBind.position);		
	},
	handleError: function(error){
		this.fireEvent("error", error.message)
	},
	
	locate: function(){
		if (navigator.geolocation)    
			navigator.geolocation.getCurrentPosition(this.setPosition, this.handleError);
		else
			this.fireEvent("error", "geolocation is not supported");
	},
	
	watcher: function(){
		// have to call it 'watcher'
		// 'watch' is causing errors on Firefox, MobileSafari works perfect
		if (navigator.geolocation)    
			this.watchId = navigator.geolocation.watchPosition(this.setPosition, this.handleError);
		else
			this.fireEvent("error", "geolocation is not supported");
	},
	
	stopWatcher: function(){
		if (navigator.geolocation)    
			this.watchId = navigator.geolocation.clearWatch(this.watchId);
		else
			this.fireEvent("error", "geolocation is not supported");
		
	}
});