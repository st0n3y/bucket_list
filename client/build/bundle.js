/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var countries = JSON.parse( localStorage.getItem("countries")) || [];
	var Map = __webpack_require__(1)
	
	window.onload = function(){
	  var url = "https://restcountries.eu/rest/v1"
	  var request = new XMLHttpRequest();
	  var center = {lat: 56, lng: -3};
	  map = new Map(center, 3);
	
	  request.open("GET", url);
	  request.onload =function(){
	    if(request.status ===200){
	      console.log("WOOOOO");
	      var jsonString = request.responseText;
	      var countries = JSON.parse(jsonString);
	      populateSelect(countries);
	      bindEvents(countries);
	    }
	  }
	
	  request.send(null);
	};
	
	function bindEvents(countries) {
	  var url = "http://localhost:3000/countries";
	  var selectBox = document.getElementById("country-select")
	  selectBox.onchange = function(event) {
	
	    // var countryInfo = document.getElementById("country-info");
	    // var li1 = document.createElement("li");
	    // var li2 = document.createElement("li");
	    // var li3 = document.createElement("li");
	    // var li4 = document.createElement("li");
	
	    // li1.innerText = "Country Name: " + countries[event.target.value].name;
	    // li2.innerText = "Capital: " + countries[event.target.value].capital;
	    // li3.innerText = "Population: " + countries[event.target.value].population + " people";
	    // li4.innerText = "Region: " + countries[event.target.value].region;
	
	    // countryInfo.appendChild(li1);
	    // countryInfo.appendChild(li2);
	    // countryInfo.appendChild(li3);
	    // countryInfo.appendChild(li4);
	
	
	    var form = document.getElementById("add-country");
	    var nameInput = document.getElementById("name");
	    var capitalInput = document.getElementById("capital");
	    var popInput = document.getElementById("population");
	    var regionInput = document.getElementById("region");
	
	    nameInput.value = countries[event.target.value].name;
	    capitalInput.value = countries[event.target.value].capital;
	    popInput.value = countries[event.target.value].population;
	    regionInput.value = countries[event.target.value].region;
	
	    var coords = countries[event.target.value].latlng;
	    var latLng = {
	      lat: coords[0],
	      lng: coords[1]
	    }
	    console.log(latLng);
	    map.addMarker(latLng);
	
	    form.onsubmit = function(e) {
	      e.preventDefault();
	      var country = {
	        name: document.querySelector("#name").value,
	        capital: document.querySelector("#capital").value,
	        poulation: parseFloat(document.querySelector("#population").value),
	        region: document.querySelector("#region").value
	      }
	      console.log(country);
	
	      var request = new XMLHttpRequest();
	      request.open("POST", url);
	      request.setRequestHeader("Content-Type", "application/json");
	      request.onload = function() {
	        console.log("Added a new country");
	      }
	      request.send(JSON.stringify(country));
	    }
	
	  }
	
	};
	
	function populateSelect(countries) {
	  var selectBox = document.getElementById("country-select");
	
	  for(var i = 0; i < countries.length; i++) {
	    var countryOption = document.createElement("option");
	    countryOption.text = countries[i].name;
	    countryOption.value = i;
	    selectBox.appendChild(countryOption);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Map = function(latLng, zoom) {
	
	  this.googleMap = new google.maps.Map(document.getElementById("map"), {
	    center: latLng,
	    zoom: zoom
	  });
	
	  this.addMarker = function(latLng) {
	    var marker = new google.maps.Marker({
	      position: latLng,
	      map: this.googleMap
	    })
	  return marker
	  }
	
	};
	
	module.exports = Map;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map