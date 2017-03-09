(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_throttle = function(t) {

       $.ajax({
             url: 'http://car.local:5000/_set_servo?t=' + t,
             dataType: 'jsonp',
             success: function( servo_data ) {
                 // Got the data - parse it and return the temperature
                 throttle = servo_data['t'];
                 callback(throttle);
             }
       });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name
        ['T ', 'Set Throttle %n', 'set_throttle', 330],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Picar extension', descriptor, ext);
})({});
