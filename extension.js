// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// import {getCurrentLine} from './workhard.js';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tomaswork" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tomaswork.tomas', function () {
		// The code you place here will be executed every time your command is executed

		var currentLine = getTicketForFix();
		if (currentLine){
			vscode.window.showInformationMessage('Ticket '+  currentLine.toString() + ' will be fixed in few seconds by Tomas');
			return;
		}

		vscode.window.showInformationMessage('No ticket for Tomas');
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}


function getTicketForFix() {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor != null) {
		var currentLine = activeEditor.document.lineAt(activeEditor.selection.active.line);
		var jiraTicket = getJiraNumber(currentLine.text);
        return jiraTicket;
    }
    return null;
}

function getJiraNumber(text){
	var jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g
	text = reverseString(text)
	var m = text.match(jira_matcher);

	if (m == null){
		return null;
	}
	// Also need to reverse all the results!
	for (var i = 0; i < m.length; i++) {
		m[i] = reverseString(m[i])
	}
	
	m.reverse()
	return m[0];
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

module.exports = {
	activate,
	deactivate
}
