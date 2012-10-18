
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItem6 = {};	// @menuItem
	var menuItem5 = {};	// @menuItem
	var cancelPRTButton = {};	// @button
	var savePRTButton = {};	// @button
	var newPRTButton = {};	// @button
	var openChooseProjectDialogButton = {};	// @button
	var openChooseTeamDialogButton = {};	// @button
	var chooseProjectOkButton = {};	// @button
	var button9 = {};	// @button
	var chooseTeamOKButton = {};	// @button
	var chooseTeamCancelButton = {};	// @button
	var signInButton = {};	// @button
	var signoutButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	menuItem6.click = function menuItem6_click (event)// @startlock
	{// @endlock
		//Another Chart
		/*
		$.jqplot('anotherChartContainer',  [
					[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]], 
					[[1, 4],[3,22],[5,68],[7,32],[9,78],[11,22]],
				 	[[1, 78],[3,43],[5,54],[7,37],[9,12],[11,44]]
			],
			{legend:{show: true, labels: ['one', 'two', 'three']}, series:[{color:'red'}]}
		);
		*/
		
		/**/
		waf.sources.team_Project.jqPlotMultiSeries({
			onSuccess: function(event) {
				//event.result
				$.jqplot('anotherChartContainer',  
					event.result, {title: "Review Criteria Chart", legend:{show: true, labels: ['quality', 'delivery', 'productivity', 'staffing']}}
					//,{legend:{show: true, labels: ['quality', 'delivery', 'productivity', 'staffing']}}
				);
			}
		});
		
	};// @lock

	menuItem5.click = function menuItem5_click (event)// @startlock
	{// @endlock
		// Chart Tab
		//jqPlotTest
		//$.jqplot('chartContainer',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
		//$.jqplot('chartContainer',  waf.sources.team_Project.jqPlotTest());
		
		waf.sources.team_Project.jqPlotTest({
			onSuccess: function(event) {
				//event.result
				$.jqplot('chartContainer',  event.result, {title: "Performance Review Total Score"});
			}
		});
			
	};// @lock

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
		ds.Team_Project.newReview({
			onSuccess: function(event) {
				WAF.sources.team_Project.setCurrentEntity(event.result);
				//reset comboboxes to zero
				waf.sources.qualityArray.select(0);
				waf.sources.deliveryArray.select(0);
				waf.sources.productivityArray.select(0);
				waf.sources.staffingArray.select(0);
				
				waf.sources.qualityArray.sync();
				waf.sources.deliveryArray.sync();
				waf.sources.productivityArray.sync();
				waf.sources.staffingArray.sync();
				
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

	chooseProjectOkButton.click = function chooseProjectOkButton_click (event)// @startlock
	{// @endlock
		waf.sources.team_Project.project.set(waf.sources.project);
		waf.sources.team_Project.serverRefresh();
		$('#chooseProjectDialog').css("top", -400);
		$('#chooseProjectDialog').css("left", -400);
		$$('chooseProjectDialog').closeDialog(); //ok button
	};// @lock

	button9.click = function button9_click (event)// @startlock
	{// @endlock
		$('#chooseProjectDialog').css("top", -400);
		$('#chooseProjectDialog').css("left", -400);
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
			
			WAF.sources.team.setEntityCollection();	
			WAF.sources.project.setEntityCollection();
			WAF.sources.team_Project.setEntityCollection();	
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//Quality Array Datasource.
		qualityArray = [];
		qualityArray.push({title: 0});
		qualityArray.push({title: 1});
		qualityArray.push({title: 2});
		qualityArray.push({title: 3});
		qualityArray.push({title: 4});
		qualityArray.push({title: 5});
		WAF.sources.qualityArray.sync();
		
		//Delivery Array Datasource.
		deliveryArray = [];
		deliveryArray.push({title: 0});
		deliveryArray.push({title: 1});
		deliveryArray.push({title: 2});
		deliveryArray.push({title: 3});
		deliveryArray.push({title: 4});
		deliveryArray.push({title: 5});
		WAF.sources.deliveryArray.sync();
		
		//Productivity Array Datasource.
		productivityArray = [];
		productivityArray.push({title: 0});
		productivityArray.push({title: 1});
		productivityArray.push({title: 2});
		productivityArray.push({title: 3});
		productivityArray.push({title: 4});
		productivityArray.push({title: 5});
		WAF.sources.productivityArray.sync();
		
		//Staffing Array Datasource.
		staffingArray = [];
		staffingArray.push({title: 0});
		staffingArray.push({title: 1});
		staffingArray.push({title: 2});
		staffingArray.push({title: 3});
		staffingArray.push({title: 4});
		staffingArray.push({title: 5});
		WAF.sources.staffingArray.sync();
		
		//fix for combobox render bug where button get shoved
		// to the next line because input element grows by 2 px.
		var inputWidth = $('#teamCombobox input').css('width');
		$('#teamCombobox input').css('width', "-=2");	
		
		var inputWidth = $('#projectCombobox input').css('width');
		$('#projectCombobox input').css('width', "-=2");	
		
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
			
			WAF.sources.team.setEntityCollection();	
			WAF.sources.project.setEntityCollection();
			WAF.sources.team_Project.setEntityCollection();	
			
		} else {
			$$("signOutContainer").show();
			$$("signInContainer").hide();
			
			$("#mainContainer").show();
			$("#splashContainer").css("top", "-1px");
			$("#splashContainer").hide();
			
			$$("signInRichText").setValue("Signed in as : " + WAF.directory.currentUser().fullName);
			waf.sources.team.all();
			waf.sources.project.all();
			waf.sources.team_Project.all();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItem6", "click", menuItem6.click, "WAF");
	WAF.addListener("menuItem5", "click", menuItem5.click, "WAF");
	WAF.addListener("cancelPRTButton", "click", cancelPRTButton.click, "WAF");
	WAF.addListener("savePRTButton", "click", savePRTButton.click, "WAF");
	WAF.addListener("newPRTButton", "click", newPRTButton.click, "WAF");
	WAF.addListener("openChooseProjectDialogButton", "click", openChooseProjectDialogButton.click, "WAF");
	WAF.addListener("openChooseTeamDialogButton", "click", openChooseTeamDialogButton.click, "WAF");
	WAF.addListener("chooseProjectOkButton", "click", chooseProjectOkButton.click, "WAF");
	WAF.addListener("button9", "click", button9.click, "WAF");
	WAF.addListener("chooseTeamOKButton", "click", chooseTeamOKButton.click, "WAF");
	WAF.addListener("chooseTeamCancelButton", "click", chooseTeamCancelButton.click, "WAF");
	WAF.addListener("signInButton", "click", signInButton.click, "WAF");
	WAF.addListener("signoutButton", "click", signoutButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
