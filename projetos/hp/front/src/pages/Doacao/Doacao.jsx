import React, { useState } from 'react';
import MenuLateral from '../../components/Menu_Lateral';
import '../Doacao/Doacao.css';

function formatarValor(valor) {
    const valorNumerico = valor.replace(/\D/g, '');
    return (Number(valorNumerico) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function formatarNumeroCartao(numero) {
    return numero.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

function validarNumeroCartao(numero) {
    const numeroLimpo = numero.replace(/\s+/g, '').replace(/\D/g, '');
    if (numeroLimpo.length < 13 || numeroLimpo.length > 19) return false;

    let soma = 0;
    let alternar = false;

    for (let i = numeroLimpo.length - 1; i >= 0; i--) {
        let digito = parseInt(numeroLimpo.charAt(i), 10);
        if (alternar) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }
        soma += digito;
        alternar = !alternar;
    }

    return (soma % 10 === 0);
}

function validarDataExpiracao(data) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(data)) return false;

    const [month, year] = data.split('/').map(num => parseInt(num, 10));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (year > currentYear) || (year === currentYear && month >= currentMonth);
}

function validarNomeTitular(nome) {
    const regex = /^[A-Za-zÀ-ÿ\s]{1,30}$/;
    return regex.test(nome.trim());
}

function PagDoacao() {
    const [valorDoacao, setValorDoacao] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardholderName: '',
        donationValue: '',
        id_usu: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleValorChange = (event) => {
        let valor = event.target.value.replace(/\D/g, '');
        if (valor.length === 0) {
            setValorDoacao('');
            return;
        }
        setValorDoacao(formatarValor(valor));
    };

    const handleBlur = () => {
        if (valorDoacao.length > 0) {
            setValorDoacao(formatarValor(valorDoacao.replace(/[^\d]/g, '')));
        }
    };

    const handleFocus = () => {
        const valorNumerico = valorDoacao.replace(/[^\d]/g, '');
        setValorDoacao(valorNumerico);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formattedNumber = formatarNumeroCartao(value);
            setFormData({ ...formData, [name]: formattedNumber });
        } else if (name === 'expirationDate') {
            let formattedDate = value.replace(/\D/g, '');
            if (formattedDate.length >= 3) {
                formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
            }
            setFormData({ ...formData, [name]: formattedDate });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validarCVV = (cvv) => {
        const regex = /^\d{3}$/;
        return regex.test(cvv);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cardNumber, expirationDate, cvv, cardholderName } = formData;

        if (!validarNumeroCartao(cardNumber)) {
            setErrorMessage('Número do cartão inválido. Insira um número válido sem espaços.');
            return;
        }
        if (!validarDataExpiracao(expirationDate)) {
            setErrorMessage('Data de expiração inválida. Use o formato MM/YY e certifique-se de que a data não está expirada.');
            return;
        }
        if (!validarCVV(cvv)) {
            setErrorMessage('CVV inválido. Insira um código de 3 dígitos.');
            return;
        }
        if (!validarNomeTitular(cardholderName)) {
            setErrorMessage('Nome do titular do cartão inválido. O nome deve conter apenas letras e ter no máximo 30 caracteres.');
            return;
        }

        const userId = localStorage.getItem('id');

        if (!userId) {
            setErrorMessage('Usuário não está autenticado. Faça login novamente.');
            return;
        }

        const valorNumerico = valorDoacao.replace(/[^\d]/g, '');

        const formDataWithId = { ...formData, id_usu: userId, donationValue: valorNumerico };

        try {
            const response = await fetch('http://10.135.60.33:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithId),
            });

            const data = await response.json();

            if (data.valid === 'true') {
                console.log('Doação registrada com sucesso!', formDataWithId);
                setFormData({
                    cardNumber: '',
                    expirationDate: '',
                    cvv: '',
                    cardholderName: '',
                    donationValue: '',
                    id_usu: userId,
                });
                setValorDoacao('');
                setErrorMessage('Doação realizada com sucesso!');
            } else {
                setErrorMessage(data.message || 'Erro ao processar a doação.');
            }
        } catch (error) {
            console.error('Erro ao registrar doação:', error);
            setErrorMessage('Erro ao registrar doação. Tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <div className='menu_doacao'>
                <MenuLateral />
            </div>
            <form onSubmit={handleSubmit} className='form-pagss'>
                <br />
                <h2 className='titulocont'>Por que sua doação é importante?</h2>
                <p className='textapoio'>Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento. Cada doação, por menor que seja, contribui para alcançarmos nosso objetivo de ajudar o maior número possível de pessoas com o nosso site.</p>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <label>
                    <input
                        type='hidden'
                        name='id_usu'
                        value={formData.id_usu}
                        className='id_usu'
                    />
                </label>
                <label>
                    Número do Cartão:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className='cardNumber'
                        maxLength="19"
                        pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{1,4}"
                        placeholder="Número do cartão (com espaços automáticos)"
                    />
                </label>
                <label>
                    Data de Expiração:
                    <input
                        type="text"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        required
                        className='expirationDate'
                        pattern="\d{2}/\d{2}"
                        maxLength="5"
                        placeholder="MM/YY"
                        id='expirationDate'
                    />
                </label>
                <label>
                    CVV:
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        className='cvv'
                        maxLength="3"
                        pattern="\d*"
                        id='cvv'
                    />
                </label>
                <label>
                    Nome do Titular do Cartão:
                    <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleChange}
                        required
                        className='cardholderName'
                        maxLength="30"
                        pattern="[A-Za-zÀ-ÿ\s]+"
                        placeholder="Nome do titular do cartão"
                        id='cardholderName'
                    />
                </label>
                <label>
                    Valor da Doação:
                    <input
                        type="text"
                        name='donationValue'
                        value={valorDoacao}
                        onChange={handleValorChange}
                        required
                        maxLength="10"
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        className='donationValue'
                        placeholder="R$ 0,00"
                        id='ValorDoac'
                    />
                </label>
                <button className='botaocont' type="submit" id='Botao_pagar'>Pagar</button>
                <div className="container_doc">
                    <footer className='footer-doacao'>
                        <p className='confirm-emp'>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
                    </footer>
                </div>
            </form>
        </div>
    );
}

export default PagDoacao;