//defining a global user
var global_user = "";
var user  = "user=";
var uuid = "id";



// ############### APP FUNCTIONALITY AND SERVER COMMUNICATION #########################
var app = {
	
//****************User variables******************	
	
	global_user:"",
	fbid:"",
	user:"user=",
	rangedme:0,
	major:0,
	minor:0,
	beaconRegion:null,
	rangedbeacons:[],
	
//************************************************		
		
   initialize: function() {
	   this.bindEvents(); 
	   
    },
		
    bindEvents: function() {
		
		
		var touch = 'touchstart';
		if (!window.cordova) touch ='click'
 
        document.addEventListener('deviceready', this.onDeviceReady, false);
		
		FBButton.addEventListener(touch, this.FBlogin, false); //for use on phone
		
		//loginButton.addEventListener('click', this.jslogin, false); // for use on web browser
		loginButton.addEventListener(touch, this.jslogin, false); //for use on phone
		
		//registerButton.addEventListener('click', this.jsregister, false); // for use on web browser
		registerButton.addEventListener(touch, this.jsregister, false); // for use on phone
		
		//refreshRequestButton.addEventListener('click', this.jsrequest, false);
		refreshRequestButton.addEventListener(touch, this.jsrequest, false);
		
		TestButton.addEventListener(touch, this.testmeet, false);
		
		refreshButton.addEventListener(touch, ble.refreshDeviceList, false); // for use on phone
	    deviceList.addEventListener(touch, ble.connect, false); //for use on phone assume not scrolling
		
		$(document).on("pagebeforeshow","#connect", ble.refreshDeviceList); // for use on phone
		$(document).on("pagebeforeshow","#allrequests", this.jsrequest); 
		$(document).on("pagebeforeshow","#profile", this.jsprofile); 
		},
	
	onDeviceReady: function() {
		
		//var active = 0;
		
		var delegate = new cordova.plugins.locationManager.Delegate().implement({
			
			didStartMonitoringForRegion: function (pluginResult) {
				//alert(JSON.stringify(pluginResult));
                console.log('didStartMonitoringForRegion:', pluginResult) 
            },
			didEnterRegion: function (pluginResult) {
				
			},
			didExitRegion: function (pluginResult) {
				
			},
			
            didDetermineStateForRegion: function (pluginResult) {
				
			cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                    + JSON.stringify(pluginResult));	
                
            },
 
            didRangeBeaconsInRegion: function (pluginResult) {	
				//alert(pluginResult.beacons[0].rssi);
				console.log("########in ranging");
				//app.rangedBeacons(pluginResult);
				
            }
			

        });
		 
		 var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
        var identifier = 'rfduino';
        var minor = 0;
        var major = 0;
		
		 app.createBeaconRegion();
		cordova.plugins.locationManager.setDelegate(delegate);
        cordova.plugins.locationManager.startMonitoringForRegion(app.beaconRegion)
            .fail(console.error)
            .done();
		/*	
			cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();*/
			
	},
	
	createBeaconRegion: function(){
		var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
		var identifier = 'rfduino';
        app.beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
		
		
	},
	
	
	initFacebook: function() {
	 	//FB.init({ appId: "735890629767850", nativeInterface: CDV.FB, useCachedDialogs: false });
		//document.getElementById('data').innerHTML = "FB initialized";
	},

	FBlogin:function(){
		/*if (!window.cordova) {
                    var appId = '735890629767850'
                    facebookConnectPlugin.browserInit(appId);
                }*/
                facebookConnectPlugin.login( ["email"], 
                    function (response) { 
					//alert(JSON.stringify(response)) 
					console.log('Welcome!  Fetching your information.... ');
					app.checkLoginState();
					},
                    function (response) { 
					//alert(JSON.stringify(response)) 
					console.log('User cancelled login or did not fully authorize.');
					});
					  
 
 
	},
	
	checkLoginState: function() {	
	facebookConnectPlugin.getLoginStatus( 
                    function (response) { 
					if (response.status === 'connected') {
      // Logged into your app and Facebook.
	  //alert("in connected");
	  app.FBregister();
      //inputFB();
    } else if (response.status === 'not_authorized') {
		alert("in not authorized");
		//FBregister();
      // The person is logged into Facebook, but not your app.
      
    } else {
		alert("in not loged in");
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      
    }
					},
                    function (response) { 
					alert(JSON.stringify(response)) 
					}
					);
	 
    //FB.getLoginStatus(function(response) {
      //app.statusChangeCallback(response);
    //});
  },
	
	FBregister: function() {
	   var fbfname = "";
	   var fblname = "";
    console.log('Welcome!  Fetching your information.... ');
	
    facebookConnectPlugin.api('/me',["basic_info"], function(response) {
		
     console.log('Good to see you, ' + response.name + '.');
	  console.log(JSON.stringify(response));
	  //alert(JSON.stringify(response)) 
	  
	  app.fbid = response.id;
	  fbfname = response.first_name;
	  fblname = response.last_name;
	   //alert(app.fbid + " " + fbfname);  
	 
    
	  $.ajax({
      url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/fbregister.php',
      type: 'post',
      data: {FBID:app.fbid,
 			 FBFNAME:fbfname,
			 FBLNAME:fblname},
      success: function(data) {
		console.log(data);
        if(data.status== "0") {
			
			app.global_user = data.ID; //delivered as int, will be converted to string automatically
			app.major = parseInt(app.global_user.substr(0,4));
			app.minor = parseInt(app.global_user.substr(4,4));	
			app.user += data.ID;
			//alert(app.global_user);				
			console.log(app.global_user);	
			console.log(app.major);	
			console.log(app.minor);	
		
		
		 var mydelegate = new cordova.plugins.locationManager.Delegate().implement({

            didStartMonitoringForRegion: function (pluginResult) {
				//alert(JSON.stringify(pluginResult));
                console.log('didStartMonitoringForRegion:', pluginResult) 
            },

			
			didEnterRegion: function (pluginResult) {					
				if (pluginResult.region.identifier == "myrfduino"){
			app.rangedbeacons.length = 0;
			cordova.plugins.locationManager.startRangingBeaconsInRegion(myBeaconRegion)
            .fail(console.error)
            .done(console.log("*********started ranging myBeaconRegon"));
			
			cordova.plugins.locationManager.startRangingBeaconsInRegion(app.beaconRegion)
            .fail(console.error)
            .done(console.log("*********started ranging beaconRegion"));			
				}		
			},
			
			didExitRegion: function (pluginResult) {
				if (pluginResult.region.identifier == "myrfduino")
				{	
			cordova.plugins.locationManager.stopRangingBeaconsInRegion(myBeaconRegion)
            .fail(console.error)
            .done();
			cordova.plugins.locationManager.stopRangingBeaconsInRegion(app.beaconRegion)
            .fail(console.error)
            .done();
			cordova.plugins.locationManager.startMonitoringForRegion(myBeaconRegion)
            .fail(console.error)
            .done();
			cordova.plugins.locationManager.startMonitoringForRegion(app.beaconRegion)
            .fail(console.error)
            .done();
			
			for (var i = 0; i<app.rangedbeacons.length; i++)
			{
				var j, sum = 0, len = app.rangedbeacons[i].rssi.length;
				for (j = 0; j<len;j++)
				{
				sum +=	app.rangedbeacons[i].rssi[j];
				}
				var avgrssi = sum/len;
				
				//alternatively search mar avgrssi and transmit only this one
				if(avgrssi > - 80) {
				var metIdChar = "";
				metIdChar = app.rangedbeacons[i].major + app.rangedbeacons[i].minor;
				var metIdInt = parseInt(metIdChar);
				console.log("************ met ID: " + metIdInt);
				app.jsmeet(metIdInt);	
			//alert("++++++ transmit minor" + app.rangedbeacons[i].minor + "avg rssi: " + avgrssi);
			
				}
			}
			console.log("activate reconnect");
			//setTimeout(function(){app.rangedbeacons.length = 0},1000);
			setTimeout(function(){ble.reconnect()},1000); 			
				}
			},
			
           didDetermineStateForRegion: function (pluginResult) {
				
			/*cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                    + JSON.stringify(pluginResult));*/         
            },
			  
            didRangeBeaconsInRegion: function (pluginResult) {
				console.log("########in ranging " + pluginResult.beacons.length);	
				for(var i = 0; i < pluginResult.beacons.length; i++)
				{
					if (pluginResult.beacons[i].minor == app.minor && pluginResult.beacons[i].major == app.major)
					{
						console.log("######## got minor");	
					} 
					else 
					{
						var index = -1;
						for (var j = 0; j<app.rangedbeacons.length; j++)
						{
							if (app.rangedbeacons[j].minor == pluginResult.beacons[i].minor && 
							app.rangedbeacons[j].major == pluginResult.beacons[i].major)
							{
								index = j;
								break;
							}	
						}
						if (index == -1) 
						{
							//alert("make new enty in list");
					app.rangedbeacons.push(new beaconsinrange(pluginResult.beacons[i].uuid, pluginResult.beacons[i].major, pluginResult.beacons[i].minor, pluginResult.beacons[i].rssi));
							console.log("++++++++++++++appended to list");
							console.log("+++++++listed beacon:" + app.rangedbeacons[app.rangedbeacons.length-1].minor);
						} else
						{
							//alert("add enty to list");
							console.log("+++++++++++does exist in list");
							app.rangedbeacons[index].rssi.push(pluginResult.beacons[i].rssi);
							console.log("++++++ minor: " + app.rangedbeacons[index].minor);	
						}
					}
				}//end for
				
				
            }
			
        });
	
			
		 var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
        var identifier = 'myrfduino';
        var myBeaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, app.major, app.minor);
		cordova.plugins.locationManager.setDelegate(mydelegate);
			
			cordova.plugins.locationManager.startMonitoringForRegion(myBeaconRegion)
            .fail(console.error)
            .done();
			
					
			$.mobile.changePage("#connect", {transition: "slidefade"});
        }
		else if (data.status== "1") {
			
			app.global_user = data.ID;	
			app.user += data.ID;
			alert(app.global_user);		
			console.log(app.global_user);		
			$.mobile.changePage("#connectsocial", {transition: "slidefade"});
        }
		else
		alert("There was an error communicating with the database");		
      },
      error: function(data) {
       alert("There was an error communicating with the database");
      }
    }); // end ajax call*/

	  },
	  function (response) { 
					alert(JSON.stringify(response)) 
					console.log('Error at api call'); 
					
	  });


  },
	
	jslogin: function() {
    $.ajax({
      url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/login.php',
      type: 'post',
      data: $('#form-login').serialize(),
      success: function(data) {
		console.log(data);
        if(data.status== "1") {
				app.global_user = $("#PHONENUMBER").val();				
				app.user += $("#PHONENUMBER").val(); //TODO unify user and global_user
				var global_user_name = data.FNAME;
				$("#loggedinas").html(global_user_name);
				$.mobile.changePage("#activity", {transition: "slidefade"});
				
        }
		else
		alert("Either your phonenumber or password  is incorrect");
      },
      error: function(data) {
       alert("There was an error communicating with the database");
      }
    }); // end ajax call
 },
 
 jsregister: function() {
    $.ajax({
      url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/input.php',
      type: 'post',
      data: $('#form-register').serialize(),
      success: function(d) {
		console.log(d);
		//alert(d);
        if(d.status== "1") {
				app.global_user = d.PHONENUMBER;				
				$.mobile.changePage("#connectsocial", {transition: "slidefade"});
			
        }
		else if(d.status== "0") {
		alert("Phonenumber already exists, please chose different");
		} else {
		alert("There was an error communicating with the database");		
		}
      },
      error: function(data) {
       alert("There was an error communicating with the database");
      }
    }); // end ajax call
 },
 
 
 
 
 jsrequest: function () {
   //alert ("inside jsrequests");


var temp_allrequests = "{{#requests}}<tr><td><a href=\"#\" onclick=\"app.viewrequest('{{request.OTHERS}}',\'{{request.MY}}\',\'{{request.time}}\')\">{{request.OTHERS}}</a></td><td>{{request.NAME}}</td><td>{{request.EMAIL}}</td><td>{{request.time}}</td></tr>{{/requests}}";      

$.ajax({
		type: "POST",
		url: "http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/request.php",		
		data: {user:app.global_user}, //TODO need to unify later to one user variable
		dataType: "json",
		success: function(data){
			console.log(data);			
			console.log(temp_allrequests);
			var foundrequests = Mustache.to_html(temp_allrequests, data);
			console.log(foundrequests)
			$("#showrequests").html(foundrequests);
			$.mobile.changePage("#allrequests", {transition: "slidefade"});
			
		},
		error: function(data) {
			alert("There was an error searching for your requests.");
		}
	});
	
},

