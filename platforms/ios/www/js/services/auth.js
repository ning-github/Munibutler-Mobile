muniButlerApp.factory('Auth', function ($rootScope, $http) {
  var check = function () {
    return $http.get($rootScope.serverUrl + '/api/user', {
      withCredentials: true
    });
  };

  var update = function (user) {
    console.log("user: ", user);
    return $http.put($rootScope.serverUrl + '/api/user', user, {
      withCredentials: true
    });
  };

  var logout = function () {
    return $http.get($rootScope.serverUrl + '/api/logout', {
      withCredentials: true
    });
  };

  return {
    check: check,
    logout: logout, 
    update: update
  };
});
