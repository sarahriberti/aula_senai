import conexao

# Função para excluir uma tarefa
def excluir_tarefa():
    try:
        id_tarefa = int(input("Digite o ID da tarefa que deseja deletar: "))
        conex = conexao.conectar()
        cursor = conex.cursor()
        sql = "DELETE FROM tarefas WHERE ID = %s"
        val = (id_tarefa,)
        cursor.execute(sql, val)
        conex.commit()
        print("Tarefa excluída com sucesso!")
    except Exception as e:
        print(f"Ocorreu um erro ao excluir a tarefa: {e}")
    finally:
        conex.close()