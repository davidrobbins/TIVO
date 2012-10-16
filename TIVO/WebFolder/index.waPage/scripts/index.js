
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var cancelPRTButton = {};	// @button
	var savePRTButton = {};	// @button
	var newPRTButton = {};	// @button
	var openChooseProjectDialogButton = {};	// @button
	var openChooseTeamDialogButton = {};	// @button
	var button10 = {};	// @button
	var button9 = {};	// @button
	var chooseTeamOKButton = {};	// @button
	var chooseTeamCancelButton = {};	// @button
	var signInButton = {};	// @button
	var signoutButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	cancelPRTButton.click = function cancelPRTButton_click (event)// @startlock
	{// @endlock
		// Cancel Review Button
		tivoUtil.setMessageValue("messageRichText", "", false);
		var primKey = WAF.sources.team_Project.ID;
		WAF.sources.team_Project.selectByKey(primKey, {
			onSuccess: function(event) {
				
			},
			onError: function(error) {
				
			}
		});
	};// @lock

	savePRTButton.click = function savePRTButton_click (event)// @startlock
	{// @endlock
		//Save Review
		WAF.sources.team_Project.save({
			onSuccess: function(event) {
				if (waf.sources.team_Project.getPosition() === -1) {
					WAF.sources.team_Project.addEntity(event.dataSource.getCurrentElement());
				}
				tivoUtil.setMessageValue("messageRichText", "Review saved successfully.", false);
			},
			onError: function(error) {
				var myError = error['error'][0];
				tivoUtil.setMessageValue("messageRichText", myError, false);
			}	
		});
	};// @lock

	newPRTButton.click = function newPRTButton_click (event)// @startlock
	{// @endlock
		//New Project Team Review
		//New Team Button
		ds.Team_Project.newReview({
			onSuccess: function(event) {
				WAF.sources.team_Project.setCurrentEntity(event.result);
				//$$('teamNameTextField').focus();
				tivoUtil.setMessageValue("messageRichText", "Enter the Scores and click 'Save'.", false);
			}
		});
	};// @lock

	openChooseProjectDialogButton.click = function openChooseProjectDialogButton_click (event)// @startlock
	{// @endlock
		// Open Choose Project Dialog
		$('#chooseProjectDialog').css("top", 200);
		$('#chooseProjectDialog').css("left", 350);
		WAF.widgets['chooseProjectDialog'].displayDialog();
	};// @lock

	openChooseTeamDialogButton.click = function openChooseTeamDialogButton_click (event)// @startlock
	{// @endlock
		//open Choose Team Dialog
		$('#chooseTeamDialog').css("top", 200);
		$('#chooseTeamDialog').css("left", 350);
		WAF.widgets['chooseTeamDialog'].displayDialog();
	};// @lock

	button10.click = function button10_click (event)// @startlock
	{// @endlock
		$$('chooseProjectDialog').closeDialog(); //ok button
	};// @lock

	button9.click = function button9_click (event)// @startlock
	{// @endlock
		$$('chooseProjectDialog').closeDialog(); //cancel button
	};// @lock

	chooseTeamOKButton.click = function chooseTeamOKButton_click (event)// @startlock
	{// @endlock
		waf.sources.team_Project.team.set(waf.sources.team);
		waf.sources.team_Project.serverRefresh();
		$('#chooseTeamDialog').css("top", -400);
		$('#chooseTeamDialog').css("left", -400);
		$$('chooseTeamDialog').closeDialog(); //ok button
	};// @lock

	chooseTeamCancelButton.click = function chooseTeamCancelButton_click (event)// @startlock
	{// @endlock
		$('#chooseTeamDialog').css("top", -400);
		$('#chooseTeamDialog').css("left", -400);
		$$('chooseTeamDialog').closeDialog(); //cancel button
	};// @lock

	signInButton.click = function signInButton_click (event)// @startlock
	{// @endlock
		// Sign In
		tivoUtil.signIn();
	};// @lock

	signoutButton.click = function signoutButton_click (event)// @startlock
	{// @endlock
		//Sign Out
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

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$('#loginTextField, #passwordTextField').live('keyup', function (e) {
	   		if ( e.keyCode == 13 ){
	   			tivoUtil.signIn();
	    	}
		});
		
		// Add your code here
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
	WAF.addListener("cancelPRTButton", "click", cancelPRTButton.click, "WAF");
	WAF.addListener("savePRTButton", "click", savePRTButton.click, "WAF");
	WAF.addListener("newPRTButton", "click", newPRTButton.click, "WAF");
	WAF.addListener("openChooseProjectDialogButton", "click", openChooseProjectDialogButton.click, "WAF");
	WAF.addListener("openChooseTeamDialogButton", "click", openChooseTeamDialogButton.click, "WAF");
	WAF.addListener("button10", "click", button10.click, "WAF");
	WAF.addListener("button9", "click", button9.click, "WAF");
	WAF.addListener("chooseTeamOKButton", "click", chooseTeamOKButton.click, "WAF");
	WAF.addListener("chooseTeamCancelButton", "click", chooseTeamCancelButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("signoutButton", "click", signoutButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
