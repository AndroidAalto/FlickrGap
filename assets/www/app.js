// Cordova is ready callback
//
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);        
}

// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = "";
    /*element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + new Date(position.timestamp)          + '<br />';*/
    
    initializeMap(position);
    getFlickrPhotos(position);
    
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

var map;

//Loading current position google maps
function initializeMap(position) {
	var myLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var myOptions = {
      center: myLocation,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
    
	var marker = new google.maps.Marker({
		position: myLocation,
		map: map,
		icon: "ownlocation-marker.png"
	});
 }

function getFlickrPhotos(position){
	
	var flickr_api_key = "cc9a2b55c5105899fb8c0b7480990877";
	var flickrSecret = "d929117a0f5b868f";
	
	var url = "http://api.flickr.com/services/rest/" 
	+ "?method=flickr.photos.search"
	+ "&api_key="+flickr_api_key
	+ "&per_page="+50
	+ "&min_upload_date="+"2012-01-01"
	+ "&lat="+position.coords.latitude 
	+ "&lon="+position.coords.longitude
	+ "&sort=interestingness-desc"
	+ "&radius=5"
	+ "&extras=geo&format=json&jsoncallback=?";

	console.log(url); 
	
	$.getJSON(url,function(data){
		console.log(data.photos.photo);
		
		var photos = data.photos.photo;
		
		for(photo in photos){
			
			var p = photos[photo];
			console.log(p);
			var photoUrl = "http://farm"+p.farm+".staticflickr.com/"+p.server+"/"+p.id+"_"+p.secret+"_s.jpg";
			console.log(photoUrl);
			
			var myLatLng = new google.maps.LatLng(p.latitude, p.longitude);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: photoUrl
			});
			
		}
	});

};