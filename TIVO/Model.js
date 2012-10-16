
guidedModel =// @startlock
{
	Team_Project :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				//Team_Project
				//return ds.Team_Project.all();
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
