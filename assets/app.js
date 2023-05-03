const batteryStatus = document.getElementById('battery-status');
// Call the requestNotificationPermission() function on page load
window.addEventListener('load', bootup);

// Show a notification
function showNotification(message) {
  // Check if Notifications API is supported
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  } else {
    console.log(message);
  }
}
// Update the battery status text
function updateBatteryStatus(battery) {
  batteryStatus.innerHTML = 'Battery level: ' + (battery.level * 100) + '%';
}

function requestNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        console.log(`Notification permission ${permission}.`);
      });
    }
  }else{
    console.log('Notifications API is supported')
  }
}

function requestBatteryAccess(){
  // Check if BatteryManager API is supported
  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {

      // Update the battery status on load
      updateBatteryStatus(battery);

      // Update the battery status on change
      battery.addEventListener('onlevelchange', function() {
        updateBatteryStatus(battery);
      });

      // Show a notification when battery level reaches the threshold
      battery.addEventListener('onlevelchange', function() {
        if (battery.level >= 0.9 && battery.charging) {
          showNotification('Battery level is now ' + (battery.level * 100) + '%');
        }
      });

    });
  } else {
    batteryStatus.innerHTML = 'BatteryManager API is supported.';
  }
}

// On Application loading call all permission required
function bootup(){
  requestNotificationPermission()
  requestBatteryAccess()
}
