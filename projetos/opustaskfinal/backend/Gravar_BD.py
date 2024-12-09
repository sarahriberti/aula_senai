# Função que que grava os dados de formulários no banco de dados
# Autor: Emily
# Data: 05/03/2024

import conexao
from datetime import datetime, timedelta
import mysql.connector

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

# Função para gravar tarefas do usuário
def gravar_tarefas(cor, titulo, inicio, termino, notific, descr, categoria, repetir, ID_Usu, ID_PAI):
    """
    Função para gravar uma nova tarefa no banco de dados.
    """
    sql = """
    INSERT INTO tarefas (Cor, Titulo, Inicio, Termino, Notific, Descr, Categoria, Repetir, ID_Usu, ID_PAI)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    val = (cor, titulo, inicio, termino, notific, descr, categoria, repetir, ID_Usu, ID_PAI)

    try:
        with conexao.conectar() as conex:
            with conex.cursor() as cursor:
                cursor.execute(sql, val)
                conex.commit()
                id_tarefa = cursor.lastrowid  # Recupera o ID da tarefa recém-inserida

        return {"erro": False, "id_tarefa": id_tarefa}

    except Exception as e:
        logger.error(f"Erro ao gravar tarefa no banco de dados: {e}", exc_info=True)
        return {"erro": True, "mensagem": "Erro ao gravar tarefa no banco de dados."}

# >>> Função para gravar a sugestão <<<
def gravar_sugestao(Texto, ID_Usu):
    try:
        # Estabelece a conexão com o banco de dados
        conex = conexao.conectar()

        # Verifica se a conexão foi bem-sucedida
        if conex:
            print("Conexão estabelecida com sucesso!")
        else:
            print("Falha ao estabelecer conexão com o banco de dados.")
            return  # Sai da função se a conexão falhar

        # Cria o cursor e prepara a consulta SQL
        cursor = conex.cursor()
        sql = "INSERT INTO sugestao (Texto, ID_Usu) VALUES (%s, %s)"
        val = (Texto, ID_Usu)

        # Executa a consulta
        cursor.execute(sql, val)

        # Confirma a transação
        conex.commit()
        print("Sugestão gravada com sucesso!")

    except mysql.connector.Error as err:
        # Exibe o erro, caso ocorra
        print(f"Erro ao gravar sugestão no banco de dados: {err}")
        print(f"Consulta: {sql}")
        print(f"Valores: {val}")

    finally:
        # Fecha a conexão
        if conex:
            conex.close()
            print("Conexão fechada.")

# >>> Função para gravar notificação <<<
import logging

logger = logging.getLogger(__name__)

def gravar_notificacao(id_usu, id_taf, titulo_tarefa, inicio_tarefa, repetir):
    """
    Grava as notificações de uma tarefa.
    """
    sql = """
    INSERT INTO notificacao (ID_Usu, ID_Taf, Mensagem, Data_Hora)
    VALUES (%s, %s, %s, %s)
    """
    try:
        # Converter o horário de início da tarefa para datetime
        inicio = datetime.strptime(inicio_tarefa, '%Y-%m-%d %H:%M')

        # Definir horários de notificações (1 hora antes e 15 minutos antes)
        horarios = [
            inicio - timedelta(hours=1),  # Notificação de 1 hora antes
            inicio - timedelta(minutes=15)  # Notificação de 15 minutos antes
        ]
        mensagens = [
            f'{titulo_tarefa} em uma hora',
            f'{titulo_tarefa} em 15 minutos'
        ]

        valores = [
            (id_usu, id_taf, mensagens[0], horarios[0].strftime("%Y-%m-%d %H:%M:%S")),
            (id_usu, id_taf, mensagens[1], horarios[1].strftime("%Y-%m-%d %H:%M:%S"))
        ]

        # Debugging: Verificando os valores antes de inserir no banco
        logger.debug(f"Valores a serem inseridos nas notificações: {valores}")

        with conexao.conectar() as conex:
            with conex.cursor() as cursor:
                cursor.executemany(sql, valores)
                conex.commit()

        logger.info(f"Notificações gravadas com sucesso para a tarefa ID {id_taf}.")

        return {"erro": False, "mensagem": "Notificações gravadas com sucesso!"}

    except Exception as e:
        logger.error(f"Erro ao gravar notificações: {e}", exc_info=True)
        return {"erro": True, "mensagem": f"Erro ao gravar notificações no banco de dados: {e}"}