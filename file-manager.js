// Include fs module
var fs = require("fs");

function useStdin() {//standard input
	//saves input from termial
	var input = process.stdin.read();

	if (input === null) {
		return;
	}

	// console.log(input.toString());

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");//.toString() to interpet input as string. //trim()takes off white space.
	// inputSplit === cat file.txt
	if (inputSplit[0] === "cat") {//cat gives the the contents in the file
		 catFile(inputSplit[1]);
	} else if (inputSplit[0] === "touch") {//touch writes and new file
		touchFile(inputSplit[1]);
	} else if (inputSplit[0] === "remove") {//remove deletes a file
		removeFile(inputSplit[1]);
	} else if (inputSplit[0] === "search_replace") {//search_replace searches words and replaces them
		findReplace(inputSplit[1], inputSplit[2], inputSplit[3]);
	} else if (inputSplit[0] === 'grep') {//grep reads files and returns the searched items line in file.
		findLine(inputSplit[1], inputSplit[2]);
	} else if (inputSplit[0] === 'mkdir') {
		makeDir(inputSplit[1]);
	} else if (inputSplit[0] === 'rmdir') {
		removeDir(inputSplit[1]);
	}
}
//slightly confused by this call?
process.stdin.on("readable", useStdin);//checks for readability

function catFile(fileName) {//takes in file and reads it.
	fs.readFile(fileName, function(err, data) {//callback function. returns the info in file. 
		if (err) {
			console.log(err);//do this in general for error handeling
			return;
		}
		console.log(data.toString());
	});
}

function touchFile(fileName) {
	//creates new file
	fs.appendFile(fileName, "", function(err) {
		if (err) {
			console.log(err);
			return;
		}
		//runs if the creation was successful
		console.log("Touched file!");
	});
}

function removeFile(fileName) {
	//delets file
	fs.unlink(fileName, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		//runs if deletion was successful
		console.log("File removed!");
	});
}

function findReplace(fileName, old, new_) {
	//reads the file, returns the text from file
	fs.readFile(fileName, function(err, fileData) {
		if (err) {
			console.log(err);
			return;
		}
		//uses the replace method to change the character or words inputed in the string
		var replacedStr = fileData.toString().replace(old, new_);
		fs.writeFile(fileName, replacedStr, function(err) {
			if (err) {
			console.log(err);
			return;
			}
			//prints what the new file looks like
			console.log(replacedStr);
		});
	});
}

function findLine(fileName, search) {
	//the grep function. reads file returns text
	fs.readFile(fileName, function(err, fileData) {
		if (err) {
			console.log(err);
			return;
		}
		//splits into string at lines, loops the array and returns line number and text if the search finds true 
		var toSearchArr = fileData.toString().split('\n');
		for (var line in toSearchArr) {
			if (toSearchArr[line].includes(search)) {
				console.log('line ' + line);
				console.log(toSearchArr[line]);
			}
		}
	});
}

function makeDir(folderName) {
	//makes new folder in same location as this file
	fs.mkdir(folderName, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		//does this if successful
		console.log(folderName + ' Created!');
	});
} 

function removeDir(folderName) {
	//removes folder in same location as this file
	fs.rmdir(folderName, function(err) {
		if (err) {
			console.log(err);
			return;
		}
		//does this if successful
		console.log(folderName + ' removed');
	});
} 

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

