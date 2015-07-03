muniButlerApp.controller('HomeController', function ($scope, $state, User, Autocomplete, GoogleMaps, $cordovaGeolocation) {
  // controller for the home page
  // author: Albert Tang

  // grab any saved route information from the User factory
  $scope.routes = User.routes;
  $scope.empty = Object.keys(User.routes).length === 0;

  // object for temporary user information
  $scope.user = {
    from: "Finding current location..."
  };

  // has the autocomplete updated the input values?
  $scope.enter = false;

  // submit function
  $scope.submit = function (validation) {
    if (!validation) { return; }
    // update User information in the User factory
    User.trip = {
      to: $scope.user.to,
      from: $scope.user.from
    };
    // the RoutesController at /routes will handle this information
    $state.go('home.display');
  };

  // change latitude/longitude into actual addresses and update the from address
  function success(position) {
    var pos;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        pos = results[0].formatted_address;
        $scope.user.from = pos;
        $scope.$apply();
      }
    });
    $scope.setMap(latlng);
  }

  function error() {
    console.log('Geolocation failed');
    $scope.setMap(new google.maps.LatLng(37.7837235, -122.4089778));
  }

  // use the GoogleMaps factory to update the map
  $scope.setMap = function (location) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 18,
      center: location
    };
    var map = new google.maps.Map(document.getElementById('routes-map'), mapOptions);
    directionsDisplay.setMap(map);
  };

  // =================================
  //   FUNCTIONS THAT RUN ON LOAD
  // =================================

  // use the Autocomplete factory to set up autocomplete
  Autocomplete.initialize($scope);

  // use HTML5 to find the current location
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(success, error);
  // }

  document.addEventListener("deviceready", function () {
    console.log('DEVICE IS READY');
    var options = {
      timeout: 10000,
      enableHighAccuracy: false
    };

    $cordovaGeolocation.getCurrentPosition(options).then(success, error);
  });

});
