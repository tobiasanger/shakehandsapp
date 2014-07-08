/*
 * @author Ally Ogilvie
 * @copyright Wizcorp Inc. [ Incorporated Wizards ] 2014
 * @file - facebookConnectPlugin.js
 * @about - JavaScript interface for PhoneGap bridge to Facebook Connect SDK
 *
 *
 */

if (!window.cordova) {
// This should override the existing facebookConnectPlugin object created from cordova_plugins.js
    var facebookConnectPlugin = {

        getLoginStatus: function (s, f) {
            // Try will catch errors when SDK has not been init
            try {
                FB.getLoginStatus(function (response) {
                    alert(JSON.stringify(response)); 
					s(response);
					
                });
				
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        showDialog: function (options, s, f) {
            
            if (!options.name) {
                options.name = "";
            }
            if (!options.caption) {
                options.caption = "";
            }
            if (!options.description) {
                options.description = "";
            }
            if (!options.link) {
                options.link = "";
            }
            if (!options.picture) {
                options.picture = "";
            }
            
            // Try will catch errors when SDK has not been init
            try {
                FB.ui({
                    method: options.method,
                    name: options.name,
                    caption: options.caption,
                    description: (
                        options.description
                    ),
                    link: options.link,
                    picture: options.picture
                },
                function (response) {
                    if (response && response.post_id) {
                        s({ post_id: response.post_id });
                    } else {
                        f(response);
                    }
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },
        // Attach this to a UI element, this requires user interaction.
        login: function (permissions, s, f) {
            // JS SDK takes an object here but the native SDKs use array.
            var permissionObj = {};
            if (permissions && permissions.length > 0) {
                permissionObj.scope = permissions.toString();
            }
            
            FB.login(function (response) {
                if (response.authResponse) {
                    s(response);
                } else {
                    f(response.status);
                }
            }, permissionObj);
        },

        getAccessToken: function (s, f) {
            var response = FB.getAccessToken();
            if (!response) {
                if (!f) {
                    console.error("NO_TOKEN");
                } else {
                    f("NO_TOKEN");
                }
            } else {
                s(response);
            }
        },

        logout: function (s, f) {
            // Try will catch errors when SDK has not been init
            try {
                FB.logout( function (response) {
                    s(response);
                })
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        api: function (graphPath, permissions, s, f) {
            // JS API does not take additional permissions
            
            // Try will catch errors when SDK has not been init
            try {
                FB.api(graphPath, function (response) {
                    if (response.error) {
                        f(response);
                    } else {
                        s(response);
                    }
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        // Browser wrapper API ONLY
        browserInit: function (appId, version) {
            if (!version) {
                version = "v2.0";
            }
            FB.init({
                appId      : appId,
                xfbml      : true,
                version    : version
            })
        }
    };
    
    // Bake in the JS SDK
   /* (function () {
        console.log("launching FB SDK")
        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/sdk.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
    }());*/
	
	if (!window.cordova) {
	 window.fbAsyncInit = function() {
  FB.init({
    appId      : '735890629767850',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  /*FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });*/

  };

	}
	
	(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

}
