cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.megster.cordova.rfduino/www/rfduino.js",
        "id": "com.megster.cordova.rfduino.rfduino",
        "clobbers": [
            "rfduino"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.facebookconnect/www/phonegap/plugin/facebookConnectPlugin/facebookConnectPlugin.js",
        "id": "com.phonegap.plugins.facebookconnect.FacebookConnectPlugin",
        "clobbers": [
            "window.facebookConnectPlugin"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/lib/underscore-min-1.6.js",
        "id": "org.apache.cordova.ibeacon.underscorejs",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/lib/klass.min.js",
        "id": "org.apache.cordova.ibeacon.klass"
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/lib/q.min.js",
        "id": "org.apache.cordova.ibeacon.Q",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/LocationManager.js",
        "id": "org.apache.cordova.ibeacon.LocationManager",
        "clobbers": [
            "cordova.plugins"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/Delegate.js",
        "id": "org.apache.cordova.ibeacon.Delegate",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/model/Region.js",
        "id": "org.apache.cordova.ibeacon.Region",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/Regions.js",
        "id": "org.apache.cordova.ibeacon.Regions",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/model/CircularRegion.js",
        "id": "org.apache.cordova.ibeacon.CircularRegion",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.ibeacon/www/model/BeaconRegion.js",
        "id": "org.apache.cordova.ibeacon.BeaconRegion",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.10",
    "com.megster.cordova.rfduino": "0.0.2",
    "com.phonegap.plugins.facebookconnect": "0.5.1",
    "org.apache.cordova.ibeacon": "2.0.0",
    "org.apache.cordova.console": "0.2.9",
    "org.apache.cordova.inappbrowser": "0.5.1"
}
// BOTTOM OF METADATA
});