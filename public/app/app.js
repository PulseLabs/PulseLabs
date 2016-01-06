angular.module('pulse', ['ngCookies', 'ui.router', 'pulse.playlist','pulse.factory'])
.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common.Accept = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: '/app/main/main.html',
      controller: 'MainController'
    })
    .state('user', {
      url: '/user',
      templateUrl: '/app/user/user.html',
      controller: 'UserController'
    })
    .state('newplaylist', {
      url: '/newplaylist',
      templateUrl: '/app/playlist/newplaylist.html',
      controller: 'PlaylistController'
    })
    .state('playlist', {
      url: '/playlist/:code',
      templateUrl: '/app/playlist/playlist.html',
      controller: 'PlaylistController'
    });

  $urlRouterProvider.otherwise('/main');
  $httpProvider.interceptors.push('AttachTokens');
});
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
