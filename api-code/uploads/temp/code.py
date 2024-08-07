class Usuario:
	def __init__(self, nome, email):
		self.nome = nome
		self.email = email

	def hello(self):
		return f"Olá, me chamo {self.nome}"

usuario = Usuario("carlos", "carlos@gmail.com")
print(usuario.hello())