$(document).ready(function()
{
  var ids = [];
  var count = {
    human  : 0,
    zombie : 0
  };
  var isBgChange = false;
  var isPhantascopeUp = false;
  var parent = document.getElementById('parent');
  var isPlay = false;

  var acc2, accbefore2;

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
  function add()
  {
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
  function counter_up(category)
  {
    setTimeout(function()
    {
      count[category] ++;
      document.getElementById(category + '-counter').innerHTML = count[category];
    }, 200);
  }
  // 村人追加時  の空から降ってくる挙動
  function init_move(id)
  {
    var left = Math.floor(Math.random() * 91);
    $('#'+ id).css({
      'bottom': '100%',
      'left'  : left + '%'
    });
    left2 =  Math.floor(Math.random() * 91);
    var bottom2 = Math.floor(Math.random() * 10) + 2 + '%';
    $('#'+ id).animate({
      'bottom': bottom2,
      'left': left2 + '%'
    }, 2000);
  }

  // 村人の動作設定
  function move(id)
  {
    setInterval(function()
    {
      var rand_left = Math.floor( Math.random() * 91 ) ;
      var rand_bottom = Math.floor( Math.random() * 28 ) + 1 ;
      if($('#' + id).hasClass('reflect'))
      {
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
  function execute(category)
  {
    if(isPlay)
    {
      var el = add();
      init_move(el.id);
      counter_up(category);
      el.classList.add(category);
      move(el.id);
      if(!isPhantascopeUp)
      {
        phantascope_up();
        isPhantascopeUp = true;
      }
      play();
    }
  }
  setInterval(function()
  {
    var category = 'human';
    // if((Math.floor(Math.random() * 2))  === 1 )
    // {
    //   category = 'zombie';
    // }
    acc2 = accPedal;

    if(acc2 - accbefore2 >= 10){
      console.log('急発進');
      // addMessage('急発進');

      execute('zombie');
    }else if(awakeness !== 0 && awakeness <= 40){
      console.log('起きろ！！');
      execute('zombie');
    }else{
      execute(category);
    }
    accbefore2 = acc2;

  }, Math.floor(Math.random() * 4000) + 500);

  // phantascope開始用method
  function play(id)
  {
    $('.sprite').phantascope('play');
  }

  // 背景変更method
  function bg_change()
  {
    $('.bg1').fadeOut('slow', function()
    {
      $('.bg2').fadeIn('slow');
    });
  }

  $('.bt-start').click(function(event)
  {
    setTimeout(function(){
      $('.cover').fadeOut(1000).delay(300).queue(function()
      {
        isPlay = true;
        setTimeout(function(){
          game_over();
        }, (2 * 60 * 1000));
      });
    }, 300);
  });


  function game_over(){
    isPlay = false;
    $('.result-icon-sizing').phantascope({
      fps: 10,
      loop: "*",
      layout: [3, 3, 3, 1],
      animationPoints:[[1,1],[1,4]],
      autostart: true
    });
    document.getElementById('game-result-human').innerHTML = count.human;
    document.getElementById('game-result-zombie').innerHTML = count.zombie;
    $('.result-icon-sizing').phantascope('play');
    $('.game-result').fadeIn('slow').delay(300).queue(function(){
      $('.game-result-title').fadeIn('slow').delay(300).queue(function(){
        $('.result-human').fadeIn('slow').delay(300).queue(function(){
          $('.result-zombie').fadeIn('slow').delay(5000);
        });
      });
    });
  }
});
