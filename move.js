$(document).ready(function() {
  for (var i = 1; i < 500; i++) {
    var el = document.createElement('div');
    el.className = "sprite";
    el.id = i;
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
    init_rand_bottom = Math.floor(Math.random() * 300);
    $('#'+ id).animate({'bottom':init_rand_bottom,'left':init_rand_left}, 3000);
    setInterval(function(){
      var self = this;
      var rand_left = Math.floor( Math.random() * 1400 ) ;
      var rand_bottom = Math.floor( Math.random() * 300 ) ;

      if($('#' + id).hasClass('reflect')) {
        $('#'+ id).removeClass('reflect').animate({'bottom': rand_bottom,'left':rand_left},3000);
      }else{
        $('#'+ id).addClass('reflect').animate({'bottom':rand_bottom,'left':rand_left}, 3000);
      }
    }, Math.floor(Math.random() * 4000) + 500);
  }
});