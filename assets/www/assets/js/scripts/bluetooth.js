var BT = {
    isEnabled : false,
    g_socketid : -1,
    
    init : function ()
    {
        window.plugins = {
                BluetoothPlugin: cordova.require( 'cordova/plugin/bluetooth' )
        };
    },
    
    /**
     * Enable bluetooth on mobile 
     */
    start : function ()
    {
        window.plugins.BluetoothPlugin.enable( function()
        {
            this.isEnabled = true;
            alert( 'Enabling successfull' );
        },
        function(error)
        {
            this.isEnabled = false;
            alert( 'Error enabling BT: ' + error );
        });
    },
    
    /**
     * Disable bluetooth on mobile 
     */
    stop : function ()
    {
        window.plugins.BluetoothPlugin.disable( function()
        {
            this.isEnabled = true;
            alert( 'Disabling successfull' );
        },
        function(error)
        {
            this.isEnabled = false;
            alert( 'Error disabling BT: ' + error );
        } );
    },
    
    findDevices : function ()
    {
        $( '#log' ).text('... Searching BlueTooth wireless network').attr('class', 'red');
        window.plugins.BluetoothPlugin.discoverDevices( function(devices)
        {
            $( '#log' ).text('Found ' + devices.length + " devices").attr('class', 'green');
            $('#bt-devices-select').html('');
            
            for( var i = 0; i < devices.length; i++ ) {
                $('#bt-devices-select').append( $( '<option value="' + devices[i].address + '">' + devices[i].name + '</option>' ) );
            }
        },
        function(error)
        {
            alert( 'Error: ' + error );
        });
    },
    
    listUUIDs : function ()
    {
        window.plugins.BluetoothPlugin.getUUIDs( function(uuids)
        {
            $('#bt-device-uuids').html('');
            
            for( var i = 0; i < uuids.length; i++ ) {
                $('#bt-device-uuids').append( $( '<option value="' + uuids[i] + '">' + uuids[i] + '</option>' ) );
            }
        },
        function(error)
        {
            alert( 'Error: ' + error );
        },
            $( '#bt-devices-select' ).val()
        );
    },
    
    openRfcomm : function ()
    {
        window.plugins.BluetoothPlugin.connect(
            function(socketId) {
                this.g_socketid = socketId;
                console.log( 'Socket-id: ' + this.g_socketid );
            },
            function(error) {
                alert( 'Error: ' + error );
            },
            $( '#bt-devices-select' ).val(),
            $( '#bt-device-uuids' ).val()
        );
    },
    
    readRfcomm : function ()
    {
        window.plugins.BluetoothPlugin.read( this.bp_readSuccess, this.bp_readError, this.g_socketid );
    },
    
    bp_readError : function (error)
    {
        alert( 'Error: ' + error );
    },
    
    bp_readSuccess : function (p_data)
    {
        $('#bt-data-dump').append( '<br>' + p_data );
    
        // Continue reading...
        window.plugins.BluetoothPlugin.read( this.bp_readSuccess, this.bp_readError, this.g_socketid );
        
        return;
    }
}


