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
		loi: true // loi = locate on init
	},
	
	initialize: function(options){
		this.setOptions(options);
		
		thisBind = this; // Need some bind variable for later, don't know it better
		
		if(this.options.loi)
			this.locate();
	},
	
	locate: function(){
		if (navigator.geolocation)    
			navigator.geolocation.getCurrentPosition(this.setPosition);
		else
			this.fireEvent("error");
	},
	
	setPosition: function(position){
		this.position = {
			lat: position.coords.latitude,
			long: position.coords.longitude
		};
		
		thisBind.fireEvent("locate", this.position);		
	}
});