verylow= 5
low = 11
middle = 15
high = 25
veryhigh = 51

blocks = low
blockSize = null
time = null
timeInterval = null
x = null
y = null
coords = null

reset = ->  
  $('.game').empty()    
  $('.message').hide()
  $('.finished').hide()
  $('.losed').hide()
  blockSize = 500 / blocks 
  time = 0
  timeInterval = null
  x = Math.floor blocks / 2
  y = 0
  coords = new Array(blocks)

addTwitter = (text)->
  $('.twitter').html "<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-text=\""+text+"'\" data-via=\"maxbuttlies\">Tweet</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"

manMove = (x,y)->
  $('.man').css 'left', x * blockSize
  $('.man').css 'top', y * blockSize
  if not coords[y][x].isWay    
    $('.losed').show()
    clearInterval timeInterval
    addTwitter 'I dont found my way, can you find him? http://buttli.es/heimweg'
    $('.message').show()
  if y == blocks - 1
    $('.finished').show()
    clearInterval timeInterval
    addTwitter 'I found my way in '+ time + ' seconds, can you find him? http://buttli.es/heimweg'
      $('.message').show()

startGame = ->
    if timeInterval == null
      timeInterval = setInterval timer, 1000
      $('.way').removeClass 'way'

checkTwoNumbers = (num)->
  if num < 10
    return '0' + num
  else
    return num

timer = ->
  time++
  min = checkTwoNumbers Math.round(time / 60)
  sec = checkTwoNumbers Math.round(time % 60)
  $('.timeLeft').text min+':'+sec


getCoordination = (number)->
  Math.floor (number) / blockSize 

changeBlockSize = ->
  $('.block').width blockSize - 1
  $('.block').height blockSize - 1
  $('.man').width blockSize / 2
  $('.man').height blockSize / 2

buildGame = ->
  reset()
  wayCoords = new Array(blocks)
  coords
  tmpX = 0
  tmpY = 0
  tmpLeft = 0
  tmpTop = 0
  wayX = x
  wayY = y
  wayDir = 180
  

  while wayY < blocks
    if wayCoords[wayY] == undefined
        wayCoords[wayY] = new Array(blocks)
    wayCoords[wayY][wayX] = 'x'
    rand = Math.floor Math.random() * 5
    switch rand
      when 1
        wayX-- if  wayX > 0
      when 2
        if wayX > 0
          wayX--
          wayCoords[wayY][wayX] = 'x'
          wayY++
      when 3        
        wayY++
      when 4
        wayX++ if wayX < blocks - 1            
        wayCoords[wayY][wayX] = 'x'
        wayY++
      when 5
        wayX++ if wayX < blocks - 1
  

  if wayCoords[blocks - 1] == undefined
      wayCoords[blocks - 1] = new Array(blocks)
      wayCoords[blocks - 1][wayX] = 'x' 

  for i in [1..(blocks * blocks)]
      tmpLeft = tmpX * blockSize
      tmpTop = tmpY * blockSize
      block = $('<div/>')
                  .css('top',tmpTop)
                  .css('left',tmpLeft)
                  .addClass('block')
                  .appendTo($('.game'))
      isWay = false
      if wayCoords[tmpY] != undefined and wayCoords[tmpY][tmpX] != undefined and wayCoords[tmpY][tmpX] == 'x'
        block.addClass 'way'
        isWay = true

      b = new Object()
      b.x = tmpX
      b.y = tmpY
      b.isWay = isWay
      b.el = block
      if coords[tmpY] == undefined
        coords[tmpY] = new Array(10)

      coords[tmpY][tmpX] = b   

      if tmpX == blocks - 1
        tmpY = tmpY +  1
        tmpX = -1  
      tmpX = tmpX +  1
  man = $('<div/>').addClass('man').appendTo($('.game'))
  manMove x, y 
  changeBlockSize()


$('.verylow').click ->
  blocks = verylow
  buildGame()

$('.low').click ->
  blocks = low
  buildGame()

$('.medium').click ->
  blocks = middle
  buildGame()

$('.high').click ->
  blocks = high
  buildGame()

$('.veryhigh').click ->
  blocks = veryhigh
  buildGame()

$('.game').mousedown  (e)->
  startGame()
  offset = $(this).offset()
  mouseX = getCoordination e.pageX - offset.left
  mouseY = getCoordination e.pageY - offset.top
 
  if ((mouseX == x + 1 or mouseX == x - 1) and mouseY == y) or ((mouseY == y + 1 or mouseY == y - 1) and mouseX == x) 
    x = mouseX
    y = mouseY
    manMove x, y

$(document).keydown (e) ->
  if e.which > 36 and e.which < 41
    e.preventDefault()
    startGame()
    switch e.which  
      when 37
        x-- if x > 0 
      when 40 
        y-- if y > 0
      when 39
        x++ if x < blocks - 1
      when 38
        y++ if y < blocks - 1
        
    manMove x, y
    
buildGame()

