def sigmaoid(Z):
	return 1/(1+np.exp(-Z))
	
def relu(Z):
	return np.maximum(0,Z)
	
def sigmaoid_backward(dA, Z):
	sig = sigmaoid(Z)
	return dA * sig * (1 - sig)
	
def relu_backward(dA, Z):
	dZ = np.array(dA, copy = True)
	dZ[Z <=0] = 0
	return dZ

def init_layers(nn_architecture, seed = 99):
	np.random.seed(seed)
	number_of_layers = len(nn_architecture)
	params_values = {}
	
	for idx, layer in enumerate(nn_architecture):
		layer_idx = idx + 1
		layer_input_size = layer["input_dim"]
		layer_output_size = layer["output_dim"]
		
		
		params_values['W' + str(layer_idx)] = np.random.randn(layer_output_size, layer_input_size) * 0.1
		
		params_values['b' + str(layer_idx)] = np.random.randn(layer_output_size, 1) * 0.1
		
	return params_values

def full_forward_propagation(X, params_values, nn_architecture):
	memory = {}
	A_curr = X
	
	for idx, layer in enumerate(nn_architecture):
		layer_idx = idx + 1
		A_prev = A_curr
		
		activation_function_curr = layer["activation"]
		W_curr = params_values["W" + str(layer_idx)]
		b_curr = params_values["b" + str(layer_idx)]
		A_curr, Z_curr = single_layer_forward_propagation(A_prev, W_curr, activation_function_curr)
		
		memory["A" + str(idx)] = A_prev
		memory["Z" + str(layer_idx)] = Z_curr
		
	return A_curr, memory
		
