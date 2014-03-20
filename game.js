(function() {
  var addTwitter, blockSize, blocks, buildGame, changeBlockSize, checkTwoNumbers, coords, getCoordination, high, low, manMove, middle, reset, startGame, time, timeInterval, timer, veryhigh, verylow, x, y;

  verylow = 5;

  low = 11;

  middle = 15;

  high = 25;

  veryhigh = 51;

  blocks = low;

  blockSize = null;

  time = null;

  timeInterval = null;

  x = null;

  y = null;

  coords = null;

  reset = function() {
    $('.game').empty();
    $('.message').hide();
    $('.finished').hide();
    $('.losed').hide();
    blockSize = 500 / blocks;
    time = 0;
    timeInterval = null;
    x = Math.floor(blocks / 2);
    y = 0;
    return coords = new Array(blocks);
  };

  addTwitter = function(text) {
    return $('.twitter').html("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-text=\"" + text + "'\" data-via=\"maxbuttlies\">Tweet</a>        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>");
  };

  manMove = function(x, y) {
    $('.man').css('left', x * blockSize);
    $('.man').css('top', y * blockSize);
    if (!coords[y][x].isWay) {
      $('.twitter-share-button').attr('data-text', 'test');
      $('.message').show();
      $('.losed').show();
      clearInterval(timeInterval);
      addTwitter('I dont found my way, can you find him? http://buttli.es/heimweg');
    }
    if (y === blocks - 1) {
      $('.message').show();
      $('.finished').show();
      clearInterval(timeInterval);
      return addTwitter('I found my way in ' + time + ' seconds, can you find him? http://buttli.es/heimweg');
    }
  };

  startGame = function() {
    if (timeInterval === null) {
      timeInterval = setInterval(timer, 1000);
      return $('.way').removeClass('way');
    }
  };

  checkTwoNumbers = function(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  };

  timer = function() {
    var min, sec;
    time++;
    min = checkTwoNumbers(Math.round(time / 60));
    sec = checkTwoNumbers(Math.round(time % 60));
    return $('.timeLeft').text(min + ':' + sec);
  };

  getCoordination = function(number) {
    return Math.floor(number / blockSize);
  };

  changeBlockSize = function() {
    $('.block').width(blockSize - 1);
    $('.block').height(blockSize - 1);
    $('.man').width(blockSize / 2);
    return $('.man').height(blockSize / 2);
  };

  buildGame = function() {
    var b, block, i, isWay, man, rand, tmpLeft, tmpTop, tmpX, tmpY, wayCoords, wayDir, wayX, wayY, _i, _ref;
    reset();
    wayCoords = new Array(blocks);
    coords;
    tmpX = 0;
    tmpY = 0;
    tmpLeft = 0;
    tmpTop = 0;
    wayX = x;
    wayY = y;
    wayDir = 180;
    while (wayY < blocks) {
      if (wayCoords[wayY] === void 0) {
        wayCoords[wayY] = new Array(blocks);
      }
      wayCoords[wayY][wayX] = 'x';
      rand = Math.floor(Math.random() * 5);
      switch (rand) {
        case 1:
          if (wayX > 0) {
            wayX--;
          }
          break;
        case 2:
          if (wayX > 0) {
            wayX--;
            wayCoords[wayY][wayX] = 'x';
            wayY++;
          }
          break;
        case 3:
          wayY++;
          break;
        case 4:
          if (wayX < blocks - 1) {
            wayX++;
          }
          wayCoords[wayY][wayX] = 'x';
          wayY++;
          break;
        case 5:
          if (wayX < blocks - 1) {
            wayX++;
          }
      }
    }
    if (wayCoords[blocks - 1] === void 0) {
      wayCoords[blocks - 1] = new Array(blocks);
      wayCoords[blocks - 1][wayX] = 'x';
    }
    for (i = _i = 1, _ref = blocks * blocks; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
      tmpLeft = tmpX * blockSize;
      tmpTop = tmpY * blockSize;
      block = $('<div/>').css('top', tmpTop).css('left', tmpLeft).addClass('block').appendTo($('.game'));
      isWay = false;
      if (wayCoords[tmpY] !== void 0 && wayCoords[tmpY][tmpX] !== void 0 && wayCoords[tmpY][tmpX] === 'x') {
        block.addClass('way');
        isWay = true;
      }
      b = new Object();
      b.x = tmpX;
      b.y = tmpY;
      b.isWay = isWay;
      b.el = block;
      if (coords[tmpY] === void 0) {
        coords[tmpY] = new Array(10);
      }
      coords[tmpY][tmpX] = b;
      if (tmpX === blocks - 1) {
        tmpY = tmpY + 1;
        tmpX = -1;
      }
      tmpX = tmpX + 1;
    }
    man = $('<div/>').addClass('man').appendTo($('.game'));
    manMove(x, y);
    return changeBlockSize();
  };

  $('.verylow').click(function() {
    blocks = verylow;
    return buildGame();
  });

  $('.low').click(function() {
    blocks = low;
    return buildGame();
  });

  $('.medium').click(function() {
    blocks = middle;
    return buildGame();
  });

  $('.high').click(function() {
    blocks = high;
    return buildGame();
  });

  $('.veryhigh').click(function() {
    blocks = veryhigh;
    return buildGame();
  });

  $('.game').mousedown(function(e) {
    var mouseX, mouseY, offset;
    startGame();
    offset = $(this).offset();
    mouseX = getCoordination(e.pageX - offset.left);
    mouseY = getCoordination(e.pageY - offset.top);
    if (((mouseX === x + 1 || mouseX === x - 1) && mouseY === y) || ((mouseY === y + 1 || mouseY === y - 1) && mouseX === x)) {
      x = mouseX;
      y = mouseY;
      return manMove(x, y);
    }
  });

  $(document).keydown(function(e) {
    if (e.which > 36 && e.which < 41) {
      e.preventDefault();
      startGame();
      switch (e.which) {
        case 37:
          if (x > 0) {
            x--;
          }
          break;
        case 40:
          if (y > 0) {
            y--;
          }
          break;
        case 39:
          if (x < blocks - 1) {
            x++;
          }
          break;
        case 38:
          if (y < blocks - 1) {
            y++;
          }
      }
      return manMove(x, y);
    }
  });

  buildGame();

}).call(this);
