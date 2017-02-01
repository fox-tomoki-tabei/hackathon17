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
  // 現在の背景画像、デフォルトは1
  var nowBackgroundImg = 'bg1';

  var acc2, accbefore2;
  var distancebefore;
  var michelcount = 0;

  // phantascopeの起動(ゲーム開始時の初回起動分)
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
    if(count.human === 200)
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
      if(count.zombie === 10 && nowBackgroundImg !== 'bg3')
      {
        $('.'+ nowBackgroundImg).fadeOut('slow', function()
        {
          $('.bg3').fadeIn('slow');
          nowBackgroundImg = 'bg3';
        });
      }
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
  // まいけるくん用
  setInterval(function(){
    if(distance >= michelcount * 5){
      execute('human');
      michelcount++;
    }
    // ↓↓ APIつながない場合
    // execute('human');
  }, 100);

  //ゾンビ用
  setInterval(function()
  {
    var category = 'human';
    acc2 = accPedal;

    if(gVehicleSpeed <= 15 && acc2 - accbefore2 >= 10){
      console.log('急発進');
      execute('zombie');
    }else if(awakeness !== 0 && awakeness <= 50){
      console.log('起きて！！');
      execute('zombie');
    }
    accbefore2 = acc2;
    // ↓↓ APIつながない場合
    // var random = Math.floor(Math.random() * 2);
    // if(random === 1){
    //   execute('zombie');
    // }else {
    //   execute('human');
    // }
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
      nowBackgroundImg = 'bg2';
    });
  }

  // 開始ボタン
  $('.bt-start').click(function(event)
  {
    setTimeout(function(){
      $('.cover').fadeOut(1000).delay(300).queue(function()
      {
        isPlay = true;
        setTimeout(function(){
          game_over();
        }, (1.5 * 60 * 1000));
      });
    }, 300);
  });

  // ゲーム終了処理
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
          $('.result-zombie').fadeIn('slow').delay(3500).queue(function(){ //TODO時間調整
            $('.game-result-title').hide();
            $('.result-human').hide();
            $('.result-zombie').hide().delay(100);
            chara_introduction();
          });
        });
      });
    });
  }

  // キャラ紹介
  function chara_introduction(){
    $('.chara-introduction-icon-sizing').phantascope({
      fps: 10,
      loop: "*",
      layout: [3, 3, 3, 1],
      animationPoints:[[1,1],[1,4]],
      autostart: true
    });
    $('.chara-introduction-icon-sizing').phantascope('play');
    $('.chara-introduction').fadeIn('slow').delay(300).queue(function(){
      $('.chara-introduction-title').fadeIn('slow').delay(300).queue(function(){
        $('.chara-introduction-human-box').fadeIn('slow').delay(300).queue(function(){
          $('.chara-introduction-zombie-box').fadeIn('slow').delay(3500).queue(function(){
            $('.chara-introduction').hide().delay(100);
            setTimeout(function(){
              finish();
            },400);
          });
        });
      });
    });
  }

  //締めの句
  function finish(){
      $('.finish').fadeIn(1500);
  }
});
