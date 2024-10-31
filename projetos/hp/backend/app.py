from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log, recuperar_cadastro, processar_dados_tarefa, processa_check, processar_dados_sugestao
from select_cad import consultar_usuario_por_id
from atualizar import atualizar_cad, atualizar_tarefa
from conexao import conectar
import select_task
from Gravar_BD import gravar_dados_cad_bd

# Inicializa o Flask
app = Flask(__name__)
# Permite solicitações de qualquer origem
CORS(app)

# >>> ROTA PARA RECEBER SUGESTÕES <<< 
@app.route('/receber_sugestao', methods=['POST'])
def receber_sugestao():
    # Pega os dados do corpo da requisição
    dados = request.json
    print('Sugestão recebida ---', dados)

    # Verifica se os dados esperados estão presentes
    if not dados or 'Texto' not in dados or 'ID_Usu' not in dados:
        return jsonify({'error': 'Texto ou ID do usuário ausente.'}), 400

    texto_sugestao = dados['Texto']
    id_usuario = dados['ID_Usu']

    try:
        # Chama a função de processamento com os parâmetros
        ret = processar_dados_sugestao(id_usuario, texto_sugestao)
        return jsonify(ret)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# >>> ROTA PARA EXCLUIR UMA TAREFA <<<
@app.route('/delete_task', methods=['DELETE'])
def delete_task():
    task_id = request.args.get('taskId')
    if not task_id:
        return jsonify({'error': 'ID da tarefa é obrigatório'}), 400

    response = select_task.excluir_tarefa(task_id)
    if 'error' in response:
        return jsonify(response), 500
    return jsonify(response)

