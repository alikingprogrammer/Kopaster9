// Function to update the time
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();

    // Format the time based on the user's locale
    const formattedTime = new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // Use 12-hour format (AM/PM)
    }).format(now);

    // Update the time in the HTML
    timeElement.textContent = formattedTime;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initialize the time immediately
updateTime();


    // Access the battery charge and update the #batterycharge and #batteryChargeNav elements
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            // Function to update battery charge
            const updateBatteryCharge = () => {
                const batteryLevel = Math.round(battery.level * 100); // Convert to percentage
                document.getElementById('batterycharge').textContent = `${batteryLevel}%`;
                document.getElementById('batteryChargeNav').textContent = `${batteryLevel}%`;
            };

            // Initial update
            updateBatteryCharge();

            // Listen for changes in battery level
            battery.addEventListener('levelchange', updateBatteryCharge);

            // Listen for changes in charging status
            battery.addEventListener('chargingchange', () => {
                const chargingStatus = battery.charging ? ' (Charging)' : ' (Not Charging)';
                document.getElementById('batterycharge').textContent += chargingStatus;
                document.getElementById('batteryChargeNav').textContent += chargingStatus;
            });
        }).catch(function(error) {
            console.error('Battery Status API error:', error);
            document.getElementById('batterycharge').textContent = 'Battery info unavailable';
            document.getElementById('batteryChargeNav').textContent = 'Battery info unavailable';
        });
    } else {
        // Fallback if Battery Status API is not supported
        document.getElementById('batterycharge').textContent = 'Battery Status API not supported';
        document.getElementById('batteryChargeNav').textContent = 'Battery Status API not supported';
    }