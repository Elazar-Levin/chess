var board = null
var game = new Chess()
var KW=[[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-2.0,-3.0,-3.0,-4.0,-4.0,-3.0,-3.0,-2.0],[-1.0,-2.0,-2.0,-2.0,-2.0,-2.0,-2.0,-1.0],[2.0,2.0,0.0,0.0,0.0,0.0,2.0,2.0],[2.0,3.0,1.0,0.0,0.0,1.0,3.0,2.0]]
var QW=[[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0],[-1.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0],[-1.0,0.0,0.5,0.5,0.5,0.5,0.0,-1.0],[-0.5,0.0,0.5,0.5,0.5,0.5,0.0,-0.5],[0.0,0.0,0.5,0.5,0.5,0.5,0.0,-0.5],[-1.0,0.5,0.5,0.5,0.5,0.5,0.0,-1.0],[-1.0,0.0,0.5,0.0,0.0,0.0,0.0,-1.0],[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0]];
var PW=[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],[5.0,5.0,5.0,5.0,5.0,5.0,5.0],[1.0,1.0,2.0,3.0,3.0,2.0,1.0,1.0],[0.5,0.5,1.0,2.5,2.5,1.0,0.5,0.5],[0.0,0.0,0.0,2.0,2.0,0.0,0.0,0.0],[0.5,-0.5,-1.0,0.0,0.0,-1.0,-0.5,0.5],[0.5,1.0,1.0,-2.0,-2.0,1.0,1.0,0.5],[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]];
var RW=[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],[0.5,1.0,1.0,1.0,1.0,1.0,1.0,0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[0.0,0.0,0.0,0.5,0.5,0.0,0.0,0.0]];
var NW=[[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0],[-4.0,-2.0,0.0,0.0,0.0,0.0,-2.0,-4.0],[-3.0,0.0,1.0,1.5,1.5,1.0,0.0,-3.0],[-3.0,0.5,1.5,2.0,2.0,1.5,0.5,-3.0],[-3.0,0.0,1.5,2.0,2.0,1.5,0.0,-3.0],[-3.0,0.5,1.0,1.5,1.5,1.0,0.5,-3.0],[-4.0,-2.0,0.0,0.5,0.5,0.0,-2.0,-4.0],[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0]];
var BW=[[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0],[-1.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0],[-1.0,0.0,0.5,1.0,1.0,0.5,0.0,-1.0],[-1.0,0.5,0.5,1.0,1.0,0.5,0.5,-1.0],[-1.0,0.0,1.0,1.0,1.0,1.0,0.0,-1.0],[-1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0],[-1.0,0.5,0.0,0.0,0.0,0.0,0.5,-1.0],[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0]];
var pb=flipH(PW);
var nb=flipH(NW);
var bb=flipH(BW);
var rb=flipH(RW);
var qb=flipH(QW);
var kb=flipH(KW);
function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}
function flipH(matrix)
{
	var mat2=[];
	for(var i=7;i>=0;i--)
	{
		mat2.push(matrix[i]);
	}
	return mat2;
}

