angular.module('pulse.playlist', [])
.controller('PlaylistController', function ($scope, $http, Songs, $location, $state, $stateParams) {
  $scope.tracks = [];
  $scope.currentPlaylist = {};
  $scope.pos = 0;

  $scope.audio = document.getElementById('track');
  $scope.audio.addEventListener('ended', function(){
    console.log("audio has ended...going to next song");
    $scope.pos += 1;
    $scope.audio.src = $scope.playlist[$scope.pos];
  });


  $scope.getPlaylist = function (code) {
    console.log('playlist code: ', code);
    Songs.getPlaylist(code)
    .then(function (data) {
      $scope.tracks = data.playlist.songList;
      $scope.user = data.reqUserId;
      $scope.owner = data.userid;
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
        // console.log('playlist returned from service: ', playlist);
        $scope.currentPlaylist = playlist;
        // console.log(playlist.code);
        $state.go('playlist', {code: playlist.code});
      });
  };

  // if ($location.path() != "/newPlaylist") {
  //   $scope.getPlaylist();
  // }
});