jsprofile: function() {
		//alert("inside jsprofile");
		
var temp_profile="<p><img src=\"{{PHOTO}}\" width=25% style=\"float:left\" alt=\"Profile Photo\"/></p><h1 id=\"my_fullname\">{{FNAME}} {{LNAME}} </h1><p id=\"my_bio\">User bio goes here.</p><br><br/><p id=\"my_email\"><a href=\"#\">{{EMAIL}}</a></p><p id=\"my_phone\">{{PHONE}} </p><div data-role=\"controlgroup\" data-type=\"horizontal\"><button id=\"my_facebook\">Facebook</button><button id=\"my_linkedin\">LinkedIn</button><button id=\"my_twitter\">Twitter</button><button id=\"my_instagram\">Instagram</button></div>";	
		
 $.ajax({
      url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/profile.php',
      type: 'post',
      data:  {user:app.global_user},
	  dataType:"json",
      success: function(data) {
		console.log(data);
        if(data.status== "1") {
			var foundprofile = Mustache.to_html(temp_profile, data);
			console.log(foundprofile)
			$("#showprofile").html(foundprofile);
			$("#profile").trigger("create");

			//$.mobile.changePage("#profile", {transition: "slidefade"});
        }
		else
		alert("There was an error retrieving user details")
      },
      error: function(data) {
       alert("There was an error communicating with the database");
      }
    });	
 },
 
 viewrequest: function(OTHERS,MY,time) {
	 
	 //alert("in viewrequests");
	 
	 var data_string = "user="+OTHERS;

var data_my = MY;
var data_time = time;

console.log(data_my);
console.log(data_time);


var temp_user="<img src=\"{{PHOTO}}\" width=25% style=\"float:left\" alt=\"Profile Photo\"/><h1 id=\"contact_fullname\">{{FNAME}} {{LNAME}}</h1><h1 id=\"contact_bio\">Bio: {{Bio}}</h1></br></br><div data-role=\"fieldcontain\"><label for=\"flipswitch\">Name this location:</label><select name=\"flipswitch\" id=\"flipswitch\" data-role=\"slider\"><option value=\"off\">Off</option><option value=\"on\">On</option></select></div><div data-role=\"controlgroup\" data-type=\"horizontal\"><div data-role=\"controlgroup\"></div>What do you want to share with this person?<div data-role=\"fieldcontain\"><fieldset data-role=\"controlgroup\"><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_0\" class=\"custom\" value=\"\" /><label for=\"checkbox1_0\">E-mail</label><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_1\" class=\"custom\" value=\"\" /><label for=\"checkbox1_1\">Phone#</label><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_2\" class=\"custom\" value=\"\" /><label for=\"checkbox1_2\">Facebook</label><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_3\" class=\"custom\" value=\"\" /><label for=\"checkbox1_3\">LinkedIn</label><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_4\" class=\"custom\" value=\"\" /><label for=\"checkbox1_4\">Twitter</label><input type=\"checkbox\" name=\"checkbox1\" id=\"checkbox1_5\" class=\"custom\" value=\"\" /><label for=\"checkbox1_5\">Instagram</label></fieldset></div><br/><a href=\"#\" data-role=\"button\" data-icon=\"delete\" onclick=\"app.jsignore('"+OTHERS+"','"+MY+"','"+time+"')\">Ignore</a><a href=\"#\" input type=\"submit\" data-icon=\"plus\" onclick=\"app.jsconfirm('"+OTHERS+"','"+MY+"','"+time+"')\">Confirm Contact</a></div>";
  

$.ajax({
		type: "POST",
		url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/profile.php',		
		data: data_string,
		dataType:"json",
		success: function(data){
			console.log(data);
			if(data.status== "1"){			
			var founduser = Mustache.to_html(temp_user, data);
			console.log(founduser)
			$("#showuser").html(founduser);
			$("#requestor").trigger("create");

			$.mobile.changePage("#requestor", {transition: "slidefade"});
			}
			else 
			
			alert("There was an error in retrieving the user details.");
		},
		error: function(data) {
			alert("There was an error in retrieving the user details.");
		}
	});
	

	 
 },
 
 jsignore: function(OTHERS,MY,time) {
	var data_string = "MYID2="+OTHERS+"&MYID1="+MY+"&time="+time;

	$.ajax({
		type: "POST",
		url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/ignore.php',		
		data: data_string,
		dataType:"json",
		success: function(data){
			console.log(data);
			if(data.status== "1"){				
			$.mobile.changePage("#allrequests", {transition: "slidefade"});
			}
			else 
			
			alert("There was an error in ignoring user please try again later");
			$.mobile.changePage("#allrequests", {transition: "slidefade"});
		},
		error: function(data) {
			alert("There was an error in ignoring user please try again later");
			$.mobile.changePage("#allrequests", {transition: "slidefade"});

		}
	}); 
	 
	 
 },
 
 jsconfirm: function(OTHERS,MY,time) {
	console.log("inside jsconfirm");

var temp_friend = "<img src=\"{{PHOTO}}\" width=25% style=\"float:left\" alt=\"Profile Photo\"/><h1 id=\"contact_fullname\">{{FNAME}} {{LNAME}} </h1><h2>Bio: User bio goes here.</h2></div>This contact has shared with you:<br/><h3>E-mail:{{EMAIL}}</h3><h4>Phone:{{PHONE}}</p><br/><br/>Connect socially with this contact via:<div data-role=\"controlgroup\" data-type=\"horizontal\"><a id=\"contact_facebook\" data-role=\"button\" href=\"{{& FACEBOOK }}\" target=\"_blank\">Facebook</a><button id=\"contact_linkedin\">LinkedIn</button><button id=\"contact_twitter\">Twitter</button><button id=\"contact_instagram\">Instagram</button><br/><br/><br/><a href=\"#\" data-role=\"button\" data-icon=\"forward\">Share</a><a href=\"#\" data-role=\"button\" data-icon=\"check\">All Set!</a>"

var data_string = "MYID2="+OTHERS+"&MYID1="+MY+"&TIME="+time;
    console.log(data_string)
	$.ajax({
		type: "POST",
		url: 'http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/Confirm.php',		
		data: data_string,
		dataType:"json",
		success: function(data){
			console.log(data);
			if(data.status== "1"){
			var foundfriend = Mustache.to_html(temp_friend, data);
			console.log(foundfriend)
			$("#showfriend").html(foundfriend);
			$("#connectionConfirmed").trigger("create");
			$.mobile.changePage("#connectionConfirmed", {transition: "slidefade"});
			}
			else 
			
			alert("There was an error in finding friend try again later");
	
		},
		error: function(data) {
			alert("There was an error in finding friend please try again later");


		}
	}); 
	 
	 
 },
 
 testmeet: function(){
	 var id = testID.value;
	 app.jsmeet(id);
 },
 
 jsmeet: function(id){
	 console.log(id);
	 var d = new Date();
    	var n = 1;
		n = d.getTime();
		$.post("http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/php/meet.php",
  			{
    		MYID:parseInt(app.global_user),
    		METID:id,
			UTIME:n
  			},
			  function(){
				//$.mobile.changePage("#allrequests", {transition: "slidefade"});
			  });
	 
 }

}


