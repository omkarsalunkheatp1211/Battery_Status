const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");
const chargingStatus = document.getElementById("charging-status");
const batteryStatusMessage = document.getElementById("battery-status");

window.onload = () => {
  if (!navigator.getBattery) {
    alert("Battery Status API Is Not Supported In Your Browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
      charge.classList.add("active");
      chargingStatus.textContent = "Charging";

      if (battery.level > 0.8) {
        batteryStatusMessage.textContent = "Please stop charging because your battery is more than 80% charged. That's enough and charging further can decrease your battery life";
      } else {
        batteryStatusMessage.textContent = "";
      }

      chargingTimeRef.innerText = "";
    } else {
      charge.classList.remove("active");
      chargingStatus.textContent = "Not Charging";
      batteryStatusMessage.textContent = "";

      if (parseInt(battery.dischargingTime)) {
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
      }
    }
  }

  function updateLevelInfo() {
    let batteryLevel = battery.level * 100;
    charge.style.width = `${batteryLevel}%`;
    chargeLevel.textContent = `${parseInt(batteryLevel)}%`;

    if (batteryLevel <= 20) {
      document.getElementById('battery').classList.add('red');
      document.getElementById('battery').classList.remove('green');
    } else {
      document.getElementById('battery').classList.add('green');
      document.getElementById('battery').classList.remove('red');
    }
  }
});
