from gravar_arquivo import gravar_em_arquivo, gravar_em_arquivo_log
from validacoes import (
    validar_nome,
    validar_data_nascimento,
    validar_celular,
    validar_email,
    validar_senha,
    confirmar_senha,
    validar_cartao,
    validar_data_expiracao,
    validar_cvv,
    validar_nome_titular,
    validar_valor_doacao,
)
import Gravar_BD # >>> Importa o arquivo com a função que insere as informações no banco de dados <<<
from select_log import ( 
    confere_dados_com_banco
)
from select_cad import (consultar_usuario_por_id)
from datetime import datetime

#Função para processar os dados do cadastro
#Autor: Anna Clara e Sarah
#Data: 01/12/2023 
def processar_dados_cad(dados):
    # Função para processar os dados recebidos do Flask
    # Retorna os dados processados
    dados_processados_cad = dados

    #Realiza validações e mensagens de erro
    mensagens_erro = []

    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_data_nascimento(dados.get('dataNascimento', '')))
    mensagens_erro.append(validar_celular(dados.get('celular', '')))
    mensagens_erro.append(validar_email(dados.get('email')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))
    mensagens_erro.append(confirmar_senha(dados.get('senha'), dados.get('confirmsenha')))

    #Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]
    print(mensagens_erro)

    #Verifica se há mensagens de erro
    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        #Chama a função para gravar os dados no banco de dados
        Gravar_BD.gravar_dados_cad_bd(
            dados_processados_cad['nome'],
            dados_processados_cad['dataNascimento'],
            dados_processados_cad['celular'],
            dados_processados_cad['email'],
            dados_processados_cad['senha']
        )
        return {'erro': False, 'mensagem': 'Dados processados com sucesso!'}

#Função para processar os dados do login
#Autor: Anna Clara e Sarah
#Data: 01/12/2023 
def processar_dados_log(dados):
    #Função para processar os dados de login recebidos do Flask
    #Retorna os dados processados
    dados_processados_log = dados

    #Realiza validações e mensagens de erro do login
    mensagens_erro = []

    mensagens_erro.append(validar_email(dados.get('email_log')))
    mensagens_erro.append(validar_senha(dados.get('senha_log', '')))

    # Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]
    print(mensagens_erro)

    # Verifica se há mensagens de erro
    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        # Chama a função para verificar o login no banco de dados
        login_val = confere_dados_com_banco(dados_processados_log['email_log'], dados_processados_log['senha_log'])
        if login_val:
            # Login bem-sucedido
            return {'erro': False, 'mensagem': login_val}
        else:
            # Dados de login incorretos
            return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'Dados de login incorretos.'}]}
        
#Função para processar os dados do formulário To Do
#Autor: Emily
#Data: 12/03/2024
def processar_dados_tarefa(dados):
    # Função para processar os dados recebidos do Flask
    # Retorna os dados processados
    dados_processados_to_do = dados
    # Seu código para processar os dados do formulário de adicionar tarefas...

    # Chama a função para gravar os dados no banco de dados
    Gravar_BD.gravar_tarefas(
        dados_processados_to_do['cor'],
        dados_processados_to_do['titulo'],
        dados_processados_to_do['data'],
        dados_processados_to_do['hora_ini'],
        dados_processados_to_do['hora_fin'],
        dados_processados_to_do['notific'],
        dados_processados_to_do['descr'],
        dados_processados_to_do['repetir']
    )
    return {'erro': False, 'mensagem': 'Tarefa gravada com sucesso!'}

#Função para processar o id
#Autor: Emily
#Data: 04/04/2024
def recuperar_cadastro(dados):
    # Função para processar o id recebido do Flask
    # Retorna os dados processados
    dados_processados_gerenciar = dados
    
    # Exibe os dados recebidos
    print(f"ID usuario: {dados_processados_gerenciar.get('id_usuario')}")


        # Chama a função para verificar o ID no banco de dados
    geren = consultar_usuario_por_id(dados_processados_gerenciar['id_usuario'])
    if geren:              
        return {'erro': False, 'mensagem': geren}
    else:
            # Dados de login incorretos
        print(geren)
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'ID não encontrado ou inexistente'}]}

#Função para processar os dados das doações
#Autor: Emily
#Data de criação: 16/05/2024

def processar_doacao(dados):
    dados_processados_doacao = dados
    # >>> Exibe os dados recebidos das coações <<<
    print("\nDados Recebidos:")
    print(f"Número do cartão: {dados_processados_doacao.get('cardNumber')}")
    print(f"Data de expiração do cartão: {dados_processados_doacao.get('expirationDate')}")
    print(f"CVV: {dados_processados_doacao.get('cvv')}")
    print(f"Nome do titular do cartão: {dados_processados_doacao.get('cardholderName')}")
    print(f"Valor da doação: {dados_processados_doacao.get('donationValue')}")
    print(f"Data da doação: {dados_processados_doacao.get('data_doacao')}")
    print("\nDados de Doação Processados com Sucesso!\n")

    # >>> Obter a data e hora atuais <<<
    data_doacao = datetime.now()

    # >>> Adicionar a data da doação e o ID do usuário aos dados processados <<<
    dados_processados_doacao['data_doacao'] = data_doacao

    # >>> Realiza validações específicas para dados de doações <<<
    mensagens_erro = []

    mensagens_erro.append(validar_cartao(dados.get('cardNumber', '')))
    mensagens_erro.append(validar_data_expiracao(dados.get('expirationDate', '')))
    mensagens_erro.append(validar_cvv(dados.get('cvv', '')))
    mensagens_erro.append(validar_nome_titular(dados.get('cardholderName', '')))
    mensagens_erro.append(validar_valor_doacao(dados.get('donationValue', '')))

    # >>> Remove mensagens de erro vazias <<<
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]
    print(mensagens_erro)

    # >>> Verifica se há mensagens de erro <<<
    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
    #Chama a função para gravar os dados no banco de dados
        Gravar_BD.gravar_doacoes(
            dados_processados_doacao['cardNumber'],
            dados_processados_doacao['expirationDate'],
            dados_processados_doacao['cvv'],
            dados_processados_doacao['cardholderName'],
            dados_processados_doacao['donationValue'],
        )
        return {'erro': False, 'mensagem': 'Dados processados com sucesso!'}