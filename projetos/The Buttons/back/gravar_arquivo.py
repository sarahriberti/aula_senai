def gravar_em_arquivo(dados, nome_arquivo):
    # Função para processar e gravar dados em um arquivo de texto 
        try:
            # Processa os dados

            # Grava os dados em um arquivo de texto
            with open(nome_arquivo, 'a') as arquivo:
                arquivo.write("\nDados Gravados:\n")
                arquivo.write(f"Nome: {dados.get('nome')}\n")
                arquivo.write(f"E-mail: {dados.get('email')}\n")
                arquivo.write(f"Celular: {dados.get('celular')}\n")
                arquivo.write(f"Data de Nascimento: {dados.get('dataNascimento')}\n")
                arquivo.write(f"Senha: {dados.get('senha')}\n")
                arquivo.write(f"Confirmacao de senha: {dados.get('confirmsenha')}\n")
                arquivo.write("\n")

            print(f"Os dados foram gravados no arquivo '{nome_arquivo}' com sucesso!")
        except Exception as e:
            print(f"Erro ao gravar dados no arquivo: {e}")


def gravar_em_arquivo_log(dados, nome_arquivo):
    # Função para processar e gravar dados em um arquivo de texto

        try:
            # Processa os dados

            # Grava os dados em um arquivo de texto
            with open(nome_arquivo, 'a') as arquivo:
                arquivo.write("\nDados Gravados:\n")
                arquivo.write(f"E-mail-login: {dados.get('email_log')}\n")
                arquivo.write(f"Senha-login: {dados.get('senha_log')}\n")
                arquivo.write("\n")

            print(f"Os dados foram gravados no arquivo '{nome_arquivo}' com sucesso!")
        except Exception as e:
            print(f"Erro ao gravar dados no arquivo: {e}")
