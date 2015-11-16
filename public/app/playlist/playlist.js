angular.module('pulse.playlist', [])
.controller('PlaylistController', function ($scope, $http, Songs, $state) {
  $scope.tracks = [];
  $scope.currentPlaylist = {};

  $scope.searchTrack = function () {
    if ($scope.search !== '') {
      var searchStr = $scope.search.split(" ").join("+");
      Songs.searchSongs(searchStr)
      .then(function (resultData) {
        // console.log(result.data.tracks.items);
        $scope.tracks = resultData.tracks.items;
      });
    }
  };

  $scope.addSong = function () {
    $http({
      method: 'POST',
      url: '/api/play/add'
    }).then(function (result) {
      console.log('addsong');
      return result;
    });
  };

  $scope.addPlaylist = function () {
    Songs.addPlaylist($scope.newName)
      .then(function (playlist) {
        console.log('playlist returned from service: ', playlist);
        $scope.currentPlaylist = playlist;
        $state.go('playlist');
      });
  };
});
