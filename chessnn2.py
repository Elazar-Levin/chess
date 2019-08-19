import chess
import chess.pgn
import numpy as np
from scipy.stats import truncnorm
import matplotlib.pyplot as plt
#from scipy.special import expit as sigmoid



@np.vectorize
def sigmoid(x):
	return (1.0 / (1 + np.e ** -(x/1.0)))
@np.vectorize
def relu(x):
	if x>0:
		return x
	else:
		return 0
	
def truncated_normal(mean=0, sd=1, low=0, upp=10):
    return truncnorm(
        (low - mean) / sd, (upp - mean) / sd, loc=mean, scale=sd)
activation_function=sigmoid
	
	
class NeuralNetwork:
	
	def __init__(self,no_in_nodes,no_out_nodes,no_hidden_nodes,learning_rate,bias=None):
		self.no_in_nodes=no_in_nodes
		self.no_out_nodes=no_out_nodes
		self.no_hidden_nodes=no_hidden_nodes
		self.learning_rate=learning_rate
		self.bias=bias
		self.create_weight_matrices()
		
	
	def create_weight_matrices(self):
		bias_node = 1 if self.bias else 0
		
		rad=1/np.sqrt(self.no_in_nodes + bias_node)
		X=truncated_normal(mean=0, sd=1, low=-rad, upp=rad)
		self.weights_in_hidden =X.rvs((self.no_hidden_nodes,self.no_in_nodes + bias_node))
		
		rad= 1/np.sqrt(self.no_hidden_nodes + bias_node)
		X = truncated_normal(mean=0, sd=1, low=-rad, upp=rad)
		self.weights_hidden_hidden=X.rvs((self.no_hidden_nodes,self.no_hidden_nodes + bias_node))
		
		rad= 1/np.sqrt(self.no_hidden_nodes + bias_node)
		X = truncated_normal(mean=0, sd=1, low=-rad, upp=rad)
		self.weights_hidden_out=X.rvs((self.no_out_nodes,self.no_hidden_nodes + bias_node))

	def train(self,input_vector, target_vector):
		bias_node = 1 if self.bias else 0
		if self.bias:
			input_vector = np.concatenate( (input_vector, [self.bias]) )
		
		
		input_vector = np.array(input_vector, ndmin=2).T
		target_vector = np.array(target_vector,ndmin=2).T
		
		output_vector1 = np.dot(self.weights_in_hidden, input_vector)
		output_vector_hidden1 = activation_function(output_vector1)
		
		if self.bias:
			output_vector_hidden1= np.concatenate((output_vector_hidden1,[[self.bias]]))
		
		output_vector2 = np.dot(self.weights_hidden_hidden,output_vector_hidden1)
		output_vector_hidden2 = activation_function(output_vector2)
		
		if self.bias:
			output_vector_hidden2= np.concatenate((output_vector_hidden2,[[self.bias]]))
		
		output_vector3 = np.dot(self.weights_hidden_out,output_vector_hidden2)
		output_vector_network = activation_function(output_vector3)
		
		output_errors = target_vector-output_vector_network 
		
		
		#update the weights
		tmp = output_errors * output_vector_network * (1.0 - output_vector_network)
		tmp = self.learning_rate * np.dot(tmp, output_vector_hidden2.T)
		self.weights_hidden_out +=tmp
		
		hidden_errors1 =np.dot(self.weights_hidden_out.T, output_errors)
		tmp = hidden_errors1 * output_vector_hidden2 * (1.0 - output_vector_hidden2)
		if self.bias:
			x = np.dot(tmp, output_vector_hidden1.T)#[:-1,:]
		else:
			x = np.dot(tmp, output_vector_hidden1.T)
		
		self.weights_hidden_hidden += self.learning_rate * x
		
		hidden_errors2 =np.dot(self.weights_hidden_hidden.T, hidden_errors1)
		
		tmp = hidden_errors2 * output_vector_hidden1 * (1.0 -output_vector_hidden1)
		if self.bias:
			x = np.dot(tmp, input_vector.T)[:-1,:]
		else:
			x = np.dot(tmp, input_vector.T)
		self.weights_in_hidden +=self.learning_rate * x
		
	def run(self,input_vector):
		if self.bias:
			input_vector = np.concatenate( (input_vector, [1]) )
		input_vector = np.array(input_vector,ndmin=2).T
		
		output_vector = np.dot(self.weights_in_hidden,input_vector)
		output_vector = activation_function(output_vector)
		
		if self.bias:
			output_vector = np.concatenate( (output_vector, [[1]]) )
		
		output_vector = np.dot(self.weights_hidden_hidden,output_vector)
		output_vector = activation_function(output_vector)
		
		#if self.bias:
		#	output_vector = np.concatenate( (output_vector, [[1]]) )
		
		output_vector = np.dot(self.weights_hidden_out, output_vector)
		output_vector = activation_function(output_vector)
		
		return output_vector

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
	if not "x" in san and not "O" in san: 
		r1,c1,r2,c2=8-int(san[1]),ord(san[0])-ord("a"),8-int(san[3]),ord(san[2])-ord("a")
		return [r1,c1,r2,c2]
	elif "x" in san:
		pass
	elif "O in san":
		pass
	
def arrToMove(arr):
	move=""
	move+=chr(arr[1]+ord("a"))+str(8-arr[0])+chr(arr[3]+ord("a"))+str(8-arr[2])
	return move
		
	
if __name__ == "__main__":
	
	pgn=open("moves.pgn")
	x_train=[]
	y_train=[]

	while chess.pgn.read_game(pgn):
		first_game=chess.pgn.read_game(pgn)
		board=first_game.board()
		inputs=getInput(board.fen(),board)
		for move in first_game.mainline_moves():
			board.push(move)
			inputs=getInput(board.fen(),board)
			outputs=moveToArr(move)
			x_train.append(inputs)
			y_train.append(outputs)

	#x_train=np.array(x_train)
	#y_train=np.array(y_train)
	basic_network=NeuralNetwork(no_in_nodes=68,no_out_nodes=4,no_hidden_nodes=136,learning_rate=0.05, bias=1)
	print("training now")
	for i in range(len(x_train)):
		#print(i)
		#if i%10000==0:
			#print(i)
		basic_network.train([x*(1/12) for x in x_train[i]],[y*(1/7) for y in y_train[i]])
	
	
	print(basic_network.run(x_train[0]))
	hold=[]
	hold.append(int(basic_network.run(x_train[0])[0]*10.0))
	hold.append(int(basic_network.run(x_train[0])[1]*10.0))
	hold.append(int(basic_network.run(x_train[0])[2]*10.0))
	hold.append(int(basic_network.run(x_train[0])[3]*10.0))
	#hold=[int(x*10) for x in zip(*basic_network.run(x_train[0]))[0]]
	print(arrToMove(hold))

	










