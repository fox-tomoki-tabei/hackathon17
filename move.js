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
    var body = document.body;
    body.appendChild(el);
    return el;
  }

  // 村人追加時の空から降ってくる挙動
  function init_move(id)
  {
    var left = Math.floor(Math.random() * 80) + 10;
    $('#'+ id).css({
      'bottom': '75em',
      'left'  : left + '%'
    });
    left2 =  Math.floor(Math.random() * 80) + 10;
    $('#'+ id).animate({
      'bottom':'0',
      'left': left2 + '%'
    }, 5000);
  }

  // 村人の動作設定
  function move(id)
  {
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

  // 一時的な村人追加用method
  setInterval(function()
  {
      var el = add();
      init_move(el.id);
      move(el.id);
      if(!isPhantascopeUp)
      {
        phantascope_up();
        isPhantascopeUp = true;
      }
      play();
  }, Math.floor(Math.random() * 10) + 10);

  // phantascope開始用method
  function play()
  {
      $('.sprite').phantascope('play');
  }

  // 背景変更method
  function bg_change()
  {
    $('.parent').css({'background-image': 'url("http://localhost:4000/bg2.jpeg")'});
  }
});