# >>> ROTA PARA EXCLUIR UM USUÁRIO <<<
@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'Parâmetro userId é obrigatório'}), 400

    try:
        # Chame a função para excluir o usuário no seu banco de dados
        select_task.excluir_usuario(int(user_id))  # Assumindo que você tem uma função para isso
        return jsonify({'message': 'Usuário excluído com sucesso!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# >>> ROTA PARA PUXAR AS TAREFAS <<<
@app.route('/tasks', methods=['GET'])
def get_tasks():
    user_id = request.args.get('userId')
    print('id back--',user_id)
    
    if not user_id:
        return jsonify({'error': 'ID de usuário não fornecido'}), 400

    try:
        tasks = select_task.listar_tarefas(user_id)
        if 'error' in tasks:
            return jsonify({'error': tasks['error']}), 500
        
        return jsonify(tasks), 200
    except Exception as e:
        print("Erro ao listar tarefas:", e)
        return jsonify({'error': str(e)}), 500
# >>> ROTA PARA ATUALIZAR CADASTRO <<<
@app.route('/atualizar_cad', methods=['POST'])
def atualizar_nome_usuario():
    data = request.get_json()
    if data.get('acao') == 'update_cad':
        ret = atualizar_cad(data)
        print('teste ret ',ret)
    return jsonify(ret)

# >>> ROTA PARA ATUALIZAR TAREFA <<<
@app.route('/atualizar_tarefa', methods=['PUT'])
def atualizar_tarefa_route():
    dados = request.json
    if not dados:
        return jsonify({'error': 'Dados não fornecidos'}), 400

    try:
        ret = atualizar_tarefa(dados)
        return jsonify(ret)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# >>> ROTA QUE TRATA O CHECK DA TAREFA <<<
@app.route('/check', methods=['POST'])
def tarefa_concluida():
    dados = request.json

    if not dados:
        return jsonify({'erro': True, 'mensagem': 'Dados não fornecidos'}), 400
    
    print('Dados recebidos 7--', dados)
    try:
        
        # Verifica se o ID da tarefa foi fornecido
        if dados['ID_Tarefa'] is None:
            return jsonify({'erro': True, 'mensagem': 'ID da tarefa não fornecido'}), 400
        
        # Verifica o estado atual da tarefa (se está concluída ou não)
        print('Dados recebidos 8--', dados['ID_Tarefa'])
        ret = processa_check(dados['novo_status'], dados['ID_Tarefa'])
        
        if ret['erro']:
            return jsonify(ret), 400
        else:
            return jsonify(ret), 200
    except Exception as e:
        return jsonify({'erro': True, 'mensagem': str(e)}), 500

# >>> ROTA PARA RECEBER E INPUTAR DADOS <<<
@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    dados = request.json
    print('Dados recebidos ---', dados)
    
    if not dados:
        return jsonify({'error': 'Dados não fornecidos'}), 400

    try:
        # Verifica se o e-mail e senha foram fornecidos (caso de cadastro)
        if dados.get('email') and dados.get('senha'):
            # Chama a função que grava os dados no BD com a verificação de e-mail duplicado
            ret = gravar_dados_cad_bd(
                dados['nome'],
                dados['dataNascimento'],
                dados['celular'],
                dados['email'],
                dados['senha'],
                dados['imagemPerfil']

            )
            # Retorna erro se o e-mail já existir
            if ret.get('erro'):
                return jsonify({'erro': True, 'mensagem': ret['mensagem']}), 400
            else:
                return jsonify({'erro': False, 'mensagem': 'Cadastro realizado com sucesso!'}), 200

        # Processa ação para salvar tarefa
        elif dados.get('action') == 'salvar_tarefa':
            ret = processar_dados_tarefa(dados)
            return jsonify(ret)

        # Processa login
        elif dados.get('email_log') is not None and dados.get('id_usuario') is None:
            ret = processar_dados_log(dados)

        # Recupera o cadastro
        elif dados.get('id_usuario') is not None:
            ret = recuperar_cadastro(dados)
            print("RETORNO DO CADASTRO ---------", ret)

        else:
            ret = {'error': 'Dados não reconhecidos'}

        return jsonify(ret)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# >>> ROTA PARA OBTER DADOS DO USUÁRIO <<< 
@app.route('/api/usuario/<int:usuario_id>', methods=['GET'])
def get_usuario_por_id(usuario_id):
    try:
        usuario = consultar_usuario_por_id(usuario_id)  # Chama a função para consultar o usuário

        if usuario:
            # Extrai os dados do usuário retornados da consulta
            data = {
                "id": usuario[0],
                "nome": usuario[1],
                "data_nascimento": usuario[2],
                "celular": usuario[3],
                "email": usuario[4],
                "imagem_perfil": usuario[5]  # Supondo que este campo contenha a URL da imagem
            }
            return jsonify(data), 200
        else:
            return jsonify({"mensagem": "Usuário não encontrado."}), 404

    except Exception as e:
        print("Erro:", e)  # Log de erro
        return jsonify({"mensagem": "Ocorreu um erro ao buscar os dados do usuário."}), 500

@app.route('/buscar_usuario', methods=['POST'])
def buscar_usuario_por_id():
    dados = request.get_json()
    print("buscar usuario", dados)

    # Verifica se o id_usuario foi enviado
    if not dados or 'id_usuario' not in dados:
        return jsonify({'error': 'Parâmetro id_usuario é obrigatório'}), 400

    usuario_id = dados['id_usuario']

    try:
        # Chama a função para consultar o usuário no banco de dados
        usuario = consultar_usuario_por_id(usuario_id)

        if usuario:
            # Extrai os dados do usuário retornados da consulta
            data = {
                "id": usuario[0],
                "nome": usuario[1],
                "data_nascimento": usuario[2],
                "celular": usuario[3],
                "email": usuario[4],
                "imagem_perfil": usuario[5]  # Supondo que este campo contenha a URL da imagem
            }
            return jsonify(data), 200
        else:
            return jsonify({"mensagem": "Usuário não encontrado."}), 404

    except Exception as e:
        print("Erro:", e)  # Log de erro
        return jsonify({"mensagem": "Ocorreu um erro ao buscar os dados do usuário."}), 500

# Executa a aplicação
if __name__ == '__main__':
    app.run(port=8085, host='10.135.60.33', debug=True, threaded=True)