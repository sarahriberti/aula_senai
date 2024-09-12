from flask import jsonify
import datetime
import conexao  # Importe sua conexão com o banco de dados

def atualizar_cad(data):
    id_usuario = data.get('id')
    novo_nome = data.get('nome')
    data_str = data.get('data_nascimento')
    novo_celular = data.get('celular')
    novo_email = data.get('email')
    nova_senha = data.get('senha')
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s, Senha = %s WHERE ID = %s"
    val = (novo_nome, data_str, novo_celular, novo_email, nova_senha, id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return {"message": "Nome do usuário atualizado com sucesso!"}

def atualizar_tarefa(data):
    print('dados upd', data)
    # Extrair dados da requisição
    id_tarefa = data.get('taskID')
    novo_descr = data.get('Descr')
    nova_cor = data.get('Cor')
    novo_titulo = data.get('Titulo')
    nova_data = data.get('Data')  # Assumindo que a data já está no formato correto "YYYY-MM-DD"
    nova_hora_ini = data.get('Hora_Ini')  # Assumindo que a hora já está no formato correto "HH:MM"
    nova_hora_fin = data.get('Hora_Fin')  # Assumindo que a hora já está no formato correto "HH:MM"
    nova_notific = data.get('Notific')  # Assumindo que isso é diretamente utilizável no banco de dados
    nova_repet = data.get('Repetir')

    # Conectar ao banco de dados e atualizar a tarefa
    try:
        conex = conexao.conectar()
        cursor = conex.cursor()
        
        sql = """
        UPDATE tarefas 
        SET Descr = %s, Cor = %s, Titulo = %s, Data = %s, Hora_Ini = %s, Hora_Fin = %s, Notific = %s, Repetir = %s 
        WHERE ID = %s
        """
        val = (novo_descr, nova_cor, novo_titulo, nova_data, nova_hora_ini, nova_hora_fin, nova_notific, nova_repet, id_tarefa)
        
        cursor.execute(sql, val)
        conex.commit()
        
        return {"message": "Tarefa atualizada com sucesso!"}
    
    except Exception as e:
        return {"error": f"Ocorreu um erro ao atualizar a tarefa: {e}"}, 500
    
    finally:
        if conex:
            conex.close()