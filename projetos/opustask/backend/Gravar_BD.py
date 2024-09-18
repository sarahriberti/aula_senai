#Função que que grava os dados de formulários no banco de dados
#Autor: Emily
#Data: 05/03/2024

import conexao
from datetime import datetime

# >>> Função para gravar dados do usuário <<<
def gravar_dados_cad_bd(nome, data_nasc, celular, email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario (Nome, Data_Nasc, Celular, Email, Senha) VALUES (%s, %s, %s, %s, %s)"
    val = (nome, data_nasc, celular, email, senha)  
    cursor.execute(sql, val)
    conex.commit()
    print("Usuário cadastrado com sucesso!")
    conex.close()

# Atualize a função de gravação para aceitar a data e a hora
# Atualize a função de gravação para aceitar a data e a hora
def gravar_valor_doacao(id_usu, numero_cartao, data_expiracao, cvv, nome_cartao, valor):
    conex = conexao.conectar()
    cursor = conex.cursor()
    
    # Verifique se o ID_USU existe antes de tentar inserir os dados
    cursor.execute("SELECT * FROM usuario WHERE ID = %s", (id_usu,))
    if cursor.fetchone() is None:
        conex.close()
        return {"valid": "false", "message": "ID do usuário não encontrado."}
    
    # Inserir dados na tabela de doações
    sql = "INSERT INTO doacoes (ID_USU, numero_cartao, data_expiracao, cvv, nome_cartao, valor) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (id_usu, numero_cartao, data_expiracao, cvv, nome_cartao, valor)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {"valid": "true", "message": "Doação registrada com sucesso!"}

# >>> Função para gravar as tarefas <<<
def gravar_tarefas(cor, titulo, data, hora_ini, hora_fin, notific, descr, repetir, ID_Usu):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO tarefas (Cor, Titulo, Data, Hora_Ini, Hora_Fin, Notific, Descr, Repetir, ID_Usu) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (cor, titulo, data, hora_ini, hora_fin, notific, descr, repetir, ID_Usu)
    cursor.execute(sql, val)
    conex.commit()
    print("Tarefa gravada com sucesso!")
    conex.close()