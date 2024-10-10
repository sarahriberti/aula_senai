from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log, recuperar_cadastro, processar_dados_tarefa
from atualizar import atualizar_cad, atualizar_tarefa
from conexao import conectar
import select_task
from Gravar_BD import gravar_dados_cad_bd

# Inicializa o Flask
app = Flask(__name__)
# Permite solicitações de qualquer origem
CORS(app)

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
    date = request.args.get('date')
    print('id back--',user_id)
    
    if not user_id or not date:
        return jsonify({'error': 'Parâmetros userId e date são obrigatórios'}), 400

    try:
        tasks = select_task.listar_tarefas(user_id, date)
        return jsonify(tasks)
    except Exception as e:
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
                dados['senha']
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


# Executa a aplicação
if __name__ == '__main__':
    app.run(port=8085, host='10.135.60.18', debug=True, threaded=True)