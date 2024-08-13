from flask import Flask, request, jsonify
import datetime
import conexao  # Importe sua conexão com o banco de dados

# >>> INÍCIO DAS ATUALIZAÇÕES DAS TAREFAS <<<
app = Flask(__name__)
# Função para atualizar a descrição de uma tarefa
def atualizar_descr_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    novo_descr = str(input("Digite a descrição que deseja: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Descr = %s WHERE ID = %s"
    val = (novo_descr,id)
    cursor.execute(sql, val)
    conex.commit()
    print("Descrição da tarefa atualizado com sucesso!")
    conex.close()

# Função para atualizar a cor de uma tarefa
def atualizar_cor_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    nova_cor = int(input("Digite a cor que deseja: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Cor = %s WHERE ID = %s"
    val = (nova_cor,id)
    cursor.execute(sql, val)
    conex.commit()
    print("Cor da tarefa atualizado com sucesso!")
    conex.close()

# Função para atualizar o título de uma tarefa
def atualizar_titulo_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    novo_titulo = str(input("Digite o titulo que deseja: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Título = %s WHERE ID = %s"
    val = (novo_titulo,id)
    cursor.execute(sql, val)
    conex.commit()
    print("Título da tarefa atualizado com sucesso!")
    conex.close()

# Função para atualizar a Data de uma tarefa
def atualizar_data_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    data_str = input("Digite a data que deseja (formato YYYY-MM-DD): ")
    try:
        nova_data = datetime.datetime.strptime(data_str, "%Y-%m-%d").date()
    except ValueError:
        print("Formato de data inválido. Use o formato YYYY-MM-DD.")
        return
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Data = %s WHERE ID = %s"
    val = (nova_data, id)
    cursor.execute(sql, val)
    conex.commit()
    print("Data da tarefa atualizada com sucesso!")
    conex.close()

# Função para atualizar a Hora Inicial de uma tarefa
def atualizar_hora_ini_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    hora_str = input("Digite que horas começa seu compromisso (formato HH:MM:SS): ")
    try:
        nova_hora_ini = datetime.datetime.strptime(hora_str, "%H:%M:%S").time()
    except ValueError:
        print("Formato de hora inválido. Use o formato HH:MM:SS.")
        return
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Hora_Ini = %s WHERE ID = %s"
    val = (nova_hora_ini, id)
    cursor.execute(sql, val)
    conex.commit()
    print("Hora Inicial da tarefa atualizada com sucesso!")
    conex.close()

# Função para atualizar a Hora Final de uma tarefa
def atualizar_hora_fin_tarefa():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    hora_str = input("Digite que horas começa seu compromisso (formato HH:MM:SS): ")
    try:
        nova_hora_fin = datetime.datetime.strptime(hora_str, "%H:%M:%S").time()
    except ValueError:
        print("Formato de hora inválido. Use o formato HH:MM:SS.")
        return
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Hora_Fin = %s WHERE ID = %s"
    val = (nova_hora_fin, id)
    cursor.execute(sql, val)
    conex.commit()
    print("Hora Final da tarefa atualizada com sucesso!")
    conex.close()


# Função para atualizar a notificação de uma tarefa
def validar_entrada_notificacao(nova_notificacao):
    return nova_notificacao.upper() in ('S', 'N')

def transformar_notificacao_em_int(nova_notificacao):
    if nova_notificacao.upper() == 'N':
        return 0
    elif nova_notificacao.upper() == 'S':
        return 1
    else:
        return None
    
def atualizar_notific():
    id_tarefa = int(input("Digite o ID da tarefa que deseja atualizar: "))
    nova_notificacao = input("Digite se você deseja ser notificado (S/N): ")
    if not validar_entrada_notificacao(nova_notificacao):
        print("Opção inválida. Use 'S' para sim ou 'N' para não.")
        return
    try:
        with conexao.conectar() as conex:
            cursor = conex.cursor()
            sql = "UPDATE tarefas SET Notific = %s WHERE ID = %s"
            valor_notificacao = transformar_notificacao_em_int(nova_notificacao)
            val = (valor_notificacao, id_tarefa)
            cursor.execute(sql, val)
            conex.commit()
            print("Notificação da tarefa atualizada com sucesso!")
    except Exception as e:
        print("Ocorreu um erro ao atualizar a notificação da tarefa:", e)


# Função para atualizar a repetição de uma tarefa
def atualizar_repetir():
    id = int(input("Digite o ID da tarefa que deseja atualizar: "))
    nova_repet = int(input("Digite quantas vezes deseja repetir a tarefa: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE tarefas SET Repetir = %s WHERE ID = %s"
    val = (nova_repet,id)
    cursor.execute(sql, val)
    conex.commit()
    print("Repetição da tarefa atualizado com sucesso!")
    conex.close()
    
# >>> FINAL DAS ATUALIZAÇÕES DAS TAREFAS <<<

# >>> INÍCIO DAS ATUALIZAÇÕES DE DADOS DO USUÁRIO <<<

def atualizar_cad(data):
    id_usuario = data['id']
    novo_nome = data['nome']
    data_str = data['data_nascimento']
    novo_celular = data['celular']
    novo_email = data['email']
    nova_senha = data['senha']
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Nome = %s, Data_Nasc = %s, Celular = %s, Email = %s, Senha = %s WHERE ID = %s"
    val = (novo_nome ,data_str ,novo_celular ,novo_email ,nova_senha,  id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()
    return jsonify({"message": "Nome do usuario atualizado com sucesso!"})