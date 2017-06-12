(function() {
  // Start User Controlled Example
  jwplayer('user-player').setup({
    mediaid: 'gaCRFWjn',
    file: '//content.jwplatform.com/videos/gaCRFWjn-Zq6530MP.mp4',
    // Set the available playback rates of your choice
    playbackRateControls: [0.75, 1, 1.25, 1.5]
  });
  // End User Controlled Example

  // Start Publisher Curated Example
  var seekComplete, automationComplete;
  var SLOW_PLAYBACK_RATE = 0.5;
  var PLAYBACK_TIMES = {
    startEvent: 16,
    endEvent: 19
  }; // Time in seconds of start and end of an interesting point in video

  function initPublisherPlayer(config) {
    var player = jwplayer('publisher-player').setup(config);

    // Set custom, out-of-player controls
    setupPlayerControls(player);

    // Listen if the video is at the time when we want to change playback rate
    player.on('time', automatePlayback.bind(this, player));
  }

  function setupPlayerControls(player) {
    var playBtn = document.querySelector('.play-btn');
    var pauseBtn = document.querySelector('.pause-btn');

    playBtn.addEventListener('click', function(e) {
      player.play(true);
      toggleControls(playBtn, pauseBtn);
    });

    pauseBtn.addEventListener('click', function(e) {
      player.pause(true);
      toggleControls(pauseBtn, playBtn);
    });

    player.on('complete', toggleControls.bind(this, pauseBtn, playBtn));
  }

  function toggleControls(currentBtn, otherBtn) {
    currentBtn.style.display = 'none';
    otherBtn.style.display = 'block';
  }

  function automatePlayback(player) {
    var position = Math.floor(player.getPosition());
    var timeBox = document.querySelector('.publisher-player-time');
    // Demo video is less than one minute long; you may want to build/install a time formatter.
    timeBox.innerHTML = '00:' + (position.toString().length > 1 ? '' : '0') + position;

    // If automation is complete, do nothing
    if (automationComplete) {
      return;
    }

    // If seek action hasn't yet occurred, attempt it
    if (!seekComplete) {
      seekVideo(player, position);    
      return;
    }

    // If seek action has occured and playback rate hasn't been set back to normal,
    // attempt to reset it
    resetPlaybackRate(player, position);
  }

  function seekVideo(player, currentTime) {
    if (currentTime >= PLAYBACK_TIMES.endEvent) {
      seekComplete = true;

      // Rewind video to start of the interesting action
      player.seek(PLAYBACK_TIMES.startEvent);

      // Slow playback rate on replay of the interesting action
      player.setPlaybackRate(SLOW_PLAYBACK_RATE);
    }
  }

  function resetPlaybackRate(player, currentTime) {
    if (currentTime >= PLAYBACK_TIMES.endEvent) {
      // We have reached end of the interesting action and need to reset the playback to normal
      player.setPlaybackRate(1);
      automationComplete = true;
    }
  }

  initPublisherPlayer({
    mediaid: 'QcK3l9Uv',
    file: '//content.jwplatform.com/videos/QcK3l9Uv-Zq6530MP.mp4',
    controls: false,
    autostart: false
  });
  // End Publisher Curated Example
}());
