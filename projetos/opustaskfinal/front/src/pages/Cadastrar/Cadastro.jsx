import './Cadastro.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import BotaoAjudaCad from '../../components/BotoesAjuda/BotaoAjudaCad';

const Cadastro = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        celular: '',
        dataNascimento: '',
        senha: '',
        confirmsenha: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mensagensErroCampos, setMensagensErroCampos] = useState({
        nome: '',
        dataNascimento: '',
        celular: '',
        email: '',
        senha: '',
        confirmsenha: '',
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
    });

    const [submitted, setSubmitted] = useState(false); // Adiciona o estado de submissão

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        // Validação de senha
        if (name === "senha") validatePassword(value);
        // Validação de outros campos
        if (name === 'nome') validateNome(value);
        if (name === 'dataNascimento') validateDataNascimento(value);
        if (name === 'celular') validateCelular(value);
        if (name === 'email') validateEmail(value);
        if (name === 'confirmsenha') validateConfirmSenha(value);
    };

    const validateNome = (nome) => {
        return nome.length < 3 ? "O nome deve ter no mínimo 3 letras." : '';
    };

    const validateDataNascimento = (dataNascimento) => {
        const [year, month, day] = dataNascimento.split('-');
        const birthDate = new Date(year, month - 1, day);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age < 16 ? "Você deve ter pelo menos 16 anos." : '';
    };

    const validateCelular = (celular) => {
        const celularSemMascara = celular.replace(/\D/g, ''); // Remove caracteres não numéricos
        return celularSemMascara.length !== 11 ? "O número de telefone deve ter 11 dígitos." : '';
    };

    const validateEmail = (email) => {
        // Dividir o email na parte antes e depois do '@'
        const [localPart, domain] = email.split('@');

        // Verificar se a parte local (antes do '@') tem pelo menos 3 caracteres
        return localPart && localPart.length < 3 ? "O email deve ter pelo menos 3 caracteres antes do @" : '';
    };


    const validateConfirmSenha = (confirmsenha) => {
        return confirmsenha !== formValues.senha ? "As senhas não são iguais." : '';
    };

    const validatePassword = (password) => {
        setPasswordRequirements({
            length: password.length >= 8 && password.length <= 70,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            symbol: /[!@#%$]/.test(password),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Marca que o formulário foi enviado

        const erros = {
            nome: validateNome(formValues.nome),
            dataNascimento: validateDataNascimento(formValues.dataNascimento),
            celular: validateCelular(formValues.celular),
            email: validateEmail(formValues.email),
            senha: validateConfirmSenha(formValues.confirmsenha),
            confirmsenha: validateConfirmSenha(formValues.confirmsenha),
        };

        setMensagensErroCampos(erros); // Atualiza os erros

        // Verifica se há erros
        if (Object.values(erros).some((erro) => erro)) {
            return; // Não envia o formulário se houver erros
        }

        try {
            const resposta = await fetch('http://10.135.60.27:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resposta.status !== 200) {
                setMensagensErroCampos({ global: 'Erro ao processar os dados.' });
                return;
            }

            if (resultado.erro) {
                setMensagensErroCampos({ global: resultado.mensagem });
            } else {
                navigate('/CadConcluido');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagensErroCampos({ global: 'Erro ao se conectar com o servidor. Tente novamente mais tarde.' });
        }
    };

    return (
        <>
            <main className='container_cad'>
                {submitted && mensagensErroCampos.global && (
                    <div style={{ color: 'red' }}>
                        <p>Erro ao processar os dados:</p>
                        <ul>
                            <li>{mensagensErroCampos.global}</li>
                        </ul>
                    </div>
                )}
                <section className="cadastro">
                    <div className="formulario">
                        <h1>Cadastro</h1>
                        <form onSubmit={handleSubmit} id='form_cadastro'>
                            <div className="class_nome">
                                <label htmlFor="nome">Nome</label><br />
                                <input type="text" name="nome" className="nome" id="nome" placeholder="Digite seu Nome" value={formValues.nome} onChange={handleChange} required />
                                {submitted && mensagensErroCampos.nome && <span className="error-validation">{mensagensErroCampos.nome}</span>}
                            </div>
                            <div className="class_date">
                                <label htmlFor="dataNascimento">Data de nascimento</label>
                                <input type="date" name="dataNascimento" className="dataNascimento" id="dataNascimento" value={formValues.dataNascimento} onChange={handleChange} required />
                                {submitted && mensagensErroCampos.dataNascimento && <span className="error-validation">{mensagensErroCampos.dataNascimento}</span>}
                            </div>
                            <div className="class_cel">
                                <label htmlFor="celular">Celular</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={formValues.celular}
                                    onChange={handleChange}
                                >
                                    {() => <input type="tel" name="celular" className="celular" id="celular" placeholder="Digite seu número" required />}
                                </InputMask>
                                {submitted && mensagensErroCampos.celular && <span className="error-validation">{mensagensErroCampos.celular}</span>}
                            </div>
                            <div className="class_email">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email} onChange={handleChange} required />
                                {submitted && mensagensErroCampos.email && <span className="error-validation">{mensagensErroCampos.email}</span>}
                            </div>
                            <div className="class_senha">
                                <label htmlFor="senha">Senha</label>
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="senha"
                                        className="senha"
                                        id="senha"
                                        placeholder="Digite sua senha"
                                        value={formValues.senha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <ul className="password-requirements">
                                    <li className={passwordRequirements.length ? 'valid' : 'invalid'}>
                                        {passwordRequirements.length ? <FaCheck /> : <FaTimes />} De 8 a 70 caracteres
                                    </li>
                                    <li className={passwordRequirements.lowercase ? 'valid' : 'invalid'}>
                                        {passwordRequirements.lowercase ? <FaCheck /> : <FaTimes />} Letra minúscula
                                    </li>
                                    <li className={passwordRequirements.uppercase ? 'valid' : 'invalid'}>
                                        {passwordRequirements.uppercase ? <FaCheck /> : <FaTimes />} Letra maiúscula
                                    </li>
                                    <li className={passwordRequirements.number ? 'valid' : 'invalid'}>
                                        {passwordRequirements.number ? <FaCheck /> : <FaTimes />} Número
                                    </li>
                                    <li className={passwordRequirements.symbol ? 'valid' : 'invalid'}>
                                        {passwordRequirements.symbol ? <FaCheck /> : <FaTimes />} Símbolo (Ex: !@#%$)
                                    </li>
                                </ul>
                                {submitted && mensagensErroCampos.senha && <span className="error-validation">{mensagensErroCampos.senha}</span>}
                            </div>
                            <div className="class_confir">
                                <label htmlFor="confirmsenha">Confirmar senha</label>
                                <div className="input-wrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmsenha"
                                        className="confirmsenha"
                                        id="confirmsenha"
                                        placeholder="Digite sua senha novamente"
                                        value={formValues.confirmsenha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {submitted && mensagensErroCampos.confirmsenha && <span className="error-validation">{mensagensErroCampos.confirmsenha}</span>}
                            </div>
                            <div className="botoes_cad">
                                <input type="submit" value="Cadastrar-se" id="enter_cad" />
                                <input type="button" value="Cancelar" id="cancel_cada" onClick={() => navigate('/')} />
                            </div>
                            <div className="class_botoes">
                                <li className="text_return">
                                    <Link to="/Login">Já possui uma conta? Faça login</Link>
                                </li>
                            </div>
                            <div className="cadastro">
                                <h3>Cadastrar-se com</h3>
                                <a href="https://www.instagram.com/"><input type="button" value="Facebook" /></a>
                                <a href="https://www.google.com/intl/pt-BR/account/about/"><input type="button" value="Google" /></a>
                            </div>
                        </form>
                    </div>
                </section>
                <BotaoAjudaCad />
            </main>
        </>
    );
};

export default Cadastro;