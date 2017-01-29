var locationSub = navigator.vehicle.location.subscribe(function(location) {
  var oldLatitude;
  var oldLongitude;

  if(oldLatitude === undefined || oldLongitude === undefined){
    //初回
    oldLatitude = location.latitude;
    oldLongitude = location.longitude;
  } else if(oldLatitude === location.latitude && oldLongitude === location.longitude) {
    //前回と位置が同じ : do nothing
    return;
  } else {
    //前回と位置が異なる
    oldLatitude = location.latitude;
    oldLongitude = location.longitude;
  }
  // addMarker2(gVehicleSpeed, gEngineSpeed, location.latitude, location.longitude);
});
//アクセルペダルAPI
var accPedal;
var accPedalSub = navigator.vehicle.acceleratorPedalPosition.subscribe(function(obj) {
  accPedal = obj.value;
});

//速度API
var gVehicleSpeed = 0, gEngineSpeed = 0;
var vehicleSpeedSub = navigator.vehicle.vehicleSpeed.subscribe(function(vehicleSpeed) {
  gVehicleSpeed = Math.floor(vehicleSpeed.speed /1000);
});
var engineSpeedSub = navigator.vehicle.engineSpeed.subscribe(function(engineSpeed) {
  gEngineSpeed = Math.floor(engineSpeed.speed /1000);
});

//距離(m)
var distance = 0;
var odometerSub = navigator.vehicle.vehicleSpeed.subscribe(function(obj) {
  distance += Math.floor(obj.speed /3600);
});

// 生体認証系API
var VitalHeartrate,VitalEmotionCluster;
var vitalSubId = navigator.vehicle.vital.subscribe(function(vital) {
  VitalHeartrate = Math.floor(vital.heartrate);
  VitalEmotionCluster = Math.floor(vital.emotionCluster);
});

//JINS meme
var eyeMoveUp,eyeMoveDown,eyeMoveRight,eyeMoveLeft,blinkSpeed,blinkStrength,
    roll,pitch,yaw,accX,accY,accZ,tilt,attentiveness,awakeness;
var memeSubId = navigator.vehicle.meme.subscribe(function(meme) {
  eyeMoveUp = meme.eyeMoveUp;
  eyeMoveDown = meme.eyeMoveDown;
  eyeMoveRight = meme.eyeMoveRight;
  eyeMoveLeft = meme.eyeMoveLeft;
  blinkSpeed = meme.blinkSpeed;
  blinkStrength = meme.blinkStrength;
  roll = meme.roll;
  pitch = meme.pitch;
  yaw = meme.yaw;
  accX = meme.accX;
  accY = meme.accY;
  accZ = meme.accZ;
  tilt = meme.tilt;
  attentiveness = meme.attentiveness;
  awakeness = meme.awakeness;
});

//今日の天気取得
var code = 13;// とりあえず東京でセット
var key = '69c883311e44923040b3269dcfc91606';
var type = "ajax";
var postData = {code:code, key:key, type:type};

var forecast;
var getYumakeApi = function(postData){
  $.ajax({
    type: "POST",
    data: postData,
    url: "http://localhost:4000/yumakeAjax.php",
    success: function(response){
        forecast = response;
    },
    error: function(msg){
      console.log(msg);
    }
  });
};
getYumakeApi(postData);
