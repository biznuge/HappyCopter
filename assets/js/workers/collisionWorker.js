self.addEventListener('message', function(e) {
	
	var data = e.data;
        var object = e.object;
        var projectile = e.projectile;
        
	switch (data.cmd) {
		case 'start':
			//var word = 'ABCDEFG';
			//self.postMessage('computePermutations.js WORKER STARTED: ' + data.msg);
			//var word = data.msg;
			//computationObject.rearrangeStart(word);
			//self.postMessage('computePermutations.js WORKER COMPLETE: ' + data.msg);
			
                        //self.postMessage({'worker': 'collisionWorker', 'event': 'complete', 'io': 'o' });
                            
                        //self.postMessage({'worker': 'collisionWorker', 'event': 'progress', 'io': 'o', 'object':object });
			
            
                        break;
		case 'stop':
			//self.postMessage('computePermutations.js WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
			self.close(); // Terminates the worker.
			break;
		default:
			//self.postMessage('collisionWorker.js Unknown command: ' + data.msg);
	};
}, false);