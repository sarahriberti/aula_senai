from gravar_arquivo import gravar_em_arquivo, gravar_em_arquivo_log
from validacoes import (
    validar_nome,
    validar_data_nascimento,
    validar_celular,
    validar_email,
    validar_senha,
    confirmar_senha,
)

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
        #Chama a função para gravar os dados em um arquivo
        gravar_em_arquivo(dados_processados_cad, 'dados_cadastro.txt')
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
    print(mensagens_erro)

    # Verifica se há mensagens de erro
    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        #Chama a função para gravar os dados em um arquivo
        gravar_em_arquivo_log(dados_processados_log,'dados_login.txt')
        return {'erro': False, 'mensagem': 'Dados processados com sucesso!'}