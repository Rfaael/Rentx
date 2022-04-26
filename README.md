# Cadastro de carros

**RF**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel cadastrar todas as categorias.

**RN**
Não deve ser possivel cadastrar um carro com uma placa ja existente.
O carro deve ser cadastrado com disponibilidade como padrão.
*O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Listagem de carros

**RF**
Deve ser possivel listar os carros disponiveis.
Deve ser possivel listar os carros pelo nome da categoria.
Deve ser possivel listar os carros pelo nome da marca.
Deve ser possivel listar os carros pelo nome do carro.
**RN**
O usuario não precisa estar logado no sistema


# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as especificações.
Dever ser possivel listar todos os carros.
**RN**
Não deve ser possivel cadastrar uma especificao para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RNF**
Ultilizar o Multer para upload dos arquivos.

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro. 
O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel 
**RNF**

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario. 
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 