/*Nome: Cadastro */
/*Data da criação: junho de 2023 */
/*Descrição : Nesta página foi criado a oportunidade de se cadastrar no nosso site*/
/*Observações : Este documento contém o import do Usestate, Link  */
import './Cadastro.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import InputMask from 'react-input-mask'; // Adicionada a importação do InputMask
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importação dos ícones de olho
/*Fim das importações  */

/*nome das constantes que vão ser usadas para validar os campos */
const Cadastro = () => {
    const navigate = useNavigate(); // Instancia o hook useNavigate

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        celular: '',
        dataNascimento: '',
        senha: '',
        confirmsenha: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para controlar a visibilidade da confirmação de senha

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    /*cria a mensagem de erro */
    const [mensagensErro, setMensagensErro] = useState([]);

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
            const resposta = await fetch('http://192.168.137.1:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resultado.erro) {
                setMensagensErro(resultado.mensagens);
            } else {
                navigate('/CadConcluido');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <>
            <main className='container_cad'>
                {mensagensErro.length > 0 && (
                    <div style={{ color: 'red' }}>
                        {/*mensagem que vai aparecer */}
                        <p>Erro ao processar os dados:</p>
                        <ul>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}> {mensagem.mensagem}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <section className="cadastro">
                    {/*Formulario criado */}
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
                                        data-equal="password"
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
            </main>
        </>
    );
};

export { Cadastro };
