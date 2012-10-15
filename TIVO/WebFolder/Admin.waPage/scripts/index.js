
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var saveTeamButton = {};	// @button
	var cancelTeamButton = {};	// @button
	var button3 = {};	// @button
	var cancelButton = {};	// @button
	var newUser = {};	// @button
	var saveButton = {};	// @button
	var signOutbutton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	saveTeamButton.click = function saveTeamButton_click (event)// @startlock
	{// @endlock
		//Save Team
		WAF.sources.team.save({
			onSuccess: function(event) {
				tivoAdminUtil.setMessageValue("messageRichText", "Team entity saved successfully.", false);
			},
			onError: function(error) {
				var myError = error['error'][0];
				tivoAdminUtil.setMessageValue("messageRichText", myError, false);
			}	
		});
	};// @lock

	cancelTeamButton.click = function cancelTeamButton_click (event)// @startlock
	{// @endlock
		//Cancel Team Button
		//Cancel button
		tivoAdminUtil.setMessageValue("messageRichText", "", false);
		var primKey = WAF.sources.team.ID;
		WAF.sources.team.selectByKey(primKey, {
			onSuccess: function(event) {
				
			},
			onError: function(error) {
				
			}
		});
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		//New Team Button
		ds.Team.newTeam({
			onSuccess: function(event) {
				WAF.sources.team.setCurrentEntity(event.result);
				$$('teamNameTextField').focus();
				tivoAdminUtil.setMessageValue("messageRichText", "Enter the Name, Dept., and Manager and click 'Save'.", false);
			}
		});
	};// @lock

	cancelButton.click = function cancelButton_click (event)// @startlock
	{// @endlock
		//Cancel button
		tivoAdminUtil.setMessageValue("messageRichText", "", false);
		var primKey = WAF.sources.user.ID;
		WAF.sources.user.selectByKey(primKey, {
			onSuccess: function(event) {
				
			},
			onError: function(error) {
				
			}
		});
	};// @lock

	newUser.click = function newUser_click (event)// @startlock
	{// @endlock
		// New User Button
		ds.User.newUser({
			onSuccess: function(event) {
				WAF.sources.user.setCurrentEntity(event.result);
				$$('nameTextField').focus();
				tivoAdminUtil.setMessageValue("messageRichText", "Enter the Name, Login, and Password and click 'Save'.", false);
			}
		});
	};// @lock

	saveButton.click = function saveButton_click (event)// @startlock
	{// @endlock
		//Save User
		WAF.sources.user.save({
			onSuccess: function(event) {
				tivoAdminUtil.setMessageValue("messageRichText", "User entity saved successfully.", false);
			},
			onError: function(error) {
				var myError = error['error'][0];
				tivoAdminUtil.setMessageValue("messageRichText", myError, false);
			}	
		});
	};// @lock

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
		roleArray = [];
		roleArray.push({title: 'Manager'});
		roleArray.push({title: 'Director'});
		WAF.sources.roleArray.sync();
		
		deptArray = [];
		deptArray.push({title: 'Hardware'});
		deptArray.push({title: 'Software'});
		deptArray.push({title: 'TV Listings'});
		deptArray.push({title: 'Customer Relations'});
		WAF.sources.deptArray.sync();
		
		
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
	WAF.addListener("saveTeamButton", "click", saveTeamButton.click, "WAF");
	WAF.addListener("cancelTeamButton", "click", cancelTeamButton.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("cancelButton", "click", cancelButton.click, "WAF");
	WAF.addListener("newUser", "click", newUser.click, "WAF");
	WAF.addListener("saveButton", "click", saveButton.click, "WAF");
	WAF.addListener("signOutbutton", "click", signOutbutton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
