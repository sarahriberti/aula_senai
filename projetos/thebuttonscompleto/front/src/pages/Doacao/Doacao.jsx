/*Nome: Doacao*/
/*Autor: Julia Bosso*/
/*Descrição : Página de doações*/
import React, { useState } from 'react'; 
import MenuLateral from '../../components/Menu_Lateral'; 

// Função para formatar o valor como um montante em reais (R$)
function formatarValor(valor) {
    // >>> Remove todos os caracteres não numéricos <<<
    const valorNumerico = valor.replace(/\D/g, '');

    // >>> Formata o valor como um montante em reais (R$) <<<
    const valorFormatado = Number(valorNumerico / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return valorFormatado;
}

// Componente funcional principal para a página de doações
function PagDoacao() {
    // Estado para armazenar o valor da doação
    const [valorDoacao, setValorDoacao] = useState('');

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardholderName: '',
        donationValue: '',
        id_usu: '',
    });

    // Função para lidar com mudanças no valor da doação
    const handleValorChange = (event) => {
        const novoValor = event.target.value;
        setValorDoacao(formatarValor(novoValor));
    };

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.valid) {
                // Exemplo de processamento dos dados do formulário
                console.log('Dados do formulário:', formData);
                // Limpar o formulário após o envio
                setFormData({
                    cardNumber: '',
                    expirationDate: '',
                    cvv: '',
                    cardholderName: '',
                    donationValue: '',
                    id_usu: '',
                });
            } else {
                alert('Número do cartão inválido. Insira um número válido.');
            }
        } catch (error) {
            console.error('Erro ao validar número do cartão:', error);
            alert('Ocorreu um erro ao validar o número do cartão. Tente novamente mais tarde.');
        }
    };

    // Renderização do formulário de doação
    return (
        <form onSubmit={handleSubmit} className='form-pag'>
            <h1>Página de Doações</h1>
            <div className='menu_doacao'>
                <MenuLateral />
            </div>
            <br />
            <h2>Por que sua doação é importante?</h2>
            <p>Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento. Cada doação, por menor que seja, contribui para alcançarmos nosso objetivo de ajudar o maior número possível de pessoas com o nosso site.</p>
            
            {/* Campo oculto para armazenar o ID do usuário */}
            <label>
                <input
                    type='hidden'
                    name='id_usu'
                    value={formData.id_usu}
                    className='id_usu'
                />
            </label>
            
            {/* Campo para o número do cartão */}
            <label>
                Número do Cartão:
                <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className='cardNumber'
                />
            </label>
            
            {/* Campo para a data de expiração do cartão */}
            <label>
                Data de Expiração:
                <input
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    pattern="0[1-9]|1[0-2])\d{2}"
                    maxLength="4"
                    required
                    className='expirationDate'
                    onFocus={(e) => e.target.value = e.target.value.replace('/', '')} // Remove a barra ao focar
                    onBlur={(e) => e.target.value = e.target.value.replace(/^(\d{2})(\d{2})$/, '$1/$2')} // Adiciona a barra ao perder o foco
                />
            </label>
            
            {/* Campo para o CVV do cartão */}
            <label>
                CVV:
                <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    className='cvv'
                />
            </label>
            
            {/* Campo para o nome do titular do cartão */}
            <label>
                Nome do Titular do Cartão:
                <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    required
                    className='cardholderName'
                />
            </label>
            
            {/* Campo para o valor da doação */}
            <label>
                Valor da Doação:
                <input
                    type="text"
                    name='donationValue'
                    value={valorDoacao}
                    onChange={handleValorChange}
                    className='donationValue'
                />
            </label>

            {/* Botão para submeter o formulário */}
            <button type="submit">Pagar</button>

            {/* Rodapé da página de doação */}
            <div className="container_doc">
                <footer className="donation-footer">
                    <p>Agradecemos sua contribuição!</p>
                </footer>
            </div>
        </form>
    );
}

export default PagDoacao; 