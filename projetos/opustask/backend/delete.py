import conexao


# Função para excluir uma tarefa
def excluir_tarefa():
    id_tarefa = int(input("Digite o ID da tarefa que deseja deletar: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM tarefas WHERE ID = %s"
    val = (id_tarefa,)
    cursor.execute(sql,val)
    conex.commit()
    print("Tarefa excluída com sucesso!")
    conex.close()


# Função para deletar um usuário
def excluir_usuario():
    id_usuario = int(input("Digite o ID do usuário que deseja deletar: "))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM usuario WHERE ID = %s"
    val = (id_usuario,)
    cursor.execute(sql,val)
    conex.commit()
    print("Usuário excluído com sucesso!")
    conex.close()

# Função Principal para exibir o menu 
    
def menu():
    print("Selecione uma opção:")
    print("1. Deletar uma tarefa ")
    print("2. Deletar um usuário ")
    opcao = input("Digite o número da opção desejada:")


    if opcao == "1":
        excluir_tarefa()
    #Implemente a lógica de atualização aqui
    elif opcao == "2":
        excluir_usuario()
    else:
        print("Opção inválida. Por favor, escolha uma opção válida.")

# Exemplo de uso
if __name__ == "__main__":
    menu()