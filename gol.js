
/**
 * gol
 * Defines a gol "class" for an game of life game.
 */

module.exports = class gol{ 
	
    constructor(){
		//initializing the grid 
		for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

	/*
	 * get_grid creates new memory for a "grid".
	 * @param data the grid read by file
	 */
    get_grid(data){
        this.row = data[0];
        this.col = data[1];
        let start = 2;

		this.grid = new Array(this.row);
		for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array(this.col);
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j] = data[start++]; 
            }
        }
    }
    
    /*
	 * print_grid attempts to print rows and cols
	 * grid stored at the location provided by grid
	 */
    print_grid()
    {
        console.log("========================\n");		
		
    //Creates a grid to display a live or dead cell		
   
		for (let i = 0; i < this.row; ++i) {
			for (let j = 0; j < this.col; ++j) {
              
				// A live cell
                if( this.grid[i][j] == 1 ) 
                process.stdout.write('O'); 
            
                //A dead cell
                else if (this.grid[i][j] == 0)
                process.stdout.write('X'); 
        
			}
			console.log("\n");
		}
	console.log("========================\n");
    }
    /*
	 * mutate takes a grid and mutates that grid
	 * according to Conway's rules. A new grid
	 * is returned.
	 */
    save(file,contents){
        let fs = require('fs');
        fs.writeFileSync(file, contents);
    }
	
	
    mutate(){
     //creates a new grid for update
     let new_grid = new Array(this.row);
     for (let k = 0; k < this.row; k++) {
         new_grid[k] = new Array(this.col);
         for (let q = 0; q< this.col; q++){
            new_grid[k][q]=0;
         }
     } 
	 //creates a new row and width according to privous game
	 for (let i = 0; i < this.row; i++) {
	 	for (let j = 0; j < this.col; j++) {

			 //counts live neighbors
			 let live_neighbors = this.get_neighbors(i, j);

			 // alive cell
			 if ( this.grid[i][j] == 1 ) {

				 // A live cell with less than two live neighbors dies
				 if ( live_neighbors < 2 ) {
					 new_grid[i][j] = 0;
					 }

				 // A live cell with two or three live neighbors lives
				 else if ( live_neighbors == 2 || live_neighbors == 3 ) {
				 	 new_grid[i][j] = 1;
				 }

				 // A live cell with more than three neighbors dies
				 else if ( live_neighbors > 3 ) {
				 	 new_grid[i][j] = 0;
				 }
			 }
			 //A dead cell
			 else if ( this.grid[i][j] == 0 ) {

				 //A dead cell with three live neighbors becomes live
				 if ( live_neighbors == 3 ) {
				    new_grid[i][j] = 1;
				 }
			 }
	 	}
	 }
	
	
	this.grid = new_grid;
	}
	
	/* get_neighbors is a helper method that returns
	 * the number of live neighbors a cell has.
	 */
	get_neighbors(i,j ){
		
	let count = 0;
    let x = this.row;
    let y = this.col;
    
    
    //cell up-left
	if(i >0 && j > 0 &&(this.grid[i-1][j-1] == 1)) {
 
			count++; 
		
	}
	//cell up
	if(i > 0 && j >= 0 && j <= y &&(this.grid[i-1][j] == 1) ) {

			count++; 
	}

	//cell up-right
	if(i > 0 && j >= 0 &&(j+1) < y &&(this.grid[i-1][j+1] == 1)){ 
		
			 count++; 
	}

	//cell left
	if(i >= 0 && j >0 && j < y &&(this.grid[i][j-1] == 1)) { 

			count++; 
	}

	//cell right
	if(i >= 0 && j >= 0 && (j+1) < y &&(this.grid[i][j+1] == 1)) { 
			
			count++; 
	}

	//cell down-left
	if(i >= 0 && j >0 && (i+1) < x &&(this.grid[i+1][j-1] == 1)) { 
			count++; 
	}

	//cell down
	if(i >= 0 && j >= 0 && (i+1) < x && (this.grid[i+1][j] == 1)){ 

			count++; 
	}

	//cell down-right
	if(i >= 0 && j >= 0 && (i+1) < x && (j+1) < y &&(this.grid[i+1][j+1] == 1)) {

			count++; 
	}
	return count;
}
    }