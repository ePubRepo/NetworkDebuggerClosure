// Copyright 2013. All Rights Reserved.

// #ClosureDevModeHack
// Hack to allow Closure to work in development mode with Packaged Apps
// Need to start the Closure dependency process and the timing of loading JS
// files is messed up so start the process only after the framework
// dependencies have loaded. In particular, launch a new Bootstrap();
// at the bottom of the bootstrap.js file, thereby ensuring it has been loaded.
goog.require('ndebug.Bootstrap');
