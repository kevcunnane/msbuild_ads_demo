'use strict';
import * as vscode from 'vscode';

import * as sqlops from 'sqlops';

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(vscode.commands.registerCommand('extension.showCurrentConnection',
    async (context?: sqlops.ObjectExplorerContext) => 
    {
        if (context && context.connectionProfile) {
            // We launched from the Connections viewlet's context menu
            let serverName = context.connectionProfile.serverName;
            let dbName = context.connectionProfile.databaseName || '<Default>';
            vscode.window.showInformationMessage(`Using ${serverName}:${dbName}`);
        } else {
            // We launched from the command palette
            // Note: in the future all APIs will return IConnectionProfile!
            let connection: sqlops.connection.Connection = await sqlops.connection.getCurrentConnection();
            let serverName = connection.options['server'];
            let dbName = connection.options['database'] || '<Default>';

            let message = connection ? 
                `Using ${serverName}:${dbName}`
                : 'No Connection found!';
            vscode.window.showInformationMessage(message);
        }
    }));
}