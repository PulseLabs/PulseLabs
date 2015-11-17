angular.module('pulse.playlist', [])
.controller('PlaylistController', function ($scope, $http, Songs, $location, $state, $stateParams) {
  $scope.tracks = [];
  $scope.currentPlaylist = {};


  $scope.getPlaylist = function (code) {
    console.log('playlist code: ', code);
    Songs.getPlaylist(code)
    .then(function (playlist) {
      $scope.currentPlaylist = {};
    });
  };

  if ($stateParams.code) {
    $scope.getPlaylist($stateParams.code);
  }

  $scope.searchTrack = function () {
    if ($scope.search !== '') {
      var searchStr = $scope.search.split(" ").join("+");
      Songs.searchSongs(searchStr)
      .then(function (resultData) {
        $scope.tracks = resultData.tracks.items;
      });
    }
  };

  $scope.addSong = function () {
    var code = $stateParams.code;
    if (code) {
      Songs.addSong(code)
      .then(function (addedSong) {
        res.json(addedSong);
      });
    } else {
      res.json('Please get code and submit it');
    }
  };

  $scope.addPlaylist = function () {
    Songs.addPlaylist($scope.newName)
      .then(function (playlist) {
        // console.log('playlist returned from service: ', playlist);
        $scope.currentPlaylist = playlist;
        $state.go('playlist', {code: playlist.code});
      });
  };

  // if ($location.path() != "/newPlaylist") {
  //   $scope.getPlaylist();
  // }
});
