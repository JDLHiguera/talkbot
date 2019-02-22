// models
var BotCommand = require('@models/BotCommand');

/**
 * Command: debugbork
 *
 * Allows the dev to kill the server if required
 *
 * @param   {[MessageDetails]}  msg     [message releated helper functions]
 * @param   {[Server]}          server  [Object related to the Server the command was typed in.]
 * @param   {[World]}           world   [Object related to the realm and general bot stuff]
 *
 * @return  {[undefined]}
 */
function kill(msg, server, world) {
  if (msg.ownerIsDev()) {
    server.kill();
  }
};

/**
 * Command: ohshit
 *
 * Allows any user to save a state file for later examination by the devs
 *
 * @param   {[MessageDetails]}  msg     [message releated helper functions]
 * @param   {[Server]}          server  [Object related to the Server the command was typed in.]
 * @param   {[World]}           world   [Object related to the realm and general bot stuff]
 *
 * @return  {[undefined]}
 */
function ohshit(msg, server, world) {
  if (!msg.ownerIsMaster()) msg.response(server.lang('ohshit.nope'));
  else {
    server.save('./ohshit' + (new Date().getTime()) + '.json');
    msg.response(server.lang('ohshit.okay'));
  }
};

function debug(msg, server, world) {
  
  if (!msg.ownerIsDev()) return;
  
  var c = 0;
  for (var s in world.servers) {
    if (world.servers[s].isBound()) c++;
  }
  
  var r = "Active: " + c + "\n";
  r += "Servers: " + Object.keys(world.servers).length + "\n";
  
  if ( world.dailyStats && world.dailyStats.activeServers )
    r += "Daily Active Servers: " + Object.keys(world.dailyStats.activeServers).length; 
  
  r += "\n\nActive Servers:\n";
  for (var s in world.servers) {
    if (world.servers[s].isBound()) r += world.servers[s].server_name + " - " + world.servers[s].bound_to_username + "\n";
  }
  
  
  
  msg.response(r);
  
};

var command_kill = new BotCommand({
  command_name: 'debugbork',
  execute: kill,
  short_help: 'debugbork.shorthelp',
  long_help: 'debugbork.longhelp',
  hidden: true,
});

var command_ohshit = new BotCommand({
  command_name: 'ohshit',
  execute: ohshit,
  short_help: 'ohshit.shorthelp',
  long_help: 'ohshit.longhelp',
  hidden: true,
  group: "admin"
});

var command_debug = new BotCommand({
  command_name: 'debug',
  execute: debug,
  short_help: 'debug.shorthelp',
  long_help: 'debug.longhelp',
  hidden: true,
  group: "admin"
});

exports.register = function (commands) {
  commands.add(command_kill);
  commands.add(command_ohshit);
  commands.add(command_debug);
};

exports.unRegister = function (commands) {
  commands.remove(command_kill);
  commands.remove(command_ohshit);
  commands.remove(command_debug);
};
