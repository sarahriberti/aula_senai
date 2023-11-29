# processamento.py
from gravar_arquivo import gravar_em_arquivo, gravar_em_arquivo_log

def processar_dados_cad(dados):
    # Função para processar os dados recebidos do Flask
    # Retorna os dados processados
    dados_processados_cad = dados

    print("\nDados Recebidos:")
    print(f"E-mail: {dados_processados_cad.get('email')}")
    print(f"Celular: {dados_processados_cad.get('celular')}")
    print(f"Data de Nascimento: {dados_processados_cad.get('dataNascimento')}")
    print(f"Senha: {dados_processados_cad.get('senha')}")
    print(f"Confirmacao de senha: {dados_processados_cad.get('confirmsenha')}")
    print("\nDados Processados com Sucesso!\n")

        # Chama a função para gravar os dados em um arquivo
    gravar_em_arquivo(dados_processados_cad, 'dados_cadastro.txt')

    return dados_processados_cad

def processar_dados_log(dados):

    dados_processados_log = dados

    print(f"E-mail-login: {dados_processados_log.get('email_log')}")
    
    print(f"Senha-login: {dados_processados_log.get('senha_log')}")

    gravar_em_arquivo_log(dados_processados_log,'dados_login.txt')

    # Retorna os dados processados
    return dados_processados_log
    