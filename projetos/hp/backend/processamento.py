from validacoes import (
    validar_nome,
    validar_data_nascimento,
    validar_celular,
    validar_email,
    validar_senha,
    confirmar_senha,
)
import uuid
from atualizar import atualizar_status_tarefa_bd
# >>> Importa o arquivo com a função que insere as informações no banco de dados <<<
import Gravar_BD # >>> Importa o arquivo com a função que insere as informações no banco de dados <<<
from select_log import (
    confere_dados_com_banco
)
from select_cad import (consultar_usuario_por_id)
from datetime import datetime, timedelta
from calendar import monthrange

def avancar_mes(data, meses=1):
    """
    Avança a data fornecida pelo número especificado de meses.
    Ajusta automaticamente para o último dia do mês se necessário.

    :param data: Objeto datetime representando a data inicial.
    :param meses: Número de meses para avançar (padrão: 1).
    :return: Objeto datetime ajustado.
    """
    ano = data.year
    mes = data.month + meses

    # Ajusta o ano e o mês se o mês ultrapassar 12
    while mes > 12:
        mes -= 12
        ano += 1

    # Ajusta o dia para o último dia do mês se necessário
    dia = min(data.day, monthrange(ano, mes)[1])

    return datetime(ano, mes, dia, data.hour, data.minute, data.second)

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

# Função para processar os dados do formulário To Do
# Autor: Emily
# Data: 12/03/2024
def processar_dados_tarefa(dados):
    """
    Processa os dados de uma tarefa recebida, grava a tarefa no banco de dados e 
    cria notificações caso necessário.
    """
    # Verificar se todas as chaves necessárias estão presentes
    required_keys = ['Cor', 'Titulo', 'Inicio', 'Termino', 'Notific', 'Descr', 'Categoria', 'Repetir', 'ID_Usu']
    missing_keys = [key for key in required_keys if key not in dados]

    if missing_keys:
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': f'Campos ausentes: {", ".join(missing_keys)}'}]}

    # Gerar um ID_PAI único
    id_pai = str(uuid.uuid4())

    # Adicionar o ID_PAI à tarefa original
    dados['ID_PAI'] = id_pai
    tarefas_para_gravar = [dados]  # Lista com a tarefa original

    # Função para criar uma tarefa repetida
    def criar_tarefa_repetida(tarefa, nova_data):
        tarefa_repetida = tarefa.copy()
        tarefa_repetida['Inicio'] = nova_data.strftime('%Y-%m-%d %H:%M')
        tarefa_repetida['Termino'] = nova_data.strftime('%Y-%m-%d %H:%M')
        tarefa_repetida['ID_PAI'] = id_pai
        return tarefa_repetida

    # Criar tarefas repetidas com base no tipo de repetição
    if dados['Repetir'] in ['1', '2', '3', '4']:
        inicio = datetime.strptime(dados['Inicio'], '%Y-%m-%d %H:%M')

        if dados['Repetir'] == '1':  # Diariamente
            for i in range(1, 51):  # Até 50 dias
                nova_data = inicio + timedelta(days=i)
                tarefas_para_gravar.append(criar_tarefa_repetida(dados, nova_data))

        elif dados['Repetir'] == '2':  # Semanalmente
            for i in range(1, 9):  # Até 8 semanas
                nova_data = inicio + timedelta(weeks=i)
                tarefas_para_gravar.append(criar_tarefa_repetida(dados, nova_data))

        elif dados['Repetir'] == '3':  # Mensalmente
            for _ in range(1, 11):  # Até 10 meses
                inicio = avancar_mes(inicio)
                tarefas_para_gravar.append(criar_tarefa_repetida(dados, inicio))

        elif dados['Repetir'] == '4':  # Anualmente
            for i in range(1, 6):  # Até 5 anos
                nova_data = inicio.replace(year=inicio.year + i)
                tarefas_para_gravar.append(criar_tarefa_repetida(dados, nova_data))

    # Gravar as tarefas no banco de dados e criar notificações, se necessário
    for tarefa in tarefas_para_gravar:
        resultado = Gravar_BD.gravar_tarefas(
            tarefa['Cor'],
            tarefa['Titulo'],
            tarefa['Inicio'],
            tarefa['Termino'],
            tarefa['Notific'],
            tarefa['Descr'],
            tarefa['Categoria'],
            tarefa['Repetir'],
            tarefa['ID_Usu'],
            tarefa['ID_PAI']
        )

        if resultado['erro']:
            return {'erro': True, 'mensagem': 'Erro ao gravar tarefa: ' + resultado['mensagem']}

        # Função para criar notificações
        def criar_notificacoes(tarefa, id_tarefa):
            mensagens = [
                f'{tarefa["Titulo"]} em uma hora',
                f'{tarefa["Titulo"]} em 15 minutos'
            ]

            inicio_tarefa = datetime.strptime(tarefa['Inicio'], '%Y-%m-%d %H:%M')
            horarios = [
                inicio_tarefa - timedelta(hours=1),
                inicio_tarefa - timedelta(minutes=15)
            ]

            for i, mensagem in enumerate(mensagens):
                Gravar_BD.gravar_notificacao(
                    mensagem=mensagem,
                    id_usu=tarefa['ID_Usu'],
                    id_taf=id_tarefa,
                    data_hora=horarios[i].strftime('%Y-%m-%d %H:%M')
                )

        # Criar notificações se necessário
        if tarefa['Notific'] == '1':  # Notificação ativada
            criar_notificacoes(tarefa, resultado['id_tarefa'])

    return {'erro': False, 'mensagem': 'Tarefas e notificações gravadas com sucesso!'}

