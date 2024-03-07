import re #Importando o módulo de expressões regulares
from datetime import datetime #Puxando data da biblioteca datetime

#Função para a validação do nome
#Autor: Júlia Bosso Albano
#Data: 01/12/2023 
#Validando o mínimo de caracteres permitidos (3),máximo de caracteres (40) e o uso de caracteres especiais.
def validar_nome(nome):
    if len(nome) < 3:
        return {'erro': True, 'mensagem': 'O nome deve ter no mínimo 3 caracteres.'}
    elif len(nome) > 40:
        return {'erro': True,'mensagem': 'O nome deve ter no máximo 40 caracteres '}
    elif not re.match("^[A-ZA-z ]", nome):
        return {'erro': True, 'mensagem': 'O nome deve conter apenas letras, sem números ou caracteres especiais.'}
    
    return {'erro': False, 'mensagem': ''}


    #Função para a validação da data de nascimento
    #Autor: Gian
    #Data de Criação 01/12/2023
def validar_data_nascimento(data_nascimento):
    try:
        # referenciando a biblioteca e alinhando para uso com dia, mês e ano
        data_nascimento = datetime.strptime(data_nascimento, '%Y-%m-%d')
        #criando a variável para validar a idade minima e maxima baseada em uma subtração de anos
        idade = datetime.now().year - data_nascimento.year
        if idade < 16:
            return {'erro': True, 'mensagem': 'Você deve ter pelo menos 16 anos.'}
        return {'erro': False, 'mensagem': ''}
    except ValueError:
        return {'erro': True, 'mensagem': 'Data de nascimento inválida.'}
    

    #Função para a validação do telefone
    #Autor: Arthur Antonio Vitorio
    #Data: 13/12/2023
    #Seus requisitos para validação são ter um DDD existente, sem letras na campo do telefone e com o número máximo de 11 digitos.
def validar_celular(celular, max_digits=11):
    if not celular.isdigit():
        return {'erro': True, 'mensagem': 'O número de celular deve conter apenas dígitos numéricos.'}
    
    # Verifica se o comprimento do número de celular tem 11 dígitos
    if not 10 <= len(celular) <= max_digits:
        return {'erro': True, 'mensagem': f'O número de celular deve ter 11 dígitos.'}

    # Obtém os primeiros dois dígitos do número de celular como DDD
    ddd = celular[:2]

    # Verifica se o DDD é válido (pode adicionar mais lógica para validar DDD específicos, se necessário)
    ddds_validos = ['21', '22', '24', '32', '33', '34', '35', '37', '38' ,'11', '12', '13', '14', '15', '16', '17', '18', '19','41', '42', '43', '44', '45', '46', '51', '53', '54' , '55'
                    '47', '48','49', '61','62' ,'64', '65', '66','67','82', '71', '73', '74', '75', '77', '85', '88', '98', '99', '83', '81', '87', '86', '89' ,'84', '79', '68', '96', '92', '97',
                    '91', '93' ,'94', '69', '95', '63 ']
    if ddd not in ddds_validos:
        return {'erro': True, 'mensagem': 'DDD inválido.'}

    # Se todas as verificações passarem, retorna que não há erro
    return {'erro': False, 'mensagem': ''}

    # Função para a validação do endereço de e-mail
    # Autor: Sarah
    # Data de Criação 01/12/2023
def validar_email(email):
    # Utilizando uma expressão regular mais abrangente para validar o formato do e-mail
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    # Verifica o comprimento do e-mail, se está de acordo com o valor mínimo e máximo
    # Caso não esteja de acordo com as condições retorna mensagem de erro de acordo com o erro

    if len(email) < 5:
        return {'erro': True, 'mensagem': 'O e-mail não pode ter menos de 5 caracteres.'}
    
    elif len(email) > 40:
        return {'erro': True, 'mensagem': 'O e-mail não pode ter mais de 40 caracteres.'}

    # Caso o e-mail não siga os padrões designados retorna mensagem de erro
    elif not re.match(email_pattern, email):
        return {'erro': True, 'mensagem': 'E-mail inválido.'}

    return {'erro': False, 'mensagem': 'E-mail válido.'}

# Exemplo de uso:
resultado = validar_email('exemplo@email.com')
print(resultado)

    # Função para a validação do endereço de senha
    # Autor: Anna Clara
    # Data de Criação 01/12/2023
def validar_senha(senha):
    requisitos = {
        'maiúscula': any(c.isupper() for c in senha),
        'minúscula': any(c.islower() for c in senha),
        'número': any(c.isdigit() for c in senha),
        'caractere especial': any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~" for c in senha),
        'oito caracteres': len(senha) >= 8
    }


    if all(requisitos.values()):
        return {'erro': False, 'mensagem': ''}
    else:
        requisitos_faltando = [req for req, atendido in requisitos.items() if not atendido]
        return {'erro': True, 'mensagem': f"A senha deve conter: {', '.join(requisitos_faltando)}."}

    #Função para a validação do endereço de confirmação de senha
    # Autor: Anna Clara
    # Data de Criação 01/12/2023
# função para confirmar se a senha fornecida e a confirmação de senha são válidas
def confirmar_senha(senha, confirmsenha):
    # Verifica se a confirmação de senha é diferente da senha fornecida
    if confirmsenha != senha:
        # Se a confirmação de senha não corresponder à senha retorna o erro
        return {'erro': True, 'mensagem': 'A confirmação de senha não corresponde à senha.'}

    # Se a senha e a confirmação de senha estiverem corretas retorna um dicionário que deu certo
    return {'erro': False, 'mensagem': ''}