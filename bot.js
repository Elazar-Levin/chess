var board = null
var game = new Chess()
var KW=[[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-3.0,-4.0,-4.0,-5.0,-5.0,-4.0,-4.0,-3.0],[-2.0,-3.0,-3.0,-4.0,-4.0,-3.0,-3.0,-2.0],[-1.0,-2.0,-2.0,-2.0,-2.0,-2.0,-2.0,-1.0],[2.0,2.0,0.0,0.0,0.0,0.0,2.0,2.0],[2.0,3.0,1.0,0.0,0.0,1.0,3.0,2.0]]
var QW=[[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0],[-1.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0],[-1.0,0.0,0.5,0.5,0.5,0.5,0.0,-1.0],[-0.5,0.0,0.5,0.5,0.5,0.5,0.0,-0.5],[0.0,0.0,0.5,0.5,0.5,0.5,0.0,-0.5],[-1.0,0.5,0.5,0.5,0.5,0.5,0.0,-1.0],[-1.0,0.0,0.5,0.0,0.0,0.0,0.0,-1.0],[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0]];
var PW=[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],[5.0,5.0,5.0,5.0,5.0,5.0,5.0],[1.0,1.0,2.0,3.0,3.0,2.0,1.0,1.0],[0.5,0.5,1.0,2.5,2.5,1.0,0.5,0.5],[0.0,0.0,0.0,2.0,2.0,0.0,0.0,0.0],[0.5,-0.5,-1.0,0.0,0.0,-1.0,-0.5,0.5],[0.5,1.0,1.0,-2.0,-2.0,1.0,1.0,0.5],[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]];
var RW=[[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],[0.5,1.0,1.0,1.0,1.0,1.0,1.0,0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[-0.5,0.0,0.0,0.0,0.0,0.0,0.0,-0.5],[0.0,0.0,0.0,0.5,0.5,0.0,0.0,0.0]];
var NW=[[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0],[-4.0,-2.0,0.0,0.0,0.0,0.0,-2.0,-4.0],[-3.0,0.0,1.0,1.5,1.5,1.0,0.0,-3.0],[-3.0,0.5,1.5,2.0,2.0,1.5,0.5,-3.0],[-3.0,0.0,1.5,2.0,2.0,1.5,0.0,-3.0],[-3.0,0.5,1.0,1.5,1.5,1.0,0.5,-3.0],[-4.0,-2.0,0.0,0.5,0.5,0.0,-2.0,-4.0],[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0]];
var BW=[[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0],[-1.0,0.0,0.0,0.0,0.0,0.0,0.0,-1.0],[-1.0,0.0,0.5,1.0,1.0,0.5,0.0,-1.0],[-1.0,0.5,0.5,1.0,1.0,0.5,0.5,-1.0],[-1.0,0.0,1.0,1.0,1.0,1.0,0.0,-1.0],[-1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0],[-1.0,0.5,0.0,0.0,0.0,0.0,0.5,-1.0],[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0]];
var KW2=[[-5.0,-4.0,-3.0,-2.0,-2.0,-3.0,-4.0,-5.0],[-3.0,-2.0,-1.0,0.0,0.0,-1.0,-2.0,-3.0],[-3.0,-1.0,2.0,3.0,3.0,2.0,-1.0,-3.0],[-3.0,-1.0,3.0,4.0,4.0,3.0,-1.0,-3.0],[-3.0,-1.0, 3.0, 4.0, 4.0, 3.0,-1.0,-3.0],[-30,-10, 20, 30, 30, 20,-10,-30],[-3.0,-3.0,0.0,0.0,0.0,0.0,-3.0,-3.0],[-5.0,-3.0,-3.0,-3.0,-3.0,-3.0,-3.0,-5.0]]
var pb=flipH(PW);
var nb=flipH(NW);
var bb=flipH(BW);
var rb=flipH(RW);
var qb=flipH(QW);
var kb=flipH(KW);
var kb2=flipH(KW2);
var endgame=false;
var level=3
function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) 
  {
	$("#state").text("Game Over");
	return false
  
  }
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
function doRandomMove()
{
	console.log(game.ascii());
	console.log(Quiesce(game.fen(),-10000,10000));
	possibleMoves=game.moves();
	game.move(possibleMoves[Math.floor(Math.random() * possibleMoves.length)]);
	board.position(game.fen())
	
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
function calculateScore(fen,pieces=true,pos=true)
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
					if(pieces)	Score+=10;
					if(pos)Score+=pb[i][j];
					break;
				case "n":
					if(pieces) Score+=30;
					if(pos)Score+=nb[i][j];
					break;
				case "b":
					if(pieces)Score+=30;
					if(pos)Score+=bb[i][j];
					break;
				case "r":
					if(pieces)Score+=50;
					if(pos)Score+=rb[i][j];
					break;
				case "q":
					if(pieces)Score+=90;
					if(pos)Score+=qb[i][j];
					break;
				case "k":
					if(pieces)Score+=900;
					if(pos)Score+=kb[i][j];
					break;
				case "P":
					if(pieces)Score-=10;
					if(pos)Score+=PW[i][j]
					break;
				case "N":
					if(pieces)Score-=30;
					if(pos)Score+=NW[i][j];
					break;
				case "B":
					if(pieces)Score-=30;
					if(pos)Score+=BW[i][j];
					break;
				case "R":
					if(pieces)Score-=50;
					if(pos)Score+=RW[i][j];
					break;
				case "Q":
					if(pieces)Score-=90;
					if(pos)Score+=QW[i][j];
					break;
				case "K":
					if(pieces)Score-=900;
					if(pos)Score+=KW[i][j];
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
		if(calculateScore(myBoard.fen(),true,false)>topScore)
		{
			topScore=calculateScore(myBoard.fen());
			bestMoves=[];
			bestMoves.push(possibleMoves[i]);
		}
		else if(calculateScore(myBoard.fen(),true,false)==topScore)
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
	minimaxRoot(2,game,true,-10000,10000,false,true);
}
function doMinimax1()
{
	minimaxRoot(2,game,true,-10000,10000,true,false);
}
function doMinimax2()
{
	minimaxRoot(2,game,true,-10000,10000);
}
function doMinimax3()
{
	minimaxRoot(3,game,true,-10000,10000);
}
function doMinimax4()
{
	minimaxRoot(4,game,true,-10000,10000);
}
function Quiesce(fen,alpha,beta ) {
    var stand_pat = calculateScore(fen);
    if( stand_pat >= beta )
        return beta;
    if( alpha < stand_pat )
        alpha = stand_pat;
	var myBoard=Chess(fen);
	var possibleMoves=myBoard.moves();
	for(var i=0;i<possibleMoves.length;i++)
	{
		if(possibleMoves[i].includes("x"))
		{
			myBoard.move(possibleMoves[i]);
			var score=-Quiesce(myBoard.fen(),-beta,-alpha);
			myBoard.undo();
			if( score >= beta )
				return beta;
			if( score > alpha )
				alpha = score;
		}
	        
    }
    return alpha;
}





