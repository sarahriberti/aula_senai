from conexao import conectar

def listar_tarefas():
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'},

    cursor = connection.cursor(dictionary=True)
    sql = "SELECT id, Cor, Titulo, DATE_FORMAT(Data, '%Y-%m-%d') as Data, DATE_FORMAT(Hora_Ini, '%H:%i') as Hora_Ini, DATE_FORMAT(Hora_Fin, '%H:%i') as Hora_Fin, Notific, Descr, Repetir FROM tarefas"
    cursor.execute(sql)
    tarefas = cursor.fetchall()
    cursor.close()
    connection.close()
    return tarefas