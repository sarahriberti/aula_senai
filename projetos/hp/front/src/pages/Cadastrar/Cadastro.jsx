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
    const [mensagensErro, setMensagensErro] = useState([]);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (name === "senha") validatePassword(value);
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

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const validateDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const birthDate = new Date(year, month - 1, day);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age >= 16;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateDate(formValues.dataNascimento)) {
            setMensagensErro([{ mensagem: 'Você deve ter pelo menos 16 anos.' }]);
            return;
        }

        try {
            const resposta = await fetch('http://10.135.60.22:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resposta.status !== 200) {
                setMensagensErro([{ mensagem: resultado.mensagem || 'Erro ao processar os dados.' }]);
                return;
            }

            if (resultado.erro) {
                setMensagensErro([{ mensagem: resultado.mensagem }]);
            } else {
                navigate('/CadConcluido');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagensErro([{ mensagem: 'Erro ao se conectar com o servidor. Tente novamente mais tarde.' }]);
        }
    };

    return (
        <>
            <main className='container_cad'>
                {mensagensErro.length > 0 && (
                    <div style={{ color: 'red' }}>
                        <p>Erro ao processar os dados:</p>
                        <ul>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem}</li>
                            ))}
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
                            </div>
                            <div className="class_date">
                                <label htmlFor="dataNascimento">Data de nascimento</label>
                                <input type="date" name="dataNascimento" className="dataNascimento" id="dataNascimento" value={formValues.dataNascimento} onChange={handleChange} required />
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
                            </div>
                            <div className="class_email">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email} onChange={handleChange} required />
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
                                        {passwordRequirements.length ? <FaCheck /> : <FaTimes />} de 8 a 70 caracteres
                                    </li>
                                    <li className={passwordRequirements.lowercase ? 'valid' : 'invalid'}>
                                        {passwordRequirements.lowercase ? <FaCheck /> : <FaTimes />} letra minúscula
                                    </li>
                                    <li className={passwordRequirements.uppercase ? 'valid' : 'invalid'}>
                                        {passwordRequirements.uppercase ? <FaCheck /> : <FaTimes />} letra maiúscula
                                    </li>
                                    <li className={passwordRequirements.number ? 'valid' : 'invalid'}>
                                        {passwordRequirements.number ? <FaCheck /> : <FaTimes />} número
                                    </li>
                                    <li className={passwordRequirements.symbol ? 'valid' : 'invalid'}>
                                        {passwordRequirements.symbol ? <FaCheck /> : <FaTimes />} símbolo (Ex: !@#%$)
                                    </li>
                                </ul>
                            </div>
                            <div className="class_confir">
                                <label htmlFor="confirmsenha"> Confirmar senha</label>
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
                <BotaoAjudaCad/>
            </main>
        </>
    );
};

export default Cadastro;