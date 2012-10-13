
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		//SignIn button
		if (WAF.directory.loginByPassword(WAF.sources.loginObject.loginName, WAF.sources.loginObject.loginPassword)) {
			if (WAF.directory.currentUserBelongsTo("Admin")) {
				/*
				//hide login stuff
				$$("richText1").setValue("Signed in as : " + WAF.directory.currentUser().fullName);
				$$("signInContainer").hide();
				$$("signOutContainer").show();
				*/
				
				$("#mainContainer").show();
				$("#splashContainer").css("top", "-1px");
				$$("splashContainer").hide();
				$$("loginTextField").setValue("");
				$$("passwordTextField").setValue("");
				//$$("signInError").setValue("");
				
			} else {
				WAF.directory.logout();
				$$("signInError").setValue("Only the Administrator can sign in to this application.");
			} //(WAF.directory.currentUserBelongsTo("Administrator"))
		
	} else {
		//$$("signInError").setValue("Invalid login.");
	}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() === null) {
			$("#mainContainer").hide();
			$("#splashContainer").css("top", "84px");
			$("#splashContainer").css("left", "20px");
			$("#splashContainer").show();
		} else {
			$("#mainContainer").show();
			$("#splashContainer").css("top", "-1px");
			$("#splashContainer").hide();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
