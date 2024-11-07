# select_task.py
from datetime import datetime, timedelta
from conexao import conectar

# >>> Função para listar as tarefas, incluindo intervalos de dias <<<
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

        tarefas_expandidas = []
        for tarefa in tarefas:
            # Verifica se as datas são válidas antes de converter
            if tarefa['Inicio'] and tarefa['Termino'] and tarefa['Inicio'] != '0000-00-00 00:00':
                inicio = datetime.strptime(tarefa['Inicio'], '%Y-%m-%d %H:%M')
                termino = datetime.strptime(tarefa['Termino'], '%Y-%m-%d %H:%M')
                
                # Verifica se a tarefa se estende por mais de um dia
                if inicio.date() < termino.date():
                    # Loop por cada dia em que a tarefa se estende
                    while inicio.date() <= termino.date():
                        nova_tarefa = tarefa.copy()
                        nova_tarefa['Inicio'] = inicio.strftime('%Y-%m-%d %H:%M')
                        nova_tarefa['Termino'] = termino.strftime('%Y-%m-%d %H:%M')
                        tarefas_expandidas.append(nova_tarefa)
                        
                        # Passa para o próximo dia
                        inicio += timedelta(days=1)
                else:
                    # Se a tarefa não se estende, adiciona diretamente
                    tarefas_expandidas.append(tarefa)
            else:
                # Adiciona tarefas sem datas válidas, ou com data inválida
                tarefas_expandidas.append(tarefa)

        return tarefas_expandidas
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