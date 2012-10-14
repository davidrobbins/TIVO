
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var signOutbutton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	signOutbutton.click = function signOutbutton_click (event)// @startlock
	{// @endlock
		//SignOut button
		if (WAF.directory.logout()) {
			//hide logout stuff
			$$("signInRichText").setValue("");
			$$("signOutContainer").hide();
			$$("signInContainer").show();
			$$("mainContainer").hide();
			$("#splashContainer").css("top", "84px");
			$("#splashContainer").css("left", "0px");
			$$("splashContainer").show();	
		}
	};// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		//SignIn button
		tivoAdminUtil.signIn();
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		$('#loginTextField, #passwordTextField').live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			tivoAdminUtil.signIn();
	    	}
		});
		
		$$("signInRichText").setValue("");
		
		if (WAF.directory.currentUser() === null) {
			$$("signOutContainer").hide();
			$$("signInContainer").show();
			
			$("#mainContainer").hide();
			$("#splashContainer").css("top", "84px");
			$("#splashContainer").css("left", "0px");
			$("#splashContainer").show();
			
		} else {
			$$("signOutContainer").show();
			$$("signInContainer").hide();
			
			$("#mainContainer").show();
			$("#splashContainer").css("top", "-1px");
			$("#splashContainer").hide();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signOutbutton", "click", signOutbutton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
