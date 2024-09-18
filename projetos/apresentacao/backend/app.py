from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log, recuperar_cadastro, processar_dados_tarefa
from atualizar import atualizar_cad, atualizar_tarefa
from Gravar_BD import gravar_valor_doacao
from conexao import conectar
import select_task

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
    if not dados:
        return jsonify({'error': 'Dados não fornecidos'}), 400

    try:
        if dados.get('action') == 'salvar_tarefa': 
            ret = processar_dados_tarefa(dados)
        
        elif all(k in dados for k in ('cardNumber', 'expirationDate', 'cvv', 'cardholderName', 'donationValue', 'id_usu')):
            ret = gravar_valor_doacao(
                dados['id_usu'],
                dados['cardNumber'],
                dados['expirationDate'],
                dados['cvv'],
                dados['cardholderName'],
                dados['donationValue']
            )
        
        elif dados.get('email_log') is None and dados.get('id_usuario') is None:
            ret = processar_dados_cad(dados)
        elif dados.get('email_log') is not None and dados.get('id_usuario') is None:
            ret = processar_dados_log(dados)
        elif dados.get('id_usuario') is not None:
            ret = recuperar_cadastro(dados)
        else:
            ret = {'error': 'Dados não reconhecidos'}

        return jsonify(ret)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Executa a aplicação
if __name__ == '__main__':
    app.run(port=8085, host='0.0.0.0', debug=True, threaded=True)