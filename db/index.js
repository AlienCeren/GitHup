const mongoose = require("mongoose");

mongoose.connect(process.env["MONGO_URI"]);

const File = mongoose.model("File", {
	hash: String,
	filename: String,
	partitions: Array
});

const saveFileDB = (filename, file_name_hash, partitions) => {
	return new Promise((resolve, reject) => {
		let file = new File({ filename, hash: file_name_hash, partitions });
		file.save()
		.then(() => {
			console.log("Saved a file");
			resolve();
		});
	});
};

const findFileHash = (filename) => {
	return new Promise((resolve, reject) => {
		File.findOne({ filename },  (err, file) => {
			if(err) return reject(err);
			resolve(file);
		});
	});
};

const findAllFiles = () => {
	return new Promise((resolve, reject) => {
		File.find({}, (err, files) => {
			resolve(files);
		});
	});
};

module.exports.saveFileDB = saveFileDB;
module.exports.findFileHash = findFileHash;
module.exports.findAllFiles = findAllFiles;
