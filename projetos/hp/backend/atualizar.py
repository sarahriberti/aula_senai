from flask import jsonify
import datetime
import conexao  # Importe sua conexão com o banco de dados

# >>> INÍCIO DAS ATUALIZAÇÕES DE DADOS DO USUÁRIO <<<
def atualizar_cad(data):
    print('atualizar bancooooo----------',data)
    try:
        id_usuario = data['id']
        senha_atual = data['senhaveia']
        nova_senha = data.get('senha')
        nome = data['nome']
        data_nascimento = data['data_nascimento']
        celular = data['celular']
        email = data['email']
        imagem_perfil = data.get('imagemPerfil')

        # Conectar ao banco de dados
        conex = conexao.conectar()
        cursor = conex.cursor()
        print('banco', id_usuario)

        # Verificar se a senha atual está correta
        cursor.execute("SELECT Senha FROM usuario WHERE ID = %s", (id_usuario,))
        senha_armazenada = cursor.fetchone()

        if not senha_armazenada or senha_armazenada[0] != senha_atual:
            conex.close()
            return {"sucesso": False, "mensagem": "Senha atual incorreta."}

        # Atualizar os dados do usuário
        if nova_senha:
            cursor.execute(
                "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s, Senha = %s, Imagem_perfil = %s WHERE ID = %s",
                (nome, data_nascimento, celular, email, nova_senha, imagem_perfil, id_usuario)
            )
        else:
            cursor.execute(
                "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s, Imagem_perfil = %s WHERE ID = %s",
                (nome, data_nascimento, celular, email, imagem_perfil, id_usuario)
            )

        conex.commit()
        conex.close()

        return {"sucesso": True, "mensagem": "Dados atualizados com sucesso!"}

    except Exception as e:
        print("Erro:", e)  # Log de erro
        return {"sucesso": False, "mensagem": "Ocorreu um erro durante a atualização dos dados."}

# Função para atualizar tarefa
def atualizar_tarefa(data):
    print('dados upd', data)
    # Extrair dados da requisição
    id_tarefa = data.get('taskID')
    novo_descr = data.get('Descr')
    nova_cor = data.get('Cor')
    novo_titulo = data.get('Titulo')
    novo_inicio = data.get('Inicio') 
    novo_termino = data.get('Termino')  
    nova_notific = data.get('Notific')  # Assumindo que isso é diretamente utilizável no banco de dados
    nova_categoria = data.get('Categori')
    nova_repet = data.get('Repetir')

    # Conectar ao banco de dados e atualizar a tarefa
    try:
        conex = conexao.conectar()
        cursor = conex.cursor()
        
        sql = """
        UPDATE tarefas 
        SET Descr = %s, Cor = %s, Titulo = %s, Inicio = %s, Termino = %s, Notific = %s, Categoria = %s, Repetir = %s 
        WHERE ID = %s
        """
        val = (novo_descr, nova_cor, novo_titulo, novo_inicio, novo_termino, nova_notific, nova_categoria, nova_repet, id_tarefa)
        
        cursor.execute(sql, val)
        conex.commit()
        
        return {"message": "Tarefa atualizada com sucesso!"}
    
    except Exception as e:
        return {"error": f"Ocorreu um erro ao atualizar a tarefa: {e}"}, 500
    
    finally:
        if conex:
            conex.close()
def atualizar_tarefas_pai(data):
    try:
        task_id = data.get('taskID')
        if not task_id:
            return {"error": "ID da tarefa não foi fornecido."}, 400

        conex = conexao.conectar()
        cursor = conex.cursor()

        # Buscar o ID_PAI da tarefa
        cursor.execute("SELECT ID_PAI FROM tarefas WHERE ID = %s", (task_id,))
        result = cursor.fetchone()
        if not result:
            return {"error": "Tarefa não encontrada."}, 404

        id_pai = result[0]  # ID_PAI obtido do banco de dados

        # Dados para atualização
        nova_cor = data.get('Cor')
        novo_titulo = data.get('Titulo')
        novo_inicio = data.get('Inicio')
        novo_termino = data.get('Termino')
        nova_notific = data.get('Notific')
        nova_categoria = data.get('Categoria')
        nova_repetir = data.get('Repetir')

        if not all([nova_cor, novo_titulo, novo_inicio, novo_termino, nova_categoria]):
            return {"error": "Dados insuficientes para atualizar tarefas."}, 400

        # Atualizar todas as tarefas relacionadas ao ID_PAI
        sql = """
        UPDATE tarefas
        SET Cor = %s, Titulo = %s, Inicio = %s, Termino = %s, Notific = %s, Categoria = %s, Repetir = %s
        WHERE ID_PAI = %s
        """
        val = (
            nova_cor,
            novo_titulo,
            novo_inicio,
            novo_termino,
            nova_notific,
            nova_categoria,
            nova_repetir,
            id_pai,
        )

        cursor.execute(sql, val)
        conex.commit()

        return {"message": "Tarefas relacionadas atualizadas com sucesso!"}

    except Exception as e:
        return {"error": f"Ocorreu um erro ao atualizar as tarefas: {e}"}, 500

    finally:
        if conex:
            conex.close()

def gravar_status_concluida(id_tarefa, concluida):
    conex = conexao.conectar()
    cursor = conex.cursor()

    try:
        # Atualiza o status de conclusão da tarefa
        sql = "UPDATE tarefas SET Concluida = %s WHERE ID = %s"
        val = (concluida, id_tarefa)
        
        cursor.execute(sql, val)
        conex.commit()

        print("Status de tarefa atualizado com sucesso!")
        
        return {'erro': False, 'mensagem': 'Status de tarefa atualizado com sucesso!'}

    except Exception as e:
        return {'erro': True, 'mensagem': str(e)}

    finally:
        conex.close()          

def atualizar_status_tarefa_bd(id_tarefa, novo_status):
    conex = conexao.conectar()
    cursor = conex.cursor()
    print('gravação==',id_tarefa,novo_status)
    try:
        # Atualiza o status da tarefa no banco de dados
        sql = "UPDATE tarefas SET Concluida = %s WHERE ID = %s"
        cursor.execute(sql, (novo_status, id_tarefa))
        
        # Confirma a alteração no banco de dados
        conex.commit()
        
        # Verifica se alguma linha foi afetada
        if cursor.rowcount == 0:
            return {'erro': True, 'mensagem': 'Tarefa não encontrada ou não atualizada'}
        
        # Retorna o novo status da tarefa
        return {'erro': False, 'mensagem': 'Status da tarefa atualizado com sucesso!', 'concluida': novo_status}
    
    except Exception as e:
        conex.rollback()  # Faz o rollback em caso de erro
        return {'erro': True, 'mensagem': str(e)}
    
    finally:
        conex.close()