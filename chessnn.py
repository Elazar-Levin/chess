import chess
import chess.pgn
import tensorflow as tf
def toBoard(fen):
		myBoard=fen.split(" ")[0].split("/")
		moves=int(fen.split(" ")[len(fen.split(" "))-1])
		myBoard2=[]
		for i in range(len(myBoard)):
			hold=[]
			for j in range(len(myBoard[i])):
				try:
					int(myBoard[i][j])
					
					for k in range(int(myBoard[i][j])):
						hold.append(" ")
				except ValueError:
					hold.append(myBoard[i][j])
			myBoard2.append(hold)
		return myBoard2

def flattenBoard(fen):
		ans=[]
		myBoard=toBoard(fen)
		for i in range(8):
			for j in range(8):
				if myBoard[i][j]=="r":#black rook
					ans.append(4)
				if myBoard[i][j]=="b":#black bishop
					ans.append(3)
				if myBoard[i][j]=="n":#black knight
					ans.append(2)
				if myBoard[i][j]=="p":#black pawn
					ans.append(1)
				if myBoard[i][j]==" ":#empty
					ans.append(0)
				if myBoard[i][j]=="q":#black queen
					ans.append(5)
				if myBoard[i][j]=="k":#black king
					ans.append(6)
				if myBoard[i][j]=="P":#white pawn
					ans.append(7)
				if myBoard[i][j]=="N":#white knight
					ans.append(8)
				if myBoard[i][j]=="B":#white bishop
					ans.append(9)
				if myBoard[i][j]=="R":#white rook
					ans.append(10)
				if myBoard[i][j]=="Q":#white queen
					ans.append(11)
				if myBoard[i][j]=="K":#white king
					ans.append(12)
		return ans
def parseFen(fen,flat,board):
		myBoard=fen.split(" ")
		if myBoard[1]=="w":
			flat.append(1)
		else:
			flat.append(2)
		if "K" in myBoard[2]:
			if "Q" in myBoard[2]:
				flat.append(3)
			else:
				flat.append(1)
		elif "Q" in myBoard[2]:
			flat.append(2)
		else:
			flat.append(0)
		if "k" in myBoard[2]:
			if "q" in myBoard[2]:
				flat.append(3)
			else:
				flat.append(1)
		elif "q" in myBoard[2]:
			flat.append(2)
		else:
			flat.append(0)
		"""
		uncomment to learn from en passant
		if myBoard[3]!="-":
			myArr=moveToArr(board,myBoard[3])
			for i in range(4):
				flat.append(myArr[i])
		else:
			for i in range(4):
				flat.append(0)
		"""
		flat.append(int(myBoard[5]))
		return flat

def getInput(fen,board):
		return parseFen(fen,flattenBoard(fen),board)
		
def moveToArr(move):
	san=str(move)
	r1,c1,r2,c2=8-int(san[1]),ord(san[0])-ord("a"),8-int(san[3]),ord(san[2])-ord("a")
	return [r1,c1,r2,c2]
	
def arrToMove(arr):
	move=""
	move+=chr(arr[1]+ord("a"))+str(8-arr[0])+chr(arr[3]+ord("a"))+str(8-arr[2])
	return move
		
	
"""	
board=chess.Board()
board.push(board.parse_san("e4"))
print(board)
print(board.fen())
print(moveToArr(board,"e5"))
print(getInput(board.fen(),board))
"""
pgn=open("moves.pgn")
while chess.pgn.read_game(pgn):
	first_game=chess.pgn.read_game(pgn)
	board=first_game.board()
	inputs=getInput(board.fen(),board)
	for move in first_game.mainline_moves():
		print(move)
		board.push(move)
		inputs=getInput(board.fen(),board)
		outputs=moveToArr(move)
		print(inputs)
		print(outputs)
		print(arrToMove(outputs))
		print()
















