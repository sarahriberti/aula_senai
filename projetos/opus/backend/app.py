#Importa o Flask para criar a aplicação
from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log, recuperar_cadastro, processar_dados_tarefa
from atualizar import atualizar_cad, atualizar_tarefa
from Gravar_BD import gravar_valor_doacao
from conexao import conectar
import select_task

#Aplica o Flask
app = Flask(__name__)
# Permite apenas solicitações do domínio 'http://localhost:5173'
CORS(app)#, resources={r"/receber_dados": {"origins": "http://10.135.60.16:8085"}})

# >>> ROTA PARA PUXAR AS TAREFAS <<<
@app.route('/tasks', methods=['GET'])
def get_tasks():
    user_id = request.args.get('userId')  # Recebe o userId da query string
    date = request.args.get('date')       # Recebe a data da query string
    
    if not user_id or not date:
        return jsonify({'error': 'Parâmetros userId e date são obrigatórios'}), 400

    tasks = select_task.listar_tarefas(user_id, date)
    
    return jsonify(tasks)

# >>> ROTA PARA ATUALIZAR CADASTRO <<<
@app.route('/atualizar_cad', methods=['POST'])
def atualizar_nome_usuario():
    data = request.get_json()
    if data.get('acao') == 'update_cad':
        ret = atualizar_cad(data)
    return jsonify(ret)

# >>> ROTA PARA ATUALIZAR TAREFA <<<
@app.route('/atualizar_tarefa', methods=['PUT'])
def atualizar_tarefa_route():
    dados = request.json
    print('dados recebidos para atualização:', dados)

    ret = atualizar_tarefa(dados)  # Chama a função que processa a atualização da tarefa
    print('Resultado da atualização:', ret)
    return jsonify(ret)

# >>> ROTA PARA RECEBER E INPUTAR DADOS <<<
@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    # Obtém os dados JSON da solicitação
    dados = request.json
    print('dados recebidos front', dados)

    # Inicializa uma variável de retorno
    ret = ''

    if dados.get('acao') == 'salvar_tarefa': 
        ret = processar_dados_tarefa(dados)
    
    # Verifica se todos os dados necessários para a doação estão presentes
    elif (dados.get('cardNumber') and dados.get('expirationDate') and dados.get('cvv') and dados.get('cardholderName') and dados.get('donationValue') and dados.get('id_usu')):
        # Captura os dados da doação
        id_usu = dados.get('id_usu')
        numero_cartao = dados.get('cardNumber')
        data_expiracao = dados.get('expirationDate')
        cvv = dados.get('cvv')
        nome_cartao = dados.get('cardholderName')
        valor = dados.get('donationValue')

        # Grava os dados da doação no banco de dados
        ret = gravar_valor_doacao(id_usu, numero_cartao, data_expiracao, cvv, nome_cartao, valor)
    
    # Verifica se a chave 'email_log' está presente nos dados
    elif dados.get('email_log') is None and dados.get('id_usuario') is None:
        # Se 'email_log' não estiver presente, chama a função para processar dados de cadastro
        ret = processar_dados_cad(dados)
    elif dados.get('email_log') is not None and dados.get('id_usuario') is None:
        # Se 'email_log' estiver presente, chama a função para processar dados de log
        ret = processar_dados_log(dados)
    elif dados.get('id_usuario') is not None:
        # Se 'id_usuario' estiver presente, chama a função para processar o id
        ret = recuperar_cadastro(dados)
    else:
        # Se nenhum dos casos anteriores for atendido, imprime um erro
        print('Erro', ret)

    # Imprime o resultado no terminal
    print('App: ', ret)

    # Retorna o resultado como uma resposta JSON
    return jsonify(ret)


#Executa a aplicação
if __name__ == '__main__':
    #Inicia o Flask
    app.run(port='8085', host='10.135.60.16', debug=True, threaded=True)