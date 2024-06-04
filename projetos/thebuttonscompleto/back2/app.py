#Importa o Flask para criar a aplicação
from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log, recuperar_cadastro, processar_doacao

#Aplica o Flask
app = Flask(__name__)
# Permite apenas solicitações do domínio 'http://localhost:5173'
CORS(app, resources={r"/receber_dados": {"origins": "http://localhost:5173"}})
#Configura o CORS para lidar com origens diferentes
CORS(app)

#Define uma rota 
@app.route('/receber_dados', methods=['POST'])
#Função para receber dados e direcionar para o txt
#Autor: Anna Clara e Sarah
#Data: 01/12/2023 
def receber_dados():
    #Obtém os dados JSON da solicitação
    dados = request.json

    #Inicializa uma variável de retorno
    ret = ''
    print(dados)
    #Verifica se a chave 'email_log' está presente nos dados
    if dados.get('email_log') is None and dados.get('id_usuario') is None and dados.get('cardNumber') is None:
        #Se 'email_log' não estiver presente, chama a função para processar dados de cadastro
        ret = processar_dados_cad(dados)
    elif dados.get('email_log') is not None and dados.get('id_usuario') is None:
        # Se 'email_log' estiver presente, chama a função para processar dados de log
        
        ret = processar_dados_log(dados), processar_doacao(dados)
    elif dados.get('id_usuario') != None:
        # Se 'id' estiver presente, chama a função para processar o id
        ret = recuperar_cadastro(dados)
    elif dados.get('cardNumber') != None:
        ret = processar_doacao(dados)
    else:
        #Se nenhum dos casos anteriores for atendido, imprime um erro
        print('Erro', ret)

    #Imprime o resultado no terminal
    print('App: ',ret)

    #Retorna o resultado como uma resposta JSON
    return jsonify(ret)

#Executa a aplicação
if __name__ == '__main__':
    #Inicia o Flask
    app.run(debug=True)
    app.run(port=8085, host='10.135.60.39', debug=True, threaded=True)