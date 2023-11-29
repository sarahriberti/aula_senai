import './Cadastro.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const Cadastro = () => {
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        celular:'',
        dataNascimento: '',
        senha: '',
        confirmsenha:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    return (
        <>
            <main className='container_cad'>
                <section className="cadastro">

                    <div className="formulario">
                        <h1>Cadastro</h1>

                        <form onSubmit={handleSubmit} id='form_cadastro'>
                            <div className="class_nome">
                                <label htmlFor="">Nome</label><br />
                                <input type="text" name="nome" className="nome" id="nome" placeholder="Digite seu Nome" value={formValues.nome} onChange={handleChange} required />
                            </div>
                            <div className="class_date">
                                <label htmlFor="" >Data de nascimento</label>
                                <input type="date" name="dataNascimento" className="dataNascimento" id="dataNascimento" value={formValues.dataNascimento} onChange={handleChange} required/>
                            </div>
                            <div className="class_cel">
                                <label htmlFor="">Celular</label>
                                <input type="tel" name="celular" className="celular" id="celular" placeholder="+55/Digite seu número" value={formValues.celular} onChange={handleChange}  required />
                            </div>
                            <div className="class_email">
                                <label htmlFor="">E-mail</label>
                                <input type="email" name="email" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email} onChange={handleChange} required />
                            </div>
                            <div className="class_senha">
                                <label htmlFor="">Senha</label>
                                <input type="password" name="senha" className="senha" id="senha" value={formValues.senha} onChange={handleChange} required />
                            </div>
                            <div className="class_confir">
                                <label htmlFor="confirmsenha"> Confirmar senha</label>
                                <input type="password" name="confirmsenha" className="confirmsenha" id="confirmsenha" placeholder="Digite sua senha novamente" data-equal="password" value={formValues.confirmsenha}  onChange={handleChange} required />
                            </div>
                            <div className="botoes_cad">
                                <input type="submit" value="Cadastrar-se" id="enter_cad" />
                                <input type="submit" value="Cancelar" id="cancel_cada" />
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
    )
}
export { Cadastro };