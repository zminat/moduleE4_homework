function Device(name, power) {
  this.name = name;
  this.power = power;
  this.plugged = false;
}

Device.prototype.plugIn = function() {
  this.plugged = true;
};

Device.prototype.unplug = function() {
  this.plugged = false;
};

Device.prototype.isPluggedIn = function() {
  return this.plugged;
};

Device.prototype.getPower = function() {
  if (!this.plugged) {
    return 0;
  }
  return this.power;
};

function Speaker(name, power, defaultVolume) {
  Device.call(this, name, power);
  this.volume = Math.min(Math.max(defaultVolume, 0), 100);
}

Speaker.prototype = Object.create(Device.prototype);
Speaker.prototype.constructor = Speaker;

Speaker.prototype.setVolume = function(volume){
  this.volume = Math.min(Math.max(volume, 0), 100);
}

Speaker.prototype.getVolume = function(){
  if (!this.plugged) {
    return 0;
  }
  return this.volume;
}

function DeskLamp(name, power) {
  Device.call(this, name, power);
  this.isOn = false;
}

DeskLamp.prototype = Object.create(Device.prototype);
DeskLamp.prototype.constructor = DeskLamp;

DeskLamp.prototype.turnOn = function() {
  this.isOn = true;
};

DeskLamp.prototype.turnOff = function() {
  this.isOn = false;
};

DeskLamp.prototype.isDeskLampOn = function() {
  return this.isOn && this.isPluggedIn();
};

DeskLamp.prototype.getPower = function() {
  if (!this.isOn || !this.isPluggedIn()) {
    return 0;
  }
  return this.power;
};

getSumPower = devices => {
  let sumPower = 0;
  for (let device of devices){
    sumPower += device.getPower();
  }
  return sumPower;
}

printSpeakerStatus = speaker => console.log(`Speaker is ${(speaker.isPluggedIn() ? "on" : "off")} and produces ${speaker.getPower()}w, volume is on ${speaker.getVolume()}%`);
printLampStatus = deskLamp => console.log(`Desk lamp is ${(deskLamp.isDeskLampOn() ? "on" : "off")} and produces ${deskLamp.getPower()}w.`);
printTotalPower= devices => console.log(`Total power consumption is ${getSumPower(devices)}w.`);

const xiaomiSpeaker = new Speaker("Xiaomi", 12, 90);
const luxorDeskLamp = new DeskLamp("Luxor", 80);

const devices = [xiaomiSpeaker, luxorDeskLamp];

//Displaying values in default state.
console.log("Default:");
printSpeakerStatus(xiaomiSpeaker);
printLampStatus(luxorDeskLamp);
printTotalPower(devices);

//Change the speaker volume and plug in the lamp.
console.log("Change the speaker volume and plug in the lamp.");
xiaomiSpeaker.setVolume(80);
luxorDeskLamp.plugIn();
printSpeakerStatus(xiaomiSpeaker);
printLampStatus(luxorDeskLamp);
printTotalPower(devices);console.log(`Luxor desk lamp is ${(luxorDeskLamp.isDeskLampOn() ? "on" : "off")} and produces ${luxorDeskLamp.getPower()}w`);

//Turn on the lamp with the button and plug the speaker into the outlet.
console.log("Turn on the lamp with the button and plug the speaker into the outlet.");
luxorDeskLamp.turnOn();
xiaomiSpeaker.plugIn();
printSpeakerStatus(xiaomiSpeaker);
printLampStatus(luxorDeskLamp);
printTotalPower(devices);

//Unplug the lamp from the socket.
console.log("Unplug the lamp from the socket.");
luxorDeskLamp.unplug();
printLampStatus(luxorDeskLamp);
printTotalPower(devices);