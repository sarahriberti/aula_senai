-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/08/2024 às 14:25
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
-- Estrutura para tabela `doacoes`
--

CREATE TABLE `doacoes` (
  `ID` int(5) NOT NULL,
  `ID_USU` int(11) NOT NULL,
  `numero_cartao` varchar(19) NOT NULL,
  `data_expiracao` varchar(5) NOT NULL,
  `cvv` int(3) NOT NULL,
  `nome_cartao` varchar(50) NOT NULL,
  `valor` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `doacoes`
--

INSERT INTO `doacoes` (`ID`, `ID_USU`, `numero_cartao`, `data_expiracao`, `cvv`, `nome_cartao`, `valor`) VALUES
(2, 3, '2147483647', '12', 123, 'gabrielo', '0'),
(3, 3, '2147483647', '12', 123, 'gabriela', '0'),
(4, 3, '2147483647', '12', 123, 'gabrielo', '100'),
(5, 3, '2147483647', '1225', 123, 'gabrielo', '100'),
(6, 3, '2147483647', '12', 123, 'gabrielo', '100'),
(7, 3, '2147483647', '12', 123, 'gabrielo', '120'),
(8, 3, '2147483647', '12-25', 123, 'gabrielo', '12'),
(9, 3, '123412341234', '12/25', 123, 'gabrielo', '1'),
(12, 3, '4321432143214321', '10/25', 123, 'gabrielaaaaa', '200'),
(13, 3, '3456789087656789', '45/99', 456, 'tfttvghghjjjh', '2147483647'),
(14, 3, '1234567890123456', '90/98', 445, 'qwertbnghjhjiuytrfvb', '1234567890'),
(15, 3, '4111111111111111', '10/25', 123, 'gabrielo', '100'),
(16, 3, '4111111111111111', '10/25', 123, 'gabrielo', '200'),
(17, 3, '4111111111111111', '05/99', 345, '23456789098765678909876678777777777777777777777777', '2147483647'),
(18, 3, '4111111111111111', '12/25', 123, 'gian', '222222'),
(19, 3, '4111111111111111', '07/45', 666, 'eewewewdsddsdsdsdsdsdsfggggggg', '43435'),
(20, 3, '4111 1111 1111 1', '09/25', 454, 'dsgahujixc dkjmacj', '12345'),
(21, 4, '4111 1111 1111 1111', '11/28', 667, 'sdfghj', '0'),
(22, 4, '4111 1111 1111 1111', '09/29', 345, 'dvbnm', '0'),
(23, 4, '4111 1111 1111 1111', '12/29', 999, 'kkkkkkkkkkkkkkkkk', '0'),
(24, 4, '4111 1111 1111 1111', '09/79', 123, 'teste cod um', '0'),
(25, 4, '4111 1111 1111 1111', '12/90', 123, 'nljndcjnd', '0'),
(26, 4, '4111 1111 1111 1111', '12/90', 122, 'siaiiai', '0'),
(27, 4, '4111 1111 1111 1111', '12/25', 567, 'GHGHGHH', '0'),
(28, 4, '4111 1111 1111 1111', '12/90', 123, 'agora deu certo', 'R$ 333,33'),
(29, 4, '5555 5555 5555 4444', '12/90', 343, 'dvbnm', 'R$ 123,45'),
(30, 4, '5555 5555 5555 4444', '12/32', 121, 'agr foi', 'R$ 123,45'),
(31, 4, '4111 1111 1111 1111', '09/90', 123, 'ngvgfcggcnnb', 'R$ 2.345,6'),
(32, 4, '4111 1111 1111 1111', '09/90', 123, 'sdsgdrew', 'R$ 9,99'),
(33, 4, '5555 5555 5555 4444', '09/90', 232, 'khihjkkjkj', 'R$ 1.234,5'),
(34, 5, '5502 0901 1786 6627', '09/31', 687, 'Emily V C Q Besse', 'R$ 10,00');

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
  `Hora_Ini` datetime NOT NULL,
  `Hora_Fin` datetime NOT NULL,
  `Notific` bit(1) NOT NULL,
  `Descr` varchar(70) DEFAULT NULL,
  `Repetir` int(11) NOT NULL,
  `ID_Usu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`ID`, `Cor`, `Título`, `Data`, `Hora_Ini`, `Hora_Fin`, `Notific`, `Descr`, `Repetir`, `ID_Usu`) VALUES
(1, '000000', 'Velório', '2024-02-29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', b'1', 'Ir vestido de preto', 0, 1),
(2, 'FJK1L9', 'Festa das cores', '2024-07-09', '0000-00-00 00:00:00', '0000-00-00 00:00:00', b'1', 'Comprar pulseira neon', 0, 2),
(3, 'OJB234', 'Dentista', '2024-05-20', '0000-00-00 00:00:00', '0000-00-00 00:00:00', b'1', 'Levar dinheiro', 0, 3),
(4, '00SFUH', 'Reunião', '2024-08-10', '0000-00-00 00:00:00', '0000-00-00 00:00:00', b'1', 'Abrir a sala quinze minutos depois', 2, 4);

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
(1, 'Sarah', '2007-03-15', '19 9999-9999', 'sah.riberti@gmail.com', 'gMo@2510'),
(2, 'gojo ta vivo', '2008-04-07', '55587tghuihjui', 'emily.cezaretto.besse1@gmail.com', '@Gegecoveiro1234'),
(3, 'bgwsgsvgwe', '0000-00-00', '9999999998', 'arroz@gmail.com', 'Natureza90@#'),
(4, 'gabrielo', '2000-11-11', '19999999997', 'gianzinho@jjjka.com', 'Natureza90@#'),
(5, 'Yeonjun', '2000-03-20', '(19) 99878-987', 'yeonjunlindo@gmail.com', 'Hyunjinboyfriend@#2');

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
-- Índices de tabela `doacoes`
--
ALTER TABLE `doacoes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USU` (`ID_USU`);

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
-- AUTO_INCREMENT de tabela `doacoes`
--
ALTER TABLE `doacoes`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `sugestao`
--
ALTER TABLE `sugestao`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Restrições para tabelas `doacoes`
--
ALTER TABLE `doacoes`
  ADD CONSTRAINT `doacoes_ibfk_1` FOREIGN KEY (`ID_USU`) REFERENCES `usuario` (`ID`);

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
