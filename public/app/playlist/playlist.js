angular.module('pulse.playlist', [])
.controller('PlaylistController', function ($scope, $http, Songs, $location, $state, $stateParams) {
  $scope.tracks = [];
  $scope.currentPlaylist = {};
  $scope.pos = 0;
  $scope.audio = document.getElementById('track');

  $scope.getPlaylist = function (code) {
    console.log('playlist code: ', code);
    Songs.getPlaylist(code)
    .then(function (data) {
      $scope.tracks = data.playlist.songList;
      $scope.user = data.reqUserId;
      $scope.owner = data.user;
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

  $scope.addSong = function (track) {
    var newTrack = {
      uri: track.uri
    };

    var code = $stateParams.code;
    if (code) {
      Songs.addSong(code, track)
      .then(function (addedSong) {
        return addedSong;
      });
    } else {
      console.log('Please get code and submit it');
    }
  };

  $scope.addPlaylist = function () {
    Songs.addPlaylist($scope.newName)
      .then(function (playlist) {
        $scope.currentPlaylist = playlist;
        $state.go('playlist', {code: playlist.code});
      });
  };
});
