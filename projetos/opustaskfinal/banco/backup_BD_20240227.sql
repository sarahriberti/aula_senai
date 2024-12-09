-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 27/02/2024 às 13:45
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `opustask`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `calendario`
--

CREATE TABLE `calendario` (
  `ID` int(5) NOT NULL,
  `ID_Usu` int(5) NOT NULL,
  `ID_Taf` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `compartilhar`
--

CREATE TABLE `compartilhar` (
  `ID` int(5) NOT NULL,
  `Status` bit(2) NOT NULL,
  `Permissao` int(3) NOT NULL,
  `ID_Cal` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sugestao`
--

CREATE TABLE `sugestao` (
  `ID` int(5) NOT NULL,
  `Texto` varchar(50) NOT NULL,
  `ID_Usu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `ID` int(5) NOT NULL,
  `Cor` varchar(6) NOT NULL,
  `Título` varchar(50) NOT NULL,
  `Data` date NOT NULL,
  `Hora_Ini` time NOT NULL,
  `Hora_Fin` time NOT NULL,
  `Notific` bit(1) NOT NULL,
  `Descr` varchar(70) DEFAULT NULL,
  `Repetir` int(11) NOT NULL,
  `ID_Usu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`ID`, `Cor`, `Título`, `Data`, `Hora_Ini`, `Hora_Fin`, `Notific`, `Descr`, `Repetir`, `ID_Usu`) VALUES
(1, '000000', 'Estudar para o exame de matemática', '2024-02-29', '10:00:00', '17:30:00', b'1', 'Fazer pausas cronometradas', 0, 1),
(2, 'FJK1L9', 'Fazer compras no supermercado', '2024-02-23', '15:30:00', '17:00:00', b'1', 'Levar papel e caneta', 0, 2),
(3, 'OJB234', 'Preparar uma apresentação para o trabalho', '2024-02-24', '14:00:00', '16:00:00', b'1', 'Ler o PDF de modelo', 0, 3),
(4, '00SFUH', 'Correr por 30 minutos', '2024-03-05', '18:00:00', '18:30:00', b'1', 'Não esquecer o fone de ouvido', 2, 4),
(5, 'ONB213', 'Ler dois capítulos do livro atual.', '2024-04-23', '20:00:00', '22:00:00', b'1', 'Deixar a porta fechada', 0, 1),
(6, 'DHW278', 'Agendar uma consulta médica', '2024-04-25', '11:30:00', '12:00:00', b'1', 'Marcar consultas gerais', 1, 2),
(7, 'HUV2J2', 'Enviar e-mails de acompanhamento aos clientes', '2024-02-24', '09:00:00', '11:00:00', b'1', 'Enviar para todos os clientes', 3, 3),
(8, '238H23', 'Aprender uma nova receita de culinária', '2024-02-23', '17:00:00', '20:00:00', b'1', 'Chamar dois amigos', 5, 4),
(9, '197AVN', 'Limpar o quarto', '2024-02-22', '14:00:00', '15:10:00', b'1', 'Passar pano no chão no final', 0, 1),
(10, 'ALNE13', 'Planejar as férias de verão', '2024-02-25', '16:00:00', '19:00:00', b'1', 'Anotar todos os orçamentos', 0, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(5) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Data_Nasc` date NOT NULL,
  `Celular` varchar(14) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `Senha` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `Nome`, `Data_Nasc`, `Celular`, `Email`, `Senha`) VALUES
(1, 'Sarah', '2007-03-15', '19 9999-9999', 'sah.riberti@gmail.com', '99774158@#$aghjAS'),
(2, 'Emily', '2007-03-06', '19 99413-2161', 'emily.cezaretto.besse@gmail.com', '24445ssygyFUJK@#$'),
(3, 'Gian', '2006-10-25', '19 88888-8888', 'gian.oliveira@aluno.senai.br', 'efIGIVFIbbj2348#%'),
(4, 'Anna Clara', '2007-03-23', '17 77777-7777', 'anna.c.penariol@gmail.com', 'ajuy28#$%MM');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `calendario`
--
ALTER TABLE `calendario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Usu` (`ID_Usu`),
  ADD KEY `ID_Taf` (`ID_Taf`);

--
-- Índices de tabela `compartilhar`
--
ALTER TABLE `compartilhar`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Cal` (`ID_Cal`);

--
-- Índices de tabela `sugestao`
--
ALTER TABLE `sugestao`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Usu` (`ID_Usu`);

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Usu` (`ID_Usu`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `calendario`
--
ALTER TABLE `calendario`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `compartilhar`
--
ALTER TABLE `compartilhar`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sugestao`
--
ALTER TABLE `sugestao`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `calendario`
--
ALTER TABLE `calendario`
  ADD CONSTRAINT `calendario_ibfk_1` FOREIGN KEY (`ID_Usu`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `calendario_ibfk_2` FOREIGN KEY (`ID_Taf`) REFERENCES `tarefas` (`ID`);

--
-- Restrições para tabelas `compartilhar`
--
ALTER TABLE `compartilhar`
  ADD CONSTRAINT `compartilhar_ibfk_1` FOREIGN KEY (`ID_Cal`) REFERENCES `calendario` (`ID`);

--
-- Restrições para tabelas `sugestao`
--
ALTER TABLE `sugestao`
  ADD CONSTRAINT `sugestao_ibfk_1` FOREIGN KEY (`ID_Usu`) REFERENCES `usuario` (`ID`);

--
-- Restrições para tabelas `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`ID_Usu`) REFERENCES `usuario` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
