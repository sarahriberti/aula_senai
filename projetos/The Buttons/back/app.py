
from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados_cad, processar_dados_log

app = Flask(__name__)
CORS(app)

@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    dados = request.json
    if(dados.get('email_log')==None):
        processar_dados_cad(dados)
    elif(dados.get('email_log')!=None):
        processar_dados_log(dados)
    else:
        print('Erro')

    return jsonify({'mensagem': 'Dados recebidos com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)