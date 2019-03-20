/*
 * Game of Life
 * 
 * A version of John Conway's classic Game of Life, written in C.
 * CIS 343 - Winter 2019
 *
 * Author:  Jongin Seon, Christian Tsoungui Nkoulou
 * 
 * 
 */
// Import our grid definitions
const grid = require('./gol.js');
// Import a buffer library
const Buffer = require('buffer').Buffer;
// Import a synchronous prompt library
const prompt = require('prompt-sync')();
//File system for Node.js
var fs = require('fs');


function main(){
	//creates the game of life object
	let myGrid = new grid();
	//Temporary grid to save grid after file being read 
	let temGrid =[];

	if(process.argv.length != 3){
		console.log("This program requires a file name and no other parameters to start.\n\n");
		process.exit();
	}

	//reads the file by byte
	fs.open(process.argv[2], 'r', function(err, fd) {
		
		if (err)
		  throw err;
		buffer =  Buffer.alloc(1);
		while (true)
		{   
		  let num = fs.readSync(fd, buffer, 0, 1, null);
		  if (num ==0)
		{
			break;
		}
			temGrid.push(buffer[0]);
		}

	let height = temGrid[0];
	let width = temGrid[1];

	console.log("Beginning with grid size " + height + " by "+ width+"\n");
	myGrid.get_grid(temGrid);
	myGrid.print_grid();

    while(1){
    
    console.log("q: Quit w: Save ");
    console.log("n: Multiple iteration ");
    console.log("key to continue to the next generation.\n\n");
    
    var input = prompt("Enter: ");

    switch(input){

        case 'q':
            // Case 'q' results in exiting the game.
			process.exit();
			break;

        case 'w':
            // Case 'w' writes the current board to disk.  
            let file = prompt("Enter a filename: ");
			var content = new Buffer(2 + (height*width));
     
        	for (let i = 0; i < height; ++i) {
            	for (let j = 0; j < width; ++j) {
                	content[i*width + j] = myGrid.grid[i][j];
            }            
		}
			for( let k = (height * width)+2; k>1; --k){
				content[k] = content[k-2];
			}
			content[0] = height;
			content[1] = width;      
			 
			myGrid.save(file,content);
			console.log("Grid saved");
			
				break;

			case 'n':
				// 'n' causes us to ask the user how
				// many evolutions to perform in a row,
				// then executes them in a loop.
				let iterate = prompt("How many iterations? ");
				console.log();
				
				for (let i = 0; i < iterate; i++) {
					myGrid.mutate();
					console.log("Iterating " + (i+1) + " times.\n\n");
					myGrid.print_grid()
				}
				break;

			default:
				// Any other key and we evolve one iteration,
				// print, and keep going.
				myGrid.mutate();
				myGrid.print_grid()
		}
	}
});
}
console.clear();
main();