import math
class Chess:
	def __init__(self,fen):
		self.fen=fen
	"""
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	"""
	def toBoard(self,fen):
		myBoard=fen.split(" ")[0].split("/")
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
	def toFen(self,board):
		s=""
		for i in range(8):
			count=0
			for j in range(8):
				if board[i][j]==" ":
					count+=1
					
				else:
					if count>0:
						s+=str(count)
							
						count=0
					s=s+board[i][j];
		return s
	
	def fen(self):
		return toFen(self.board)
	def flattenBoard(self,fen):# todo: parse the rest of the fen string
		ans=[]
		myBoard=self.toBoard(fen)
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
	def parseFen(self,fen,flat):
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
		
		return flat
chess= Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
print(chess.parseFen(chess.fen,chess.flattenBoard(chess.fen)))