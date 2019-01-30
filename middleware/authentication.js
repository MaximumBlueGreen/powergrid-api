const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
	authenticate: function (req, res, next) {
		if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
			const token = req.headers.authorization.split(" ")[1];
			jwt.verify(token, jwtSecret, function (error, decoded) {
				if (error) {
					res.sendStatus(401);
				} else {
					req.user_id = decoded.id;
					next();
				}
			});
		} else {
			res.sendStatus(400);
		}
	},
	generate: function (user) {
		return jwt.sign(user, jwtSecret, {
			expiresIn: "24h",
		});
	},
};
