import conexao

# Função para excluir uma tarefa
def excluir_tarefa():
    try:
        id_tarefa = int(input("Digite o ID da tarefa que deseja deletar: "))
        conex = conexao.conectar()
        cursor = conex.cursor()
        sql = "DELETE FROM tarefas WHERE ID = %s"
        val = (id_tarefa,)
        cursor.execute(sql, val)
        conex.commit()
        print("Tarefa excluída com sucesso!")
    except Exception as e:
        print(f"Ocorreu um erro ao excluir a tarefa: {e}")
    finally:
        conex.close()

# >>> Função para excluir uma notificação <<<
import logging

# Configuração básica do logger
logger = logging.getLogger(__name__)

def excluir_notificacao(notificacao_id):
    """
    Exclui uma notificação pelo ID fornecido.
    """
    conex = None
    cursor = None
    try:
        # Validação do ID
        if not notificacao_id or not isinstance(notificacao_id, int):
            return {"erro": True, "mensagem": "ID da notificação inválido."}

        # Conexão com o banco de dados
        conex = conexao.conectar()
        cursor = conex.cursor()

        # Executa o comando de exclusão
        cursor.execute("DELETE FROM notificacao WHERE ID = %s", (notificacao_id,))
        conex.commit()

        # Verifica se a exclusão foi bem-sucedida
        if cursor.rowcount > 0:
            return {"erro": False, "mensagem": "Notificação excluída com sucesso!"}
        else:
            return {"erro": True, "mensagem": "Nenhuma notificação encontrada para o ID fornecido."}

    except Exception as e:
        logger.error(f"Erro ao excluir notificação: {str(e)}")
        return {"erro": True, "mensagem": "Ocorreu um erro ao tentar excluir a notificação."}

    finally:
        # Garante que os recursos sejam fechados
        if cursor:
            cursor.close()
        if conex:
            conex.close()