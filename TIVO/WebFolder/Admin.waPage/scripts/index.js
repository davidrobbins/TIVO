
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var chooseManagerButton = {};	// @button
	var chooseManagerOkButton = {};	// @button
	var chooseManagerCancelButton = {};	// @button
	var cancelProjectButton = {};	// @button
	var saveProjectButton = {};	// @button
	var newProjectButton = {};	// @button
	var saveTeamButton = {};	// @button
	var cancelTeamButton = {};	// @button
	var newTeamButton = {};	// @button
	var cancelButton = {};	// @button
	var newUser = {};	// @button
	var saveButton = {};	// @button
	var signOutbutton = {};	// @button
	var signInButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	chooseManagerButton.click = function chooseManagerButton_click (event)// @startlock
	{// @endlock
		//Choose Manager Open Dialog Button
		$('#chooseManagerDialog').css("top", 200);
		$('#chooseManagerDialog').css("left", 350);
		WAF.widgets['chooseManagerDialog'].displayDialog();
	};// @lock

	chooseManagerOkButton.click = function chooseManagerOkButton_click (event)// @startlock
	{// @endlock
		waf.sources.team.manager.set(waf.sources.user1);
		waf.sources.team.serverRefresh();
		$$('chooseManagerDialog').closeDialog(); //ok button
	};// @lock

	chooseManagerCancelButton.click = function chooseManagerCancelButton_click (event)// @startlock
	{// @endlock
		$$('chooseManagerDialog').closeDialog(); //cancel button
	};// @lock

	cancelProjectButton.click = function cancelProjectButton_click (event)// @startlock
	{// @endlock
		//Cancel Project Button
		tivoAdminUtil.setMessageValue("messageRichText", "", false);
		var primKey = WAF.sources.project.ID;
		WAF.sources.project.selectByKey(primKey, {
			onSuccess: function(event) {
				
			},
			onError: function(error) {
				
			}
		});
		
	};// @lock

	saveProjectButton.click = function saveProjectButton_click (event)// @startlock
	{// @endlock
		//Save Project Buton
		WAF.sources.project.save({
			onSuccess: function(event) {
				if (waf.sources.project.getPosition() === -1) {
					WAF.sources.project.addEntity(event.dataSource.getCurrentElement());
				}
				tivoAdminUtil.setMessageValue("messageRichText", "Project saved successfully.", false);
			},
			onError: function(error) {
				var myError = error['error'][0];
				tivoAdminUtil.setMessageValue("messageRichText", myError, false);
			}	
		});
		
	};// @lock

	newProjectButton.click = function newProjectButton_click (event)// @startlock
	{// @endlock
		//New Project Button
		ds.Project.newProject({
			onSuccess: function(event) {
				WAF.sources.project.setCurrentEntity(event.result);
				$$('projectNameTextField').focus();
				tivoAdminUtil.setMessageValue("messageRichText", "Enter the Project Name and Customer and click 'Save'.", false);
			}
		});
		
	};// @lock

	saveTeamButton.click = function saveTeamButton_click (event)// @startlock
	{// @endlock
		//Save Team
		WAF.sources.team.save({
			onSuccess: function(event) {
				if (waf.sources.team.getPosition() === -1) {
					WAF.sources.team.addEntity(event.dataSource.getCurrentElement());
				}
				tivoAdminUtil.setMessageValue("messageRichText", "Team saved successfully.", false);
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
		tivoAdminUtil.setMessageValue("messageRichText", "", false);
		var primKey = WAF.sources.team.ID;
		WAF.sources.team.selectByKey(primKey, {
			onSuccess: function(event) {
				
			},
			onError: function(error) {
				
			}
		});
	};// @lock

	newTeamButton.click = function newTeamButton_click (event)// @startlock
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
				if (waf.sources.user.getPosition() === -1) {
					WAF.sources.user.addEntity(event.dataSource.getCurrentElement());
				}
				tivoAdminUtil.setMessageValue("messageRichText", "User saved successfully.", false);
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
		//fix for combobox render bug where button get shoved
		// to the next line because input element grows by 2 px.
		var inputWidth = $('#chooseManagerCombobox input').css('width');
		$('#chooseManagerCombobox input').css('width', "-=2");	
		
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
	WAF.addListener("chooseManagerButton", "click", chooseManagerButton.click, "WAF");
	WAF.addListener("chooseManagerOkButton", "click", chooseManagerOkButton.click, "WAF");
	WAF.addListener("chooseManagerCancelButton", "click", chooseManagerCancelButton.click, "WAF");
	WAF.addListener("cancelProjectButton", "click", cancelProjectButton.click, "WAF");
	WAF.addListener("saveProjectButton", "click", saveProjectButton.click, "WAF");
	WAF.addListener("newProjectButton", "click", newProjectButton.click, "WAF");
	WAF.addListener("saveTeamButton", "click", saveTeamButton.click, "WAF");
	WAF.addListener("cancelTeamButton", "click", cancelTeamButton.click, "WAF");
	WAF.addListener("newTeamButton", "click", newTeamButton.click, "WAF");
	WAF.addListener("cancelButton", "click", cancelButton.click, "WAF");
	WAF.addListener("newUser", "click", newUser.click, "WAF");
	WAF.addListener("saveButton", "click", saveButton.click, "WAF");
	WAF.addListener("signOutbutton", "click", signOutbutton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
