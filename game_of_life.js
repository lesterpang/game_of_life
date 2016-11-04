var GameOfLife = GameOfLife || function(){
	this.target = null;
	this.target_id = null;
	this.width = 0;
	this.height = 0;
	this.div_matrix = [];
	this.data_matrix = [];
	this.interval = null;
	this.left = -Math.floor(this.width/2);
	this.right = Math.floor(this.width/2);
	this.top = -Math.floor(this.height/2);
	this.bottom = Math.floor(this.height/2);

	this.color_0 = "rgb(255, 255, 255)";
	this.color_1 = "rgb(0, 0, 0)";
};

GameOfLife.prototype.init = function(target_id, width, height){
	this.target_id = target_id;
	this.width = width;
	this.height = height;

	this.target = document.getElementById(this.target_id);
    t = document.createElement('table');
    t.style.backgroundColor="antiquewhite";
    
    for(i=0; i<this.width; i++){
        var tr = t.insertRow(-1);
        this.div_matrix[i] = [];
        for(j=0; j<this.height; j++){
          this.div_matrix[i][j] = tr.insertCell(-1);
          this.div_matrix[i][j].style.background = this.color_0;
          this.div_matrix[i][j].id="id-"+i+"-"+j;
        }
    }

    for(i=-this.width/2; i<this.width/2; i++){
    	if(!this.data_matrix[i]){
    		this.data_matrix[i] = [];
    	}
    	for(j=-this.height/2; j<this.height/2; j++){
    		this.data_matrix[i][j] = 0;
    	}
    }
    this.target.appendChild(t);
}

GameOfLife.prototype.rand = function(x, y, width, height, rand){
	for(i=x; i<x+width; i++){
		for(j=y; j<y+height; j++){
			if(!this.data_matrix[i]){
				this.data_matrix[i] = [];
			}
			if(Math.floor(Math.random()*100)<rand){
				this.data_matrix[i][j] = 1;
			}
		}
	}
}

GameOfLife.prototype.draw = function(){
	for(i=0; i<this.width; i++){
		for(j=0; j<this.height; j++){
			if(!this.data_matrix[i-this.width/2]
				|| !this.data_matrix[i-this.width/2][j-this.height/2] 
				|| this.data_matrix[i-this.width/2][j-this.height/2] == 0){
				this.div_matrix[i][j].style.background = this.color_0;
			}else if(this.data_matrix[i-this.width/2][j-this.height/2] == 1){
				this.div_matrix[i][j].style.background = this.color_1;
			}
		}
	}
}

GameOfLife.prototype.start = function(tick_time){
	this.interval = setInterval(this.loop, tick_time);
}

GameOfLife.prototype.evolution = function(){
	for(i=this.left-1; i<this.right+1; i++){
		if(!this.data_matrix[i]){
			this.data_matrix[i] = [];
		}
		for(j=this.top-1; j<this.bottom+1; j++){
			count = 0;
			if(this.data_matrix[i-1] && this.data_matrix[i-1][j-1] && this.data_matrix[i-1][j-1] == 1){
				count++;
			}
			if(this.data_matrix[i] && this.data_matrix[i][j-1] && this.data_matrix[i][j-1] == 1){
				count++;
			}
			if(this.data_matrix[i+1] && this.data_matrix[i+1][j-1] && this.data_matrix[i+1][j-1] == 1){
				count++;
			}

			if(this.data_matrix[i-1] && this.data_matrix[i-1][j] && this.data_matrix[i-1][j] == 1){
				count++;
			}
			if(this.data_matrix[i+1] && this.data_matrix[i-1][j] && this.data_matrix[i+1][j] == 1){
				count++;
			}

			if(this.data_matrix[i-1] && this.data_matrix[i-1][j+1] && this.data_matrix[i-1][j+1] == 1){
				count++;
			}
			if(this.data_matrix[i] && this.data_matrix[i][j+1] && this.data_matrix[i][j+1] == 1){
				count++;
			}
			if(this.data_matrix[i+1] && this.data_matrix[i+1][j+1] && this.data_matrix[i+1][j+1] == 1){
				count++;
			}
			if(count == 2 || count == 4){
				this.data_matrix[i][j] = 1;
			}else{
				this.data_matrix[i][j] = 0;
			}
		}
	}
}

GameOfLife.prototype.loop = function(){
	game_of_life.evolution();
	game_of_life.draw();
}

var game_of_life = new GameOfLife();