#Função para comparar as informações de cadastro no banco, verificando se o usuário esta cadastrado e para deixar salvo os dados no localstorage
#Autor: Emily
#Data: aproximadamente no mês de fevereiro
import conexao

def confere_dados_com_banco(email, senha):
    conex = conexao.conectar()  # Estabelece conexão com o banco de dados
    cursor = conex.cursor()  # Cria um cursor para executar comandos SQL
    sql = "SELECT ID, Nome, Data_Nasc, Celular, Email, Senha FROM usuario WHERE Email = %s AND Senha = %s "  # Comando SQL para buscar usuário pelo email e senha
    val = (email, senha)  # Valores que serão inseridos na consulta SQL
    cursor.execute(sql, val)  # Executa a consulta SQL com os valores fornecidos
    usuarios = cursor.fetchone()  # Busca o primeiro resultado da consulta
    conex.close()  # Fecha a conexão com o banco de dados

    if usuarios is not None:  # Verifica se algum usuário foi encontrado
        id_bd, nome_bd, data_nasc, celular_bd, email_bd, senha_bd = usuarios
        if email == email_bd and senha == senha_bd:  # Verifica O email e a senha 
            return usuarios  # Retorna os dados do usuário, login correto
        else:
            return False  # Login incorreto
    else:
        return False  # Usuário não encontrado
