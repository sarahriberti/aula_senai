#Seleciona as informacoes do cadastro para enviar ao banco
#Autor: Emily
#Data: aproximadamente fevereiro
import conexao

def consultar_usuario_por_id(usuario_id):
    
    conex = conexao.conectar()# conexão com o banco 
    cursor = conex.cursor()# Cria um cursor para interagir com o banco
    cursor.execute("SELECT ID, Nome, Data_Nasc, Celular, Email, Senha FROM usuario WHERE id = %s", (usuario_id,))# Executa a consulta SQL para obter os dados do usuário pelo Id
    usuario = cursor.fetchone()# Recupera a primeira linha do resultado da consulta
    conex.close()# Fecha a conexão
    return usuario# Retorna os dados do usuário