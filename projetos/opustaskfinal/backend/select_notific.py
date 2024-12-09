import conexao
import logging

# Configuração do logger
logger = logging.getLogger(__name__)


def listar_notificacoes(user_id):
    """
    Lista as notificações de um usuário específico.
    """
    print("bancooo", user_id)
    if not user_id:
        return {"erro": True, "mensagem": "ID do usuário não fornecido."}

    try:
        with conexao.conectar() as conex:
            with conex.cursor() as cursor:
                # Consulta para listar as notificações
                cursor.execute("""
                    SELECT ID, Mensagem, Data_Hora
                    FROM notificacao
                    WHERE ID_Usu = %s
                    ORDER BY Data_Hora DESC
                """, (user_id,))

                resultados = cursor.fetchall()

                # Verifica se há resultados
                if not resultados:
                    return {"erro": False, "mensagem": "Nenhuma notificação encontrada."}

                # Processa os resultados
                notificacoes = [
                    {
                        "id": row[0],
                        "mensagem": row[1],
                        "data_hora": row[2].strftime("%Y-%m-%d %H:%M:%S"),
                    }
                    for row in resultados
                ]

                return {"erro": False, "notificacoes": notificacoes}

    except Exception as e:
        # Logando o erro para depuração
        logger.error(f"Erro ao listar notificações: {str(e)}", exc_info=True)
        return {"erro": True, "mensagem": "Ocorreu um erro ao tentar listar as notificações."}