function makeBoard(fen)
{
	var myBoard=fen.split(" ")[0].split("/");
	var myBoard2=[];
	for(var i =0;i<myBoard.length;i++)
	{
		var hold=[];
		for(var j=0;j<myBoard[i].length;j++)
		{
			if(isNaN(myBoard[i][j]))
			{               
				hold.push(myBoard[i][j]);
				
				
			}
			else
			{
				for(var k=0;k<myBoard[i][j];k++)
				{
					hold.push(" ");
				}
			}
		}
		myBoard2.push(hold);
	}
	return myBoard2;
}
function calculateScore(fen)
{
	var Score=0;
	var myBoard=fen.split(" ")[0].split("/");
	var myBoard2=makeBoard(fen);
	for(var i =0;i<myBoard2.length;i++)
	{
		for(var j=0;j<myBoard2[i].length;j++)
		{
			
			switch(myBoard2[i][j])
			{
				
				case "p":
					Score+=10;
					Score+=pb[i][j];
					break;
				case "n":
					Score+=30;
					Score+=nb[i][j];
					break;
				case "b":
					Score+=30;
					Score+=bb[i][j];
					break;
				case "r":
					Score+=50;
					Score+=rb[i][j];
					break;
				case "q":
					Score+=90;
					Score+=qb[i][j];
					break;
				case "k":
					Score+=900;
					Score+=kb[i][j];
					break;
				case "P":
					Score-=10;
					Score+=PW[i][j]
					break;
				case "N":
					Score-=30;
					Score+=NW[i][j];
					break;
				case "B":
					Score-=30;
					Score+=BW[i][j];
					break;
				case "R":
					Score-=50;
					Score+=RW[i][j];
					break;
				case "Q":
					Score-=90;
					Score+=QW[i][j];
					break;
				case "K":
					Score-=900;
					Score+=KW[i][j];
					break;
				default:
					Score=Score;
			}
		}
	}
	return Score;
}

function bestMoveGreedy()
{

	var myBoard=new Chess(game.fen());
	
	var possibleMoves = game.moves();
	if (possibleMoves.length === 0) return
	topScore=-10000;
	bestMoves=[];
	for(var i=0;i<possibleMoves.length;i++)
	{
		myBoard.move(possibleMoves[i]);
		if(calculateScore(myBoard.fen())>topScore)
		{
			topScore=calculateScore(myBoard.fen());
			bestMoves=[];
			bestMoves.push(possibleMoves[i]);
		}
		else if(calculateScore(myBoard.fen())==topScore)
		{
			bestMoves.push(possibleMoves[i]);
		}
		myBoard.undo();
	}
	game.move(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
	board.position(game.fen())
}
function doMinimax()
{
	minimaxRoot(3,game,true,-10000,10000);
}
function minimaxRoot(depth,game,isMax,alpha,beta)
{
	var possibleMoves = game.moves();
	var bestMove=-10000;
	var bestMoves=[];
	for(var i=0;i<possibleMoves.length;i++)
	{
		game.move(possibleMoves[i]);
		var value=minimax(depth-1,game,!isMax,alpha,beta);
		
		game.undo();
		if(value>bestMove)
		{
			bestMove=value;
			bestMoves=[];
			bestMoves.push([value,possibleMoves[i]]);
			
		}
		else if(value==bestMove)
		{
			bestMove=value;
			bestMoves.push([value,possibleMoves[i]]);
		}
	}
	console.log(bestMoves[0]);
	
	game.move(bestMoves[Math.floor(Math.random() * bestMoves.length)][1]);
	board.position(game.fen())
}
function minimax(depth,game,isMax,alpha,beta)
{
	if(depth==0)
	{
		return calculateScore(game.fen());
	}
	
	if(isMax)
	{
		var currMax=-10000;
		var possibleMoves = game.moves();
		for(var i=0;i<possibleMoves.length;i++)
		{
			game.move(possibleMoves[i]);
			currMax=Math.max(currMax,minimax(depth-1,game,!isMax,alpha,beta));
			game.undo();
			alpha=Math.max(alpha,currMax);
			if(alpha>=beta)
			{
				break;
			}
		}
		return currMax;
	}
	else
	{
		var currMin=10000;
		var possibleMoves = game.moves();
		for(var i=0;i<possibleMoves.length;i++)
		{
			game.move(possibleMoves[i]);
			currMin=Math.min(currMin,minimax(depth-1,game,!isMax,alpha,beta));
			game.undo();
			beta=Math.min(beta,currMin);
			if(alpha>=beta)
			{
				break;
			}
		}
		return currMin;
	}
	
	
	
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  // make random legal move for black
  window.setTimeout(doMinimax, 250);
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('board1', config);
