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

# >>> Função para gravar as tarefas <<<
def gravar_tarefas(cor, titulo, data, hora_ini, hora_fin, notific, descr, repetir):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "INSERT INTO tarefas (Cor, Título, Data, Hora_Ini, Hora_Fin, Notifc, Descr, Repetir) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (cor, titulo, data, hora_ini, hora_fin, notific, descr, repetir)
    cursor.execute(sql, val)
    conex.commit()
    print("Tarefa gravada com sucesso!")
    conex.close()

# >>> Função para gravar as doações <<<
def gravar_doacoes(numero_cartao, data_expiracao, cvv, nome_cartao, valor, data_doacao):
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Se a data da doação não for fornecida, use a data e hora atuais
    if data_doacao is None:
        data_doacao = datetime.now()


    sql = "INSERT INTO doacoes (numero_cartao, data_expiracao, cvv, nome_cartao, valor, data_doacao) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (numero_cartao, data_expiracao, cvv, nome_cartao, valor, data_doacao)
    cursor.execute(sql, val)
    conex.commit()
    print("Doação gravada com sucesso!")
    conex.close()