import math
class Chess:
	def __init__(self,fen):
		self.fen=fen
		self.castle=fen.split(" ")[2]
		self.player=fen.split(" ")[1]
		
	"""
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	"""
	#def parseMove(self,move):
		
	def toBoard(self,fen):
		myBoard=fen.split(" ")[0].split("/")
		self.castle=fen.split(" ")[2]
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
			if count>0:
				s+=str(count)
			if i!=7:
				s+="/"
		s+=" "
		s+=self.player
		s+=" "
		s+=self.castle
			
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
	def canMove(type,piece,pos):
		if type=="N" or type=="n":
			
		elif type=="B" or type=="b":
			if pos[0]-piece[0] == pos[1]-piece[1]:
			
			else:
				return False
		elif type=="R" or type=="r":
			if pos[0]==piece[0] or pos[1]==piece[1]
			
			else:
				return False
		elif type=="Q" or type=="q":
			if pos[0]==piece[0] or pos[1]==piece[1] or pos[0]-piece[0] == pos[1]-piece[1]:
			
			else:
				return False
			
	def applyMove(self,move,player):
		myBoard=self.toBoard(self.fen)
		if len(move)==2:
			p=8-int(move[1])
			if player=="w":
				if myBoard[p+1][ord(move[0])-ord("a")]=="P":
					myBoard[p+1][ord(move[0])-ord("a")]=" "
					myBoard[p][ord(move[0])-ord("a")]="P"
				elif myBoard[p+2][ord(move[0])-ord("a")]=="P":
					myBoard[p+2][ord(move[0])-ord("a")]=" "
					myBoard[p][ord(move[0])-ord("a")]="P"
			elif player=="b":
				if myBoard[p-1][ord(move[0])-ord("a")]=="p":
					myBoard[p-1][ord(move[0])-ord("a")]=" "
					myBoard[p][ord(move[0])-ord("a")]="p"
				elif myBoard[p-2][ord(move[0])-ord("a")]=="p":
					myBoard[p-2][ord(move[0])-ord("a")]=" "
					myBoard[p][ord(move[0])-ord("a")]="p"
		elif len(move)==3:
			if move=="O-O":
				if player=="w":	
					myBoard[7][4]=" "
					myBoard[7][6]="K"
					myBoard[7][7]=" "
					myBoard[7][5]="R"												
				elif player=="b":
					myBoard[0][4]=" "
					myBoard[0][6]="k"
					myBoard[0][7]=" "
					myBoard[0][5]="r"	
			elif move=="O-O-O":
				if player=="w":	
					myBoard[7][4]=" "
					myBoard[7][2]="K"
					myBoard[7][0]=" "
					myBoard[7][3]="R"												
				elif player=="b":
					myBoard[0][4]=" "
					myBoard[0][2]="k"
					myBoard[0][0]=" "
					myBoard[0][3]="r"	
			else:
				pieces=[]
				for i in range(8):
					for j in  range(8):
						if myBoard[i][j]==move[0]:
							pieces.append((i,j))
							

				
	
	
	
	
		self.fen=self.toFen(myBoard)
	
	
chess= Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

#print(chess.parseFen(chess.fen,chess.flattenBoard(chess.fen)))
print(chess.toBoard(chess.fen))
#chess.fen="r4r1k/ppR1Q1pp/2b3q1/5p2/7N/1P2P3/P3BPPP/5RK1 b - - 6 20"
#print(chess.toFen(chess.toBoard(chess.fen)))
print((chess.fen))
chess.applyMove("Nc3","w")
print((chess.fen))