// ###########################  BLUETOOTH ##################################################
var ble = {
		
     onDeviceReady: function() {
        ble.refreshDeviceList();
    },
    refreshDeviceList: function() {
        deviceList.innerHTML = ''; // empties the list
        rfduino.discover(5, ble.onDiscoverDevice, ble.onError);
    },
    onDiscoverDevice: function(device) {
        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' +
                'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                'Advertising: ' + device.advertising + '<br/>' +
                device.uuid;

        listItem.setAttribute('uuid', device.uuid);
        listItem.innerHTML = html;
        deviceList.appendChild(listItem);
    },
    connect: function(e) {
        uuid = e.target.getAttribute('uuid'),
		   onConnect = function() {
				//alert("connected");			
				rfduino.onData(ble.onData, ble.onError);				  
				ble.writeToRfduino();           // here was a missing ; lets see what fixing this did
            };

        rfduino.connect(uuid, onConnect, ble.onDisconnect);
			
    },
	
	reconnect: function () {
		
		//onConnect = function() {
			//ble.writePayload();
			//rfduino.onData(ble.onData, ble.onError);
				//alert("Now reconnected to");
			//};
		rfduino.connect(uuid, ble.writePayload, ble.onDisconnect);
		
		//alert("in on resconnect and called connect " +uuid);
	},
	
    onData: function(data) {
        console.log(data);
		//alert("receiving data");
        //var indata = arrayBufferToFloat(data);
		//var indata = arrayBufferToInt(data);
     	var indata = new Int8Array(data);
		var indataST = "";
		for (var i=0;i<indata.length;i++)
		{			 
		 indataST+= String.fromCharCode(indata[i]);
		}
		if (indataST == 'S') {
			
			//alert ("received data");
			//setTimeout(function(){ble.reconnect()},11000);
		}
		//app.jsmeet(justmet);
		//alert(justmet);
		/*var d = new Date();
    	var n = 1;
		n = d.getTime();
		$.post("http://websys1.stern.nyu.edu/websysS14/websysS143/public_html/websys/shubha/meet.php",
  			{
    		MYID:app.global_user,
    		METID:justmet,
			//TIME:n
			//TIME:'2014-04-30 03:14:07'
			UTIME:n
  			},
			  function(){
				alert("posted to database");
			  });*/
	    //shakehand.innerHTML = justmet;	
        
    },	
	
    disconnect: function() {
        rfduino.disconnect(ble.showMainPage, ble.onError);
    },
	
	writePayload: function(){
		app.rangedme = 0;
		//shakehand.innerHTML = "yeah";
		//alert("in write payload");
		//rfduino.isConnected(alert("we are connected"),ble.onError);
		//setTimeout(function(){rfduino.write('A',ble.writePlSuccess,ble.onError)},2000);
		//alert("after rfduino class call");
	},
	
	writePlSuccess: function(){
			
	},
		
	
	writeToRfduino: function(){
		//var datatrans = "0000003";
		//var datatrans = userid.value;	
		var datatrans = app.global_user;
		//alert(datatrans);
		//rfduino.write(datatrans,ble.writeSuccess,ble.onError);
		setTimeout(function(){rfduino.write(datatrans,ble.writeSuccess,ble.onError)},1000);	//can change back
		//rfduino.write(datatrans);
		
	},
	
	writeSuccess: function(){
		alert("Now connected to shakehandsband");
		$.mobile.changePage("#activity", {transition: "slidefade"});
		
	},
		
    showMainPage: function() {
        mainPage.hidden = false;
        detailPage.hidden = true;
    },
    showDetailPage: function() {
        $("#detailPage").show();
		$("#mainPage").hide();
		
    },
	
	onDisconnect: function(reason) {
		//alert("in on disconnect " + reason);
		//ble.reconnect();
		
	},
	
    onError: function(reason) {
        alert(reason); // real apps should use notification.alert
    }
};

// ############### FACEBOOK ####################################
// This is called with the results from from FB.getLoginStatus().
/*  
if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
        
 FB.Event.subscribe('auth.login', function(response) {
                               alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                               alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               alert('auth.statusChange event');
                               });
							   */
							   
// ###########################  IBEACON ##################################################

function beaconsinrange(uuid, major, minor, rssi) {
	console.log("##############in create new beaconsinrange object")
	this.uuid = uuid;
	this.major = major;
	this.minor = minor;
	this.rssi = [];
	this.rssi.push(rssi);
	
 
  
}

	



