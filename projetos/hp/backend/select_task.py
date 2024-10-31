# select_task.py
from conexao import conectar

# >>> Função para listar as tarefas <<<
def listar_tarefas(user_id):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    try:
        cursor = connection.cursor(dictionary=True)
        sql = '''SELECT ID, Cor, Titulo, DATE_FORMAT(Inicio, '%Y-%m-%d %H:%i') as Inicio, 
                        DATE_FORMAT(Termino, '%Y-%m-%d %H:%i') as Termino, Notific, Descr, Categoria, Repetir, ID_Usu 
                FROM tarefas 
                WHERE ID_Usu = %s'''
        cursor.execute(sql, (user_id,))
        tarefas = cursor.fetchall()
        return tarefas
    except Exception as e:
        return {'error': str(e)}
    finally:
        cursor.close()
        connection.close()

# >>> Função para excluir tarefa <<<
def excluir_tarefa(task_id):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    try:
        cursor = connection.cursor()
        sql = "DELETE FROM tarefas WHERE ID = %s"
        cursor.execute(sql, (task_id,))
        connection.commit()
        return {'message': 'Tarefa excluída com sucesso!'}
    except Exception as e:
        return {'error': str(e)}
    finally:
        cursor.close()
        connection.close()