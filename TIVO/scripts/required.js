﻿﻿/* This is a regular JS file */function tivoLogin(userName, password) {	//Need permission to read User class for new session.	var sessionRef = currentSession(); // Get session.	var promoteToken = sessionRef.promoteWith("Administrator"); //temporarily make this session Admin level.		var myUser = ds.User({login:userName});	if (myUser === null) {		return false;	} else {		//we will handle login		if (myUser.validatePassword(password)) {			var theGroups = [];						switch (myUser.role) {				case "Director":				theGroups = ['Director'];				break;								case "Manager":				theGroups = ['Manager'];				break;				default:				theGroups = ['Employee'];				break;			}			var connectTime = new Date();			return {				ID: myUser.ID,				name: myUser.login,				fullName: myUser.fullName,				belongsTo: theGroups,				storage: { 	time: connectTime				}			}					} else {					return {error: 1024, errorMessage: "invalid login"};		}			}		sessionRef.unPromote(promoteToken); //put the session back to normal.} //tivoLogin