
guidedModel =// @startlock
{
	User :
	{
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
			onValidate:function()
			{// @endlock
				
			}// @startlock
		}
	}
};// @endlock