function minimaxRoot(depth,game,isMax,alpha,beta,pieces=true,pos=true)
{
	var possibleMoves = game.moves();
	var bestMove=-10000;
	var bestMoves=[];
	for(var i=0;i<possibleMoves.length;i++)
	{
		game.move(possibleMoves[i]);
		var value=minimax(depth-1,game,!isMax,alpha,beta,pieces,pos);
		
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
function Restart()
{
	game=Chess();
	var config = {
		draggable: true,
		position: 'start',
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd
	}
	board = Chessboard('board1', config);
	
}
function minimax(depth,game,isMax,alpha,beta,pieces=true,pos=true)
{
	if(depth==0)
	{
		return calculateScore(game.fen(),pieces,pos);
	}
	
	if(isMax)
	{
		var currMax=-9999;
		var possibleMoves = game.moves();
		for(var i=0;i<possibleMoves.length;i++)
		{
			game.move(possibleMoves[i]);
			currMax=Math.max(currMax,minimax(depth-1,game,!isMax,alpha,beta,pieces,pos));
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
		var currMin=9999;
		var possibleMoves = game.moves();
		for(var i=0;i<possibleMoves.length;i++)
		{
			game.move(possibleMoves[i]);
			currMin=Math.min(currMin,minimax(depth-1,game,!isMax,alpha,beta,pieces,pos));
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
	
	level=parseInt($('#level').find(':selected').text());
  // make random legal move for black

	if(game.game_over())
	{
		$("#state").text("Game Over");
	}
	if(game.in_check())
	{
		$("#state").text("check");
	}
	else
	{
		$("#state").text("");
	}

  switch(level)
  {
	case 1:
		window.setTimeout(doRandomMove, 250);
		break;
	case 2:
		window.setTimeout(doMinimax,250);
		break;
	case 3:
		window.setTimeout(doMinimax1,500);
		break;
	case 4:
		window.setTimeout(bestMoveGreedy,250);
		break;
	case 5:
		window.setTimeout(doMinimax2,500);
		break;
	case 6:
		window.setTimeout(doMinimax3,500);
		break;
	case 7:
		window.setTimeout(doMinimax4,500);
		break;
	
  }
  if(game.game_over())
	{
		$("#state").text("Game Over");
	}
	if(game.in_check())
	{
		$("#state").text("check");
	}
	else
	{
		$("#state").text("");
	}
  console.log(game.ascii());
  console.log(Quiesce(game.fen(),-10000,10000));

}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}
function Undo()
{
	game.undo();
	game.undo();
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
