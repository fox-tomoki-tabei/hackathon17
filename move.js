$(document).ready(function()
{
  var ids = [0];
  var isBgChange = false;
  var isPhantascopeUp = false;

  function phantascope_up()
  {
    $('.sprite').phantascope({
      fps: 14,
      loop: "*",
      layout: [3, 3, 3,1],
      animationPoints:[[1,1],[1,4]],
      autostart: true
    });
    play();
  }

  function move(id)
  {
    init_rand_left = Math.floor(Math.random() * 1800);
    init_rand_bottom = Math.floor(Math.random() * 300);
    $('#'+ id).animate({
      'bottom':init_rand_bottom,
      'left':init_rand_left
    }, 3000);

    setInterval(function()
    {
      var rand_left = Math.floor( Math.random() * 1800 ) ;
      var rand_bottom = Math.floor( Math.random() * 300 ) ;
      if($('#' + id).hasClass('reflect')) {
        $('#'+ id).removeClass('reflect').animate({
          'bottom': rand_bottom,
          'left':rand_left
        },3000);
      }else{
        $('#'+ id).addClass('reflect').animate({
          'bottom':rand_bottom,
          'left':rand_left
        }, 3000);
      }
    }, Math.floor(Math.random() * 4000) + 500);
  }

  function init_move(id)
  {
    $('#'+ id).css({
      'bottom': '45em'
    });
    $('#'+ id).animate({
      'bottom':'0',
      'left': '50%'
    }, 3000);
  }

  function add(){
    ids.push(ids.length + 1);
    var el = document.createElement('div');
    el.classList.add("sprite");
    el.id = ids.length + 1;
    if(ids.length === 300)
    {
      bg_change();
    }
    var body = document.body;
    body.appendChild(el);
    init_move(el.id);
    move(el.id);
  }

  setInterval(function()
  {
      add();
      if(!isPhantascopeUp)
      {
        phantascope_up();
        isPhantascopeUp = true;
      }
      play();
  }, Math.floor(Math.random() * 4000) + 500);

  function play()
  {
      $('.sprite').phantascope('play');
  }

  function bg_change()
  {
    $('.parent').css({'background-image': 'url("http://localhost:4000/bg2.jpeg")'});
  }
});