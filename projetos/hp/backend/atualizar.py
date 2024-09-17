from flask import jsonify
import datetime
import conexao  # Importe sua conexão com o banco de dados

# >>> INÍCIO DAS ATUALIZAÇÕES DE DADOS DO USUÁRIO <<<
def atualizar_cad(data):
    try:
        id_usuario = data['ID_Usu']
        senha_atual = data['senhaveia']
        nova_senha = data.get('senha')
        nome = data['nome']
        data_nascimento = data['data_nascimento']
        celular = data['celular']
        email = data['email']

        # Conectar ao banco de dados
        conex = conexao.conectar()
        cursor = conex.cursor()

        # Verificar se a senha atual está correta
        cursor.execute("SELECT Senha FROM usuario WHERE ID = %s", (id_usuario,))
        senha_armazenada = cursor.fetchone()

        if not senha_armazenada or senha_armazenada[0] != senha_atual:
            conex.close()
            return {"sucesso": False, "mensagem": "Senha atual incorreta."}

        # Atualizar os dados do usuário
        if nova_senha:
            cursor.execute(
                "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s, Senha = %s WHERE ID = %s",
                (nome, data_nascimento, celular, email, nova_senha, id_usuario)
            )
        else:
            cursor.execute(
                "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s WHERE ID = %s",
                (nome, data_nascimento, celular, email, id_usuario)
            )

        conex.commit()
        conex.close()

        return {"sucesso": True, "mensagem": "Dados atualizados com sucesso!"}

    except Exception as e:
        print("Erro:", e)  # Log de erro
        return {"sucesso": False, "mensagem": "Ocorreu um erro durante a atualização dos dados."}

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