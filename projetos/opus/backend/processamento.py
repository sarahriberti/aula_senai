from validacoes import (
    validar_nome,
    validar_data_nascimento,
    validar_celular,
    validar_email,
    validar_senha,
    confirmar_senha,
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

    #Exibe os dados recebidos do cadastro
    print("\nDados Recebidos:")
    print(f"Nome: {dados_processados_cad.get('nome')}")
    print(f"E-mail: {dados_processados_cad.get('email')}")
    print(f"Celular: {dados_processados_cad.get('celular')}")
    print(f"Data de Nascimento: {dados_processados_cad.get('dataNascimento')}")
    print(f"Senha: {dados_processados_cad.get('senha')}")
    print(f"Confirmacao de senha: {dados_processados_cad.get('confirmsenha')}")
    print("\nDados Processados com Sucesso!\n")

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

    #Exibe os dados recebidos do login
    print(f"E-mail-login: {dados_processados_log.get('email_log')}")
    print(f"Senha-login: {dados_processados_log.get('senha_log')}")

    #Realiza validações e mensagens de erro do login
    mensagens_erro = []

    mensagens_erro.append(validar_email(dados.get('email_log')))
    mensagens_erro.append(validar_senha(dados.get('senha_log', '')))

    # Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]
    print(f"Mensagens de erro: {mensagens_erro}")

    # Verifica se há mensagens de erro
    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        # Chama a função para verificar o login no banco de dados
        login_val = confere_dados_com_banco(dados['email_log'], dados['senha_log'])
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

    # Chama a função para gravar os dados no banco de dados
    Gravar_BD.gravar_tarefas(
        dados_processados_to_do['cor'],
        dados_processados_to_do['titulo'],
        dados_processados_to_do['data'],
        dados_processados_to_do['hora_ini'],
        dados_processados_to_do['hora_fin'],
        dados_processados_to_do['notific'],
        dados_processados_to_do['descr'],
        dados_processados_to_do['repetir'],
        dados_processados_to_do['ID']
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