# Função para processar o check da tarefa
# Autor: Júlia e Arthur
# Data: 17/10/2024
def processa_check(novo_status, id_tarefa):
    # Verifica se o ID da tarefa foi fornecido
    print('proc--', id_tarefa, novo_status)

    if not id_tarefa:
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'ID da tarefa não fornecido'}]}

    # Verifica se o novo_status foi fornecido (0 ou 1)
    if novo_status not in [0, 1]:
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'Novo status inválido. Deve ser 0 ou 1.'}]}

    # Consulta o status de conclusão da tarefa no banco de dados
    ret = atualizar_status_tarefa_bd(id_tarefa, novo_status)
    print('ret->', ret)
    # Se a tarefa foi marcada como concluída (1)
    if novo_status == 1:
        return {'erro': False, 'mensagem': 'Tarefa marcada como concluída.'}

    # Se a tarefa foi desmarcada (0)
    elif novo_status == 0:
        return {'erro': False, 'mensagem': 'Tarefa desmarcada como concluída.'}

    # Caso haja algum erro inesperado
    else:
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'Status de tarefa inválido.'}]}

# Função para processar o id
# Autor: Emily
# Data: 04/04/2024
def recuperar_cadastro(dados):
    dados_processados_gerenciar = dados
    print(f"ID usuario: {dados_processados_gerenciar.get('id_usuario')}")

    geren = consultar_usuario_por_id(dados_processados_gerenciar['id_usuario'])
    print('retorno bancoo', geren)

    if geren:
        resposta = {
            'id': geren[0],
            'nome': geren[1],
            'data_nascimento': str(geren[2]),  # Convertendo a data para string
            'telefone': geren[3],
            'email': geren[4],
            'imagem': geren[5]
        }
        return {'erro': False, 'mensagem': resposta}
    else:
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'ID não encontrado ou inexistente'}]}

# Função para processar a sugestão
# Autor: Arthur
# Data: 22/10/2024
def processar_dados_sugestao(userId, texto_sugestao):
    print("Entrando na função processar_dados_sugestao")

    # Exibe os dados recebidos
    print(f"Mensagem: {texto_sugestao}")
    print(f"ID do Usuário: {userId}")

    # Verifica se os parâmetros são válidos
    if not texto_sugestao or not userId:
        print("Texto ou ID do usuário ausente.")
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'Texto ou ID do usuário ausente.'}]}

    try:
        # Chama a função para gravar a sugestão no banco de dados
        Gravar_BD.gravar_sugestao(texto_sugestao, userId)
        print("Sugestão gravada com sucesso!")
        return {'erro': False, 'mensagem': 'Sugestão gravada com sucesso!'}
    except Exception as e:
        print(f"Erro ao gravar sugestão: {str(e)}")
        return {'erro': True, 'mensagens': [{'erro': True, 'mensagem': 'Erro ao gravar sugestão. Tente novamente.'}]}