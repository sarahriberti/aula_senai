import conexao

def consultar_usuario_por_id(usuario_id):
    print('Consulta Usuario', usuario_id)
    conex = conexao.conectar()
    cursor = conex.cursor()
    cursor.execute("SELECT ID, Nome, Data_Nasc, Celular, Email, Imagem_perfil Senha FROM usuario WHERE id = %s", (usuario_id,))
    usuario = cursor.fetchone()
    conex.close()
    return usuario