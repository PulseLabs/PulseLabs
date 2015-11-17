angular.module('pulse.factory', [])
.factory('Songs', function ($http, $state) {

  var searchSongs = function(searchStr) {
    return $http({
      method: 'GET',
      withCredentials: false,
      url: 'https://api.spotify.com/v1/search?q='+searchStr+'&type=track'
    })
    .then(function (resp) {

      return resp.data;
    });
  };

  var getPlaylist = function (code) {
    return $http({
      method: 'GET',
      url: '/api/play/' + code,
      data: {}
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPlaylist = function (name) {
    return $http({
      method: 'POST',
      url: '/api/play/create',
      data: {name: name}
    })
    .then(function (resp) {
      console.log('resp from create api call: ', resp.data);
      return resp.data;
    });
  };

  var addSong = function (code, data) {
    // if code exist
    return $http({
      method: 'POST',
      url: '/api/play/' + code +'/add',
      data: data
    });
  };

  return {
    addSong: addSong,
    searchSongs: searchSongs,
    getPlaylist: getPlaylist,
    addPlaylist: addPlaylist
  };
});
