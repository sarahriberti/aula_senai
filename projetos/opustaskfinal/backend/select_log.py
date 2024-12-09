import conexao

def confere_dados_com_banco(email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID, Nome, Data_Nasc, Celular, Email, Senha FROM usuario WHERE Email = %s AND Senha = %s"
    val = (email, senha)
    cursor.execute(sql, val)
    usuarios = cursor.fetchone()
    conex.close()

    if usuarios is not None:
        ID, Nome, Data_Nasc, Celular, Email, Senha = usuarios
        if email == Email and senha == Senha:
            return usuarios  # Dados de login corretos
        else:
            return False  # Dados de login incorretos
    else:
        return False  # Usuário não encontrado