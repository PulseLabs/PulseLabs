angular.module('pulse.playlist', [])
.controller('PlaylistController', function ($scope, $http) {
  $scope.tracks = [];
  $scope.searchTrack = function () {
    var searchStr = $scope.search.split(" ").join("+");
    console.log(searchStr);
    $http({
      method: 'GET',
      withCredentials: false,
      url: 'http://api.spotify.com/v1/search?q='+searchStr+'&type=track'
    }).then(function (result) {
      console.log(result.data.tracks.items);
      $scope.tracks = result.data.tracks.items;
    })
  };
});
