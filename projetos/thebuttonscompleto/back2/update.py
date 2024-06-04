#atualiza o cadastro do usuario
#Autor: Arthur
#Data: aproximadamente fevereiro
import conexao
import datetime

# >>> INÍCIO DAS ATUALIZAÇÕES DAS TAREFAS <<<

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

# Função para atualizar o nome de um usuario
def atualizar_nome_usuario():
    id_usuario = int(input("Digite o ID do usuário que deseja trocar: "))
    novo_nome = str(input("Digite o novo nome que deseja colocar: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET NOME = %s WHERE ID = %s"
    val = ( novo_nome,id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    print("Nome do usuario atualizado com sucesso!")
    conex.close()


# Função para atualizar a data de nascimento de um usuario
def atualizar_data_nasc_tarefa():
    id = int(input("Digite o ID do usuario que deseja atualizar: "))
    data_str = input("Digite a data que deseja (formato YYYY-MM-DD): ")
    try:
        nova_data_nasc = datetime.datetime.strptime(data_str, "%Y-%m-%d").date()
    except ValueError:
        print("Formato de data inválido. Use o formato YYYY-MM-DD.")
        return
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Data_Nasc = %s WHERE ID = %s"
    val = (nova_data_nasc, id)
    cursor.execute(sql, val)
    conex.commit()
    print("Data de nascimento do usuario atualizada com sucesso!")
    conex.close()

# Função para atualizar o celular de um usuario

def atualizar_celular_usuario():
    id_usuario = int(input("Digite o ID do usuário que deseja trocar: "))
    novo_celular = input("Digite o seu novo número de celular: ")
    if not novo_celular.isdigit():
        print("Número de celular inválido. Certifique-se de inserir apenas números.")
        return
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Celular = %s WHERE ID = %s"
    val = (novo_celular, id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    print("Novo número de celular do usuário atualizado com sucesso!")
    conex.close()


# Função para atualizar o e-mail de um usuário
    
def atualizar_email_usuario():
    id_usuario = int(input("Digite o ID do usuário que deseja trocar: "))
    novo_email = str(input("Digite o seu novo email: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Email = %s WHERE ID =%s"
    val = (novo_email, id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    print("E-mail do usuário atualizado com sucesso!")
    conex.close()

# Função para atualizar a senha de um usuário
    
def atualizar_senha_usuario():
    id_usuario = int(input("Digite o ID do usuário que deseja trocar: "))
    novo_senha = str(input("Digite o sua nova senha: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE usuario SET Senha = %s WHERE ID =%s"
    val = (novo_senha, id_usuario)
    cursor.execute(sql, val)
    conex.commit()
    print("Senha do usuário atualizado com sucesso!")
    conex.close()

# >>> FINAL DAS ATUALIZAÇÕES DE DADOS DO USUÁRIO <<<
    

# Função Principal para exibir o menu 
    
def menu():
    print("Selecione uma opção:")
    print("1. Trocar o nome da tarefa ")
    print("2. Trocar a cor da tarefa")
    print("3. Trocar o título da tarefa")
    print("4. Trocar a data da tarefa")
    print("5. Trocar a hora inicial da tarefa")
    print("6. Trocar o hora final da tarefa")
    print("7. Trocar a notificação da tarefa")
    print("8. Trocar repetir dados")
    print("9. Trocar o nome do usuário")
    print("10. Trocar a data de nascimento do usuário")
    print("11. Trocar o celular do usuário")
    print("12. Trocar o email do usuário")
    print("13. Trocar a senha do usuário")
    opcao = input("Digite o número da opção desejada:")

    if opcao == "1":
        atualizar_descr_tarefa()
    elif opcao == "2":
        atualizar_cor_tarefa()
    elif opcao == "3":
        atualizar_titulo_tarefa()
    elif opcao == "4":
        atualizar_data_tarefa()
    elif opcao == "5":
        atualizar_hora_ini_tarefa()
    elif opcao == "6":
        atualizar_hora_fin_tarefa()
    elif opcao == "7":
        atualizar_notific()
    elif opcao == "8":
        atualizar_repetir()
    elif opcao == "9":
        atualizar_nome_usuario()
    elif opcao == "10":
        atualizar_data_nasc_tarefa()
    elif opcao == "11":
        atualizar_celular_usuario()
    elif opcao == "12":
        atualizar_email_usuario()
    elif opcao == "13":
        atualizar_senha_usuario()
    else:
        print("Opção inválida. Por favor, escolha uma opção válida.")

# Exemplo de uso
if __name__ == "__main__":
    menu()