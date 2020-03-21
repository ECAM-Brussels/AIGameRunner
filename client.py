import json

clientFile = "clients.json"
clients = {}

def loadClients():
	_clearClients()
	global clients
	try:
		with open(clientFile, encoding='utf8') as file:
			data = json.load(file)
	except FileNotFoundError:
		data = []

	for client in data:
		_addClient(client)

def clientsList():
	data = []
	for matricules in clients:
		client = dict(clients[matricules])
		client['matricules'] = list(matricules)
		data.append(client)
	return data

def saveClients():
	data = clientsList()
	with open(clientFile, 'w', encoding='utf8') as file:
		json.dump(data, file, indent='\t')

def _clearClients():
	global clients
	clients = {}

def clearClients():
	_clearClients()
	saveClients()

def _addClient(data):
	clients[frozenset(data['matricules'])]=data
	del(data['matricules'])

def addClient(data):
	if 'matricules' not in data:
		raise ValueError('You must define the "matricules" key')
	if type(data['matricules']) != list:
		raise ValueError('"matricules" must be a list')
	if len(data['matricules']) < 1:
		raise ValueError('"matricules" list must contain at least one matricule')
	if len(data['matricules']) > 2:
		raise ValueError('"matricules" list must contain at most two matricule')
	if any(map(lambda x: type(x) != str, data['matricules'])):
		raise ValueError('"matricules" list must contain strings')
	if 'name' not in data:
		raise ValueError('You must define the "name" key')
	if type(data['name']) != str:
		raise ValueError('"name" must be a string')
	if any(map(lambda x: x[1]['name'] == data['name'], clients.items())):
		raise ValueError(f'Name "{data["name"]}" already used')
	if 'port' not in data:
		raise ValueError('You must define the "port" key')
	if type(data['port']) != int:
		raise ValueError('"port" must be a int')
	if 'ip' not in data:
		raise ValueError('You must define the "ip" key')
	if type(data['ip']) != str:
		raise ValueError('"ip" must be a str')
	
	_addClient(data)
	saveClients()

def removeClient(name):
	toDel = None
	for key, value in clients.items():
		if value['name'] == name:
			toDel = key
			break
	if toDel is not None:
		del(clients[toDel])
	saveClients()

if __name__ == '__main__':
	#addClient({'matricules': ['12345', '54321'], 'name': 'lur', 'port': 8080, 'ip': '1.2.3.4'})
	#addClient({'matricules': ['12346', '64321'], 'name': 'lrg', 'port': 8080, 'ip': '4.3.2.1'})
	#loadClients()
	#rint(clientsJSON())
	clearClients()
