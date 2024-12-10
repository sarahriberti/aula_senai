import React from 'react';
import './Help.css'; // Certifique-se de que o caminho do arquivo CSS está correto
import { useNavigate } from 'react-router-dom';
import { FaleConosco } from "../Fale Conosco/Fale_Conosco";

const AjudaCadastro = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='sair_help'>
                {/* Botão de sair para voltar ao Login */}
                <img src="./src/image/seta-esquerda.png" alt="Voltar para Login" className="sair_help_botao" onClick={() => navigate('/Cadastro')} />
            </div>
            <div className="container_help">
                <div>
                    <h1 className="header">Precisa de Ajuda?</h1>

                    <p className="text_help">
                        Olá! Seja Bem-vindo à central de ajuda Opus!
                        <br />Estamos aqui para ajudar! Se você está tendo dificuldades em efetuar o cadastro, veja abaixo algumas instruções para resolver problemas comuns.
                    </p>
                </div>

                <div className='container_help_filho'>
                    <div className="section_um">
                        <h2 className="subHeader_help">Passos para Efetuar o Cadastro</h2>
                        <ul className="list_help">
                            <li className='letra_help'><strong>1. Acesse a página de Cadastro:</strong> Clique no link "Cadastre-se" na tela de Login.</li>

                            <li className='letra_help'><strong>2. Preencha os campos obrigatórios:</strong></li>
                            <div className='letra_help_topico'>
                                <li className='letra_help_centro'><strong> Nome:</strong> Insira seu nome (mínimo 3 caracteres e máximo 40).</li>
                                <li className='letra_help_centro'><strong> Data de Nascimento:</strong> Informe uma data de nascimento válida.Temos a idade permitida a partir de 16 anos.</li>
                                <li className='letra_help_centro'><strong> Celular:</strong> Forneça seu número de celular com o código de área (DDD) válido. <li className='Exemple_help'>Exemplo: (11) 91234-5678</li></li>

                                <li className='letra_help_centro'><strong> E-mail:</strong> Digite um e-mail válido (mínimo 5 caracteres, máximo 40, incluindo "@").  <li className='Exemple_help'>Exemplo: usuario@opus.com

                                </li></li>
                                <li className='letra_help_centro'><strong> Senha:</strong> Crie uma senha que contenha uma letra maiúscula, uma letra minúscula, um caractere especial, números e mínimo de 8 caracteres.  <li className='Exemple_help'>Exemplo: UsuarioSenha@123</li></li>
                                <li className='letra_help_centro'><strong> Confirmar Senha:</strong> Repita a senha escolhida no campo anterior.</li>
                            </div>


                            <li className='letra_help'><strong>3. Clique em "Cadastrar":</strong> Após preencher todos os campos, clique no botão "Cadastrar" para criar sua conta. Onde você será direcionado para a página de cadastro concluído onde irá fazer login</li>


                        </ul>
                    </div>

                    <div className="section_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">


                            <strong>1. Já tenho uma conta?</strong> Se você já se cadastrou, use a tela de Login para acessar sua conta.
                            <img className='imagem_help_login' src="./src/image/help_cad2.png" alt="" />
                        </p>

                        <p className="text1_help">
                            <strong>2. Preciso de ajuda adicional?</strong> Nossa equipe de suporte está pronta para ajudar! Não hesite em usar o link "Fale Conosco" abaixo.
                        </p>
                        <strong>3. Problemas ao cadastrar?</strong> Verifique se todos os campos foram preenchidos corretamente. Se o problema persistir, entre em contato conosco!
                    </div>
                </div>

                <FaleConosco />
            </div>
        </div>
    );
};

export default AjudaCadastro;