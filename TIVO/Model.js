﻿
guidedModel =// @startlock
{
	Team_Project :
	{
		collectionMethods :
		{// @endlock
			jqPlotMultiSeries:function()
			{// @lock
				// multiple series plot
				var jqPlovtArray = [];
				
				var qualitySeries = [];
				var deliverySeries = [];
				var productivitySeries = [];
				var staffingSeries = [];
				
				var count = 0;
				this.forEach(function(review) {
					count += 1;
					qualitySeries.push([count, review.quality]);
					deliverySeries.push([count, review.delivery]);		
					productivitySeries.push([count, review.productivity]);		
					staffingSeries.push([count, review.staffing]);							
				});
				
				jqPlovtArray.push(qualitySeries);
				jqPlovtArray.push(deliverySeries);
				jqPlovtArray.push(productivitySeries);
				jqPlovtArray.push(staffingSeries);
				
				return jqPlovtArray;
			},// @lock
			jqPlotTest:function()
			{// @lock
				
				var jqPlovtArray = [];
				var result = [];
				
				// Add your code here
				var count = 0;
				this.forEach(function(review) {
					count += 1;
					result.push([count, review.total_score]);					
				});
				
				jqPlovtArray.push(result);
				return jqPlovtArray;
				
				//return [ [   [1, 2],[3,5],[5,10],[7,25],[9,33],[11,24]    ] ];
				//return jqPlotArray;
			}// @startlock
		},
		total_score :
		{
			onGet:function()
			{// @endlock
				total = this.quality + this.delivery + this.productivity + this.staffing;
				return total;
			}// @startlock
		},
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				//Team_Project
				//return ds.Team_Project.all();
				/**/
				var myCurrentUser = currentUser(); // Get the current user
				var sessionRef = currentSession(); // Get session.
				var result = ds.Team_Project.createEntityCollection();
				
				if ((sessionRef.belongsTo("Administrator")) || (sessionRef.belongsTo("Director"))) {
					result = ds.Team_Project.all();
				} else  if (sessionRef.belongsTo("Manager")) {
					var myUser = ds.User.find("ID = :1", myCurrentUser.ID); // Load their user entity.
					if (myUser !== null) {
						result = ds.Team_Project.query("reviewer.login = :1", myCurrentUser.name);
					}
				}
				
				return result;
				
			},// @startlock
			onInit:function()
			{// @endlock
				var sessionRef = currentSession(); // Get session.
				var promoteToken = sessionRef.promoteWith("Administrator"); //temporarily make this session Admin level.
				
				var myCurrentUser = currentUser(); // we get the user of the current session.
				var myUser = ds.User.find("ID = :1", myCurrentUser.ID);
				this.reviewer = myUser;
				this.review_date = new Date();
				sessionRef.unPromote(promoteToken); //put the session back to normal.
			}// @startlock
		},
		methods :
		{// @endlock
			newReview:function()
			{// @lock
				// Create New Review
				return new ds.Team_Project();
			}// @startlock
		}
	},
	Project :
	{
		methods :
		{// @endlock
			newProject:function()
			{// @lock
				// Create New Project
				return new ds.Project();
			}// @startlock
		}
	},
	Team :
	{
		events :
		{
			onInit:function()
			{// @endlock
				//Team Init
				//this.Dept = "Hardware";
			}// @startlock
		},
		methods :
		{// @endlock
			getTeamNames:function()
			{// @lock
				var sessionRef = currentSession(); // Get session.
				var promoteToken = sessionRef.promoteWith("Manager"); //temporarily make this session Admin level.
				// create and array of team names for team filter.
				//var teamNames = ds.Team.toArray("name");
				var allTeams = ds.Team.all();
				
				 var teamNamesArray = [];
				 
				allTeams.forEach(function(theTeam) {
					tempObj = {};
					tempObj.title = theTeam.name;
					teamNamesArray.push(tempObj);
				});
				
				sessionRef.unPromote(promoteToken); //put the session back to normal.
				teamNamesArray.unshift({title: "All"});
				return teamNamesArray;
			},// @lock
			newTeam:function()
			{// @lock
				// Create New Team
				return new ds.Team();
			}// @startlock
		}
	},
	User :
	{
		methods :
		{// @endlock
			getLoginTime:function()
			{// @lock
				// For Lesser Know Features Demo
				return sessionStorage.time;
			},// @lock
			newUser:function()
			{// @lock
				// Create New User
				return new ds.User();
			}// @startlock
		},
		entityMethods :
		{// @endlock
			validatePassword:function(password)
			{// @lock
				//User
				var ha1 = directory.computeHA1(this.ID, password);
				return (ha1 === this.HA1Key); //true if validated, false otherwise.
			}// @startlock
		},
		password :
		{
			onGet:function()
			{// @endlock
				//User.password
				return "*****"; //could also return Null.
			},// @startlock
			onSet:function(value)
			{// @endlock
				//User.password
				this.HA1Key = directory.computeHA1(this.ID, value);
				//we use the ID to compute the HA1 key.
				//I need to check password compliance here - not blank, number of chars.
			}// @startlock
		},
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var result = ds.User.createEntityCollection();
				
				if (currentSession().belongsTo("Administrator") || currentSession().belongsTo("Director")) {
					result = ds.User.all();
				
				} else if (currentSession().belongsTo("Manager")) {
					result = ds.User.query("login = :1", currentUser().name);
				}
				
				return result;
			},// @startlock
			onInit:function()
			{// @endlock
				this.role = "Manager";
			},// @startlock
			onValidate:function()
			{// @endlock
				if (this.login === "admin") {
					return {error: 910, errorMessage: "You cannot create a user with a login name of 'admin'."};
				}
			}// @startlock
		}
	}
};// @endlock
