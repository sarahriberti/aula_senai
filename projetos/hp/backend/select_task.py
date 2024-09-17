# select_task.py
from conexao import conectar

def listar_tarefas(user_id, date):
    connection = conectar()
    print('chagada bancoo', user_id)
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    try:
        cursor = connection.cursor(dictionary=True)
        sql = '''SELECT ID, Cor, Titulo, DATE_FORMAT(Data, '%Y-%m-%d') as Data, 
                    DATE_FORMAT(Hora_Ini, '%H:%i') as Hora_Ini, 
                    DATE_FORMAT(Hora_Fin, '%H:%i') as Hora_Fin, 
                    Notific, Descr, Repetir, ID_Usu FROM tarefas WHERE ID_Usu = %s AND Data = %s'''
        cursor.execute(sql, (user_id, date))
        tarefas = cursor.fetchall()
        print('BANCOOOO', tarefas)
        return tarefas
    except Exception as e:
        return {'error': str(e)}
    finally:
        cursor.close()
        connection.close()

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