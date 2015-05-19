var User = require('./../models/user'),
			 q = require('q')

module.exports = {
	//user from Google Authentication
	updateOrCreate: function(user){
		var dfd = q.defer();
		User.findOne({ googleId: user.id }, function(results){
			if(results){
				User.update({_id: results._id}, {
					name: user.displayName, 
					googleId: user.id,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(err, results){
						if(err){
							return dfd.reject(err)
						} else {
							dfd.resolve(results);
						}
				})
			}
		})
		return dfd.promise
	}
}