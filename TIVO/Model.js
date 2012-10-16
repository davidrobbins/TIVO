
guidedModel =// @startlock
{
	Team_Project :
	{
		events :
		{
			onInit:function()
			{// @endlock
				this.review_date = new Date();
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
				this.Dept = "Hardware";
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
