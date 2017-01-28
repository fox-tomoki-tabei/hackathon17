$(document).ready(function() {
  for (var i = 1; i < 260; i++) {
    var el = document.createElement('div');
    el.className = "sprite";
    el.id = i;
    console.log(el);
    var body = document.body;

    body.appendChild(el);
    move(i);
  }
  $('.sprite').phantascope({
    fps: 14,
    loop: "*",
    layout: [3, 3, 3,1],
    animationPoints:[[1,1],[1,4]],
    autostart: true
  });
  $('.sprite').phantascope('play');
  function move(id){
    var self = this;
    init_rand_left = Math.floor(Math.random() * 1400);
    init_rand_top = Math.floor(Math.random() * 700);
    $('#'+ id).animate({'top':init_rand_top,'left':init_rand_left}, 3000);
    // console.log('move');
    setInterval(function(){
      var self = this;
      var rand_left = Math.floor( Math.random() * 1400 ) ;
      var rand_top = Math.floor( Math.random() * 700 ) ;

      if($('#' + id).hasClass('reflect')) {
        // console.log('removeClass');
        $('#'+ id).removeClass('reflect').animate({'top': rand_top,'left':rand_left},3000);
      }else{
        // console.log('addClass');
        $('#'+ id).addClass('reflect').animate({'top':rand_top,'left':rand_left}, 3000);
      }
    }, Math.floor(Math.random() * 4000) + 500);
  }
});