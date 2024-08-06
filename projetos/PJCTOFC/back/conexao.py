#Função para integrar o back-end com o banco de dados
#Autor: Emily
#Data: 05/03/2024 

import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="opustask"
    )