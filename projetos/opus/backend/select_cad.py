import conexao

def consultar_usuario_por_id(usuario_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    cursor.execute("SELECT ID, Nome, Data_Nasc, Celular, Email, Senha FROM usuario WHERE id = %s", (usuario_id,))
    usuario = cursor.fetchone()
    conex.close()
    return usuario