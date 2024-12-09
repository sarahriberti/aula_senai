import re  # Importando o módulo de expressões regulares
from datetime import datetime  # Puxando data da biblioteca datetime

#Função para a validação do nome
#Autor: Júlia Bosso Albano
#Data: 01/12/2023 
#Validando o mínimo de caracteres permitidos (3),máximo de caracteres (40) e o uso de caracteres especiais.
def validar_nome(nome):
    # Remover espaços no início e fim
    nome_limpo = nome.strip()

    # Verificar se o nome está vazio após remover os espaços
    if len(nome_limpo) == 0:
        return {'erro': True, 'mensagem': {'nome': 'O nome não pode ser vazio ou conter apenas espaços.'}}

    # Verificar comprimento mínimo e máximo sem contar os espaços
    if len(nome_limpo.replace(" ", "")) < 3:
        return {'erro': True, 'mensagem': {'nome': 'O nome deve ter no mínimo 3 caracteres sem contar espaços.'}}
    elif len(nome_limpo) > 40:
        return {'erro': True, 'mensagem': {'nome': 'O nome deve ter no máximo 40 caracteres.'}}

    # Verificar se o nome contém apenas letras e espaços, sem números ou caracteres especiais
    elif not re.match("^[A-Za-zÀ-ÖØ-öø-ÿ ]+$", nome_limpo):
        return {'erro': True, 'mensagem': {'nome': 'O nome deve conter apenas letras, sem números ou caracteres especiais.'}}

    return {'erro': False, 'mensagem': ''}


# Função para a validação da data de nascimento
# Autor: Gian
# Data de Criação 01/12/2023
def validar_data_nascimento(data_nascimento):
    try:
        print("Validando data de nascimento:", data_nascimento)
        data_nascimento = datetime.strptime(data_nascimento, '%Y-%m-%d')
        print('Data convertida:', data_nascimento)
        idade = datetime.now().year - data_nascimento.year
        if idade < 16:
            return {'erro': True, 'mensagem': {'data_nascimento': 'Você deve ter pelo menos 16 anos.'}}
        return {'erro': False, 'mensagem': ''}

    except ValueError as ve:
        print('Erro na conversão da data:', ve)
        return {'erro': True, 'mensagem': {'data_nascimento': 'Data de nascimento inválida.'}}


# Função para a validação do telefone
# Autor: Arthur Antonio Vitorio
# Data: 13/12/2023
def validar_celular(celular, max_digits=15):
    print("Validando celular:", celular)
    if not 10 <= len(celular) <= max_digits:
        return {'erro': True, 'mensagem': {'celular': 'O número de celular deve ter 11 dígitos.'}}

    ddd = celular[1:3]
    print('DDD extraído:', ddd)
    ddds_validos = ['21', '22', '24', '32', '33', '34', '35', '37', '38', '11', '12', '13', '14', '15', '16', '17', '18', '19', '41', '42', '43', '44', '45', '46', '51', '53', '54', '55', '47', '48', '49', '61', '62', '64', '65', '66', '67', '82', '71', '73', '74', '75', '77', '85', '88', '98', '99', '83', '81', '87', '86', '89', '84', '79', '68', '96', '92', '97', '91', '93', '94', '69', '95', '63']
    if ddd not in ddds_validos:
        return {'erro': True, 'mensagem': {'celular': 'DDD inválido.'}}

    return {'erro': False, 'mensagem': ''}


# Função para a validação do e-mail
# Autor: Sarah
# Data de Criação 01/12/2023
def validar_email(email):
    print("Validando e-mail:", email)
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if len(email) < 5:
        return {'erro': True, 'mensagem': {'email': 'O e-mail não pode ter menos de 5 caracteres.'}}

    elif len(email) > 40:
        return {'erro': True, 'mensagem': {'email': 'O e-mail não pode ter mais de 40 caracteres.'}}

    elif not re.match(email_pattern, email):
        return {'erro': True, 'mensagem': {'email': 'E-mail inválido.'}}

    return {'erro': False, 'mensagem': {'email': 'E-mail válido.'}}


# Função para a validação da senha
# Autor: Anna Clara
# Data de Criação 01/12/2023
def validar_senha(senha):
    print("Validando senha:", senha)

    requisitos = {
        'maiúscula': any(c.isupper() for c in senha),
        'minúscula': any(c.islower() for c in senha),
        'número': any(c.isdigit() for c in senha),
        'caractere especial': any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~" for c in senha),
        'oito caracteres': len(senha) >= 8
    }

    # Depuração para verificar quais requisitos falharam
    for chave, valor in requisitos.items():
        print(f"Requisito '{chave}': {'OK' if valor else 'FALHOU'}")

    # Validar todos os requisitos
    if all(requisitos.values()):
        return {'erro': False, 'mensagem': ''}
    else:
        # Identificar os requisitos que falharam
        erros = [chave for chave, valor in requisitos.items() if not valor]
        mensagem_erro = "A senha deve conter: " + ", ".join(erros)
        return {'erro': True, 'mensagem': mensagem_erro}

# Função para confirmar se a senha fornecida e a confirmação de senha são válidas
# Autor: Anna Clara
# Data de Criação 01/12/2023
def confirmar_senha(senha, confirmsenha):
    print("Validando confirmação de senha:", senha, confirmsenha)
    if confirmsenha != senha:
        return {'erro': True, 'mensagem': {'confirmsenha': 'A confirmação de senha não corresponde à senha.'}}

    return {'erro': False, 'mensagem': ''}