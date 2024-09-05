class Device {
  constructor(name, power) {
    this.name = name;
    this.power = power;
    this.plugged = false;
  }

  plugIn() {
    this.plugged = true;
  }

  unplug(){
    this.plugged = false;
  }

  isPluggedIn() {
    return this.plugged;
  }

  getPower() {
    if (!this.plugged) {
      return 0;
    }
    return this.power;
  }
};

class Speaker extends Device {
  constructor (name, power, defaultVolume){
    super(name, power);
    this.volume = Math.min(Math.max(defaultVolume, 0), 100);
}

  setVolume(volume){
    this.volume = Math.min(Math.max(volume, 0), 100);
  }

  getVolume(){
    if (!this.plugged) {
      return 0;
    }
    return this.volume;
  }
}

class DeskLamp extends Device {
  constructor(name, power, plugged){
    super(name, power, plugged);
    this.isOn = false;
  }

  turnOn() {
    this.isOn = true;
  }

  turnOff() {
    this.isOn = false;
  }

  isDeskLampOn() {
    return this.isOn && this.isPluggedIn();
  }

  getPower() {
    if (!this.isOn || !this.isPluggedIn()) {
      return 0;
    }
    return this.power;
  }
}

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