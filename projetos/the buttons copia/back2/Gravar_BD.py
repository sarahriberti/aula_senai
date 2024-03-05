import conexao

# >>> Função para gravar dados do cadastro do usuário no banco de dados <<<
def gravar_dados_bd(nome, data_nasc, celular, email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario (Nome, Data_Nasc, Celular, Email, Senha) VALUES (%s, %s, %s, %s, %s)"
    val = (nome, data_nasc, celular, email, senha)  
    cursor.execute(sql, val)
    conex.commit()
    print("Usuário cadastrado com sucesso!")
    conex.close()