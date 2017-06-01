class Button extends React.Component {

    state = {
        currentPlayer: null
    }
    
    setPlayer = () => {
	        this.setState((prevState)=>{        		
            if(prevState.currentPlayer==null){
        				this.props.validateStatus(this.props.rowNumber, this.props.colNumber)
                return {currentPlayer: this.props.currentPlayer}
            }
        });
    }

    getClassName = (checkedPlayer) => {

          if (checkedPlayer === 1){
		    		return "btn col-1 btn-success";
          }
          
          if (checkedPlayer === 2){
            return "btn col-1 btn-danger";
          }
    		
    		return "btn col-1 btn-info";
    }

    render() {
        return (
            <button className={this.getClassName(this.state.currentPlayer) }
                    onClick={this.setPlayer}
            >-</button>)
    };
}

const Line = (props) => {
    return (
        <div className="row">
            {
                _.range(props.numberOfElements).map(i =>
                    <Button 
                      rowNumber={props.rowNumber}
                      colNumber={i} 
                      validateStatus={props.validateStatus} 
                      currentPlayer={props.currentPlayer}
                    />
                )
            }
        </div>
    );
};

const PlayerIndicator = (props) => {
    return (
        <div className="row">
            {
            	<h4>Turno del Jugador: {props.currentPlayer}</h4>
            }
        </div>
    );
};

const WinnerIndicator = (props) => {
    return (
        <div class="row alert alert-success">
            {
            	<h3>{props.winner} Win!!</h3>
            }
        </div>
    );
};

const Lines = (props) => {
    return (
        <div>
            {
                _.range(props.numberOfElements).map(i =>
                    <Line rowNumber={i}
                        currentPlayer={props.currentPlayer}
                        numberOfElements={props.numberOfElements}
                        validateStatus={props.validateStatus} />
                )
            }
        </div>
    );
};


class Game extends React.Component {

    static initialState = () => ({
        numberOfElements: 5,
        currentPlayer: 1,
        player1: [],
        player2: [],
        winner: null
    });

		state = Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    setPlayer = () => {
    		 this.setState((prevState)=>{  
            if(prevState.currentPlayer===1){
                return {currentPlayer: 2}
            }
            
    				if(prevState.currentPlayer===2){
                return {currentPlayer: 1}
            }
        });
    };
    
    markForPlayer = (rowNumber, colNumber) => {
				this.setState((prevState)=>{  
            if(prevState.currentPlayer===1){
            		return { player1: prevState.player1.concat({row:rowNumber, col:colNumber})};
            }
            
    				if(prevState.currentPlayer===2){
                return { player2: prevState.player2.concat({row:rowNumber, col:colNumber})};
            }
        }, ()=>{
         		this.checkIfHasTicTacToe(rowNumber, colNumber);
        });
    }

		checkIfHasTicTacToe = (rowNumber, colNumber) => {
      let colPlayer1Count=0, rowPlayer1Count=0, descPlayer1Count=0, ascPlayer1Count=0;
      let colPlayer2Count=0, rowPlayer2Count=0, descPlayer2Count=0, ascPlayer2Count=0;
      for(var i=0; i< this.state.numberOfElements; i++){
     
     		var ascendingLimit = (this.state.numberOfElements - 1);
     		var ascending = ascendingLimit - i;
        
     		// fixed rows, columns variable
        if(this.state.player1.find(x => x.row == rowNumber && x.col == i)!=null) { colPlayer1Count++; }
        if(this.state.player2.find(x => x.row == rowNumber && x.col == i)!=null) { colPlayer2Count++; }
        
        // descending values
        if(this.state.player1.find(x => x.row == i && x.col == i)!=null) { descPlayer1Count++; }
        if(this.state.player2.find(x => x.row == i && x.col == i)!=null) { descPlayer2Count++; }
         
        // fixed columns, variable rows
        if(this.state.player1.find(x => x.row == i && x.col == colNumber)!=null) { rowPlayer1Count++; }        
        if(this.state.player2.find(x => x.row == i && x.col == colNumber)!=null) { rowPlayer2Count++; }
        
        // ascending values
        if(this.state.player1.find(x => x.row == ascending && 
        																x.col == ascendingLimit - ascending)!=null) { ascPlayer1Count++; }
        
        if(this.state.player2.find(x => x.row == ascending && 
        																x.col == ascendingLimit - ascending) !=null) { ascPlayer2Count++; }
        
        ascending--;
      }
      
      if(colPlayer1Count==this.state.numberOfElements || rowPlayer1Count==this.state.numberOfElements ||
      		descPlayer1Count==this.state.numberOfElements || ascPlayer1Count==this.state.numberOfElements)
      {
      	this.setState((prevState)=>{ return {winner: "Player 1"} });
      }
      
      if(colPlayer2Count==this.state.numberOfElements || rowPlayer2Count==this.state.numberOfElements ||
      		descPlayer2Count==this.state.numberOfElements || ascPlayer2Count==this.state.numberOfElements)
      {
      	this.setState(() => { return {winner: "Player 2"} });
      }
    };    

    validateStatus = (rowNumber, colNumber) => {    
   			this.markForPlayer(rowNumber, colNumber);  
        this.setPlayer();    
    }

    render() {
        return (
            <div class="text-center">
                <h2>Tic Tac Toe</h2>
                <Lines
                    currentPlayer={this.state.currentPlayer}
                    numberOfElements={this.state.numberOfElements}
                    validateStatus={this.validateStatus}
                />
                { this.state.winner == null ?
                  <PlayerIndicator currentPlayer={this.state.currentPlayer}/> :
                  <WinnerIndicator winner={this.state.winner}/> }
                  
                  
                  <div className="btn btn-warning btn-sm" onClick={this.resetGame}>
                      <i className="fa fa-refresh"></i> 
                  </div>
            </div>
        );
    };
}

class App extends React.Component {
    render() {
        return (
            <Game />
        );
    };
}

ReactDOM.render(<App />, mountNode);