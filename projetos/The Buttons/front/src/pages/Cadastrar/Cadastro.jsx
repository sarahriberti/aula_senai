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

            // Verifica se os dados foram bem-sucedidos
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

                        {/* Formulário para cadastro*/}
                        <form onSubmit={handleSubmit} id='form_cadastro'>
                            <div className="class_nome">
                                <label htmlFor="">Nome</label><br />
                                {/* Nome do usuário */}
                                <input type="text" name="nome" className="nome" id="nome" placeholder="Digite seu Nome" value={formValues.nome} onChange={handleChange} required />
                            </div>

                            {/* Botões para enviar e cancelar o formulário dp cadastro */}
                            <div className="botoes_cad">
                                <input type="submit" value="Cadastrar-se" id="enter_cad" />
                                <input type="submit" value="Cancelar" id="cancel_cada" />
                            </div>

                            {/* Link para página do login */}
                            <div className="class_botoes">
                                <li className="text_return">
                                    <Link to="/Login">Já possui uma conta? Faça login</Link>
                                </li>
                            </div>

                            {/* Cadastro com o google ou instagram*/}
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