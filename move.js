$(document).ready(function()
{
  var ids = [];
  var isBgChange = false;
  var isPhantascopeUp = false;
  var parent = document.getElementById('parent');

  function phantascope_up()
  {
    $('.sprite').phantascope({
      fps: 10,
      loop: "*",
      layout: [3, 3, 3,1],
      animationPoints:[[1,1],[1,4]],
      autostart: true
    });
    play();
  }

  // 村人追加における要素の追加
  function add(){
    ids.push(ids.length + 1);
    var el = document.createElement('div');
    el.classList.add("sprite");
    el.id = ids.length + 1;
    if(ids.length === 300)
    {
      bg_change();
    }
    parent.appendChild(el);
    return el;
  }

  // 人口のカウントアップ
  function counter_up(){
    document.getElementById('counter').innerHTML = ids.length;
  }
  // 村人追加時の空から降ってくる挙動
  function init_move(id)
  {
    var left = Math.floor(Math.random() * 91);
    $('#'+ id).css({
      'bottom': '100%',
      'left'  : left + '%'
    });
    left2 =  Math.floor(Math.random() * 91);
    $('#'+ id).animate({
      'bottom':'0',
      'left': left2 + '%'
    }, 2000);
  }

  // 村人の動作設定
  function move(id)
  {
    setInterval(function()
    {
      var rand_left = Math.floor( Math.random() * 91 ) ;
      var rand_bottom = Math.floor( Math.random() * 30 ) ;
      if($('#' + id).hasClass('reflect')) {
        $('#'+ id).removeClass('reflect').animate({
          'bottom': rand_bottom + '%',
          'left':rand_left + '%'
        },3000);
      }else{
        $('#'+ id).addClass('reflect').animate({
          'bottom':rand_bottom + '%',
          'left':rand_left + '%'
        }, 3000);
      }
    }, Math.floor(Math.random() * 4000) + 500);
  }

  // 一時的な村人追加用method
  setInterval(function()
  {
    var el = add();
    init_move(el.id);
    setTimeout(function(){
      counter_up();
    }, 200);
    move(el.id);
    if(!isPhantascopeUp)
    {
      phantascope_up();
      isPhantascopeUp = true;
    }
    counter_up();
    play();
  }, Math.floor(Math.random() * 2000) + 500);

  // phantascope開始用method
  function play()
  {
    $('.sprite').phantascope('play');
  }

  // 背景変更method
  function bg_change()
  {
    $('.bg1').fadeOut('slow', function() {
      $('.bg2').fadeIn('slow');
    });
  }
});