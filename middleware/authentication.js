const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
module.exports = {
	authenticate: function (req, res, next) {
	/* Bearer Token */
	/* Make secret actually secret */
		var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers["x-token"];
		if (token) {
			jwt.verify(token, jwtSecret, function (error, decoded) {
				if (error) {
					res.end("Token error; " + error, 400);
				} else {
					req.user_id = decoded.id;
					next();
				}
			});
		} else {
			res.end("No token provided", 400);
		}
	},
	generate: function (user) {
		return jwt.sign(user, jwtSecret, {
			expiresIn: "24h"
		});
	}
};
