#Função que que grava os dados de formulários no banco de dados
#Autor: Emily
#Data: 05/03/2024

import conexao
from datetime import datetime

# Função para verificar se o e-mail já existe
def verificar_email_existe(email):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT COUNT(*) FROM usuario WHERE Email = %s"
    cursor.execute(sql, (email,))
    resultado = cursor.fetchone()
    conex.close()
    return resultado[0] > 0  # Retorna True se o e-mail já existir

# Função para gravar dados do usuário
def gravar_dados_cad_bd(nome, data_nasc, celular, email, senha):
    if verificar_email_existe(email):
        return {'erro': True, 'mensagem': 'E-mail já cadastrado'}

    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO usuario (Nome, Data_Nasc, Celular, Email, Senha) VALUES (%s, %s, %s, %s, %s)"
    val = (nome, data_nasc, celular, email, senha)  
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {'erro': False, 'mensagem': 'Usuário cadastrado com sucesso!'}

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
def gravar_tarefas(cor, titulo, inicio, termino, notific, descr, categoria, repetir, ID_Usu):
    conex = conexao.conectar()
    cursor = conex.cursor()
    print('Antes salvar banco:', inicio)
    sql = "INSERT INTO tarefas (Cor, Titulo, Inicio, Termino, Notific, Descr, Categoria, Repetir, ID_Usu) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    print('DEPOIS DO INSERT---------------', sql)
    val = (cor, titulo, inicio, termino, notific, descr, categoria, repetir, ID_Usu)
    print('VAL-----------', val)
    cursor.execute(sql, val)
    conex.commit()
    print("Tarefa gravada com sucesso!")
    conex.close()