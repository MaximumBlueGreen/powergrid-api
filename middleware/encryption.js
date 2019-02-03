const { promisify, props } = require("bluebird");
const { randomBytes, pbkdf2 } = require("crypto");

const saltLength = 32;
const hashLength = 128;
const numIterations = 10;

function encrypt(password) {
	return promisify(randomBytes)(saltLength)
		.then(salt => salt.toString("hex"))
		.then(salt => props({ hash: promisify(pbkdf2)(password, salt, numIterations, hashLength, "sha256"), salt }))
		.then(({ hash, salt }) => ({ hash: hash.toString("hex"), salt }));
}

function validate(password, salt, hash) {
	return promisify(pbkdf2)(password, salt, numIterations, hashLength, "sha256")
		.then(h => {
			if (h.toString("hex") === hash) {
				return;
			} else {
				throw new Error("Passwords do not match.");
			}
		});
}

module.exports = { encrypt, validate };
