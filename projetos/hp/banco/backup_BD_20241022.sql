-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/10/2024 às 20:05
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
(34, 5, '5502 0901 1786 6627', '09/31', 687, 'Emily V C Q Besse', 'R$ 10,00'),
(35, 5, '4111 1111 1111 1111', '09/31', 123, 'Choi Yeonjun', '1000'),
(36, 7, '5502 0901 1786 6627', '09/31', 687, 'Emily V C Q Besse', '500');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sugestao`
--

CREATE TABLE `sugestao` (
  `ID` int(5) NOT NULL,
  `Texto` varchar(50) NOT NULL,
  `ID_Usu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `sugestao`
--

INSERT INTO `sugestao` (`ID`, `Texto`, `ID_Usu`) VALUES
(1, 'Ótimo site, a estética é muito bonita', 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `ID` int(5) NOT NULL,
  `Cor` varchar(7) NOT NULL,
  `Titulo` varchar(30) NOT NULL,
  `Inicio` datetime NOT NULL,
  `Termino` datetime NOT NULL,
  `Notific` bit(1) NOT NULL,
  `Descr` varchar(70) NOT NULL,
  `Repetir` int(11) NOT NULL,
  `ID_Usu` int(5) NOT NULL,
  `Categoria` int(11) NOT NULL,
  `Concluida` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`ID`, `Cor`, `Titulo`, `Inicio`, `Termino`, `Notific`, `Descr`, `Repetir`, `ID_Usu`, `Categoria`, `Concluida`) VALUES
(1, '#ff0000', 'Velório', '2024-09-26 03:00:00', '2024-09-26 02:00:00', b'1', 'Ir vestido de preto', 0, 1, 0, b'0'),
(2, '#FJK1L9', 'Festa das cores', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Comprar pulseira neon', 0, 2, 0, b'0'),
(3, '#OJB234', 'Dentista', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Levar dinheiro', 0, 3, 0, b'0'),
(4, '#00SFUH', 'Reunião', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Abrir a sala quinze minutos depois', 2, 4, 0, b'0'),
(5, '#2ea4f1', 'Supermercado', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Comprar ingredientes para fazer esfirra e o que estiver faltando em ca', 4, 5, 0, b'0'),
(6, '#6510el', 'Pizza', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Pedir pizza', 4, 5, 0, b'0'),
(7, '#c1c1c', 'HKG UG', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'JBUBICD', 4, 5, 0, b'0'),
(8, '#d4ff00', ' jh hkvk', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'pnoi', 4, 5, 0, b'0'),
(9, '#ff0088', 'vi', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'ljbku', 4, 5, 0, b'0'),
(10, '#c1c1c1', 'HKG UG', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'JBUBICD', 4, 5, 0, b'0'),
(11, '#00fffb', 'Teste', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Teste para ver hora', 4, 5, 0, b'0'),
(13, '#252942', 'Batata', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'kgk', 0, 5, 0, b'0'),
(15, '#00ccff', '@', '2024-10-01 11:40:00', '2024-10-10 07:37:00', b'1', '', 2, 6, 0, b'0'),
(17, '#e2fe0b', 'Fazer miojo', '2024-09-26 00:00:00', '2024-09-26 00:00:00', b'1', 'Fazer miojo de quatro queijos', 4, 5, 0, b'0'),
(25, '#252942', 'Fazer arroz', '2024-09-26 06:03:00', '2024-09-26 07:03:00', b'1', 'Fazer dois copos de arroz', 0, 7, 0, b'0'),
(26, '#252942', 'faz o L', '2024-09-26 13:31:00', '2024-09-26 14:31:00', b'1', 'NVJWLV', 0, 5, 0, b'0'),
(27, '#252942', 'batata', '2024-09-26 14:11:00', '2024-09-26 15:11:00', b'1', 'hvekcek', 0, 5, 0, b'0'),
(28, '#252942', 'Arroz', '2024-09-26 16:26:00', '2024-09-26 16:46:00', b'1', 'Fazer um copo de arroz', 0, 5, 0, b'0'),
(29, '#252942', 'Plantar', '2024-09-26 09:12:00', '2024-09-26 10:12:00', b'0', 'Arroz', 0, 8, 0, b'0'),
(30, '#252942', 'Arthur', '2024-09-26 10:54:00', '2024-09-26 11:54:00', b'0', 'Rr', 0, 8, 0, b'0'),
(31, '#252942', 'Arthur ', '2024-09-26 11:19:00', '2024-09-26 12:19:00', b'0', 'Tu', 0, 8, 0, b'0'),
(32, '#252942', 'Teste celular', '2024-09-26 13:22:00', '2024-09-26 15:22:00', b'1', 'Lalalal', 0, 7, 0, b'0'),
(33, '#252942', 'Apresentação Senai ', '2024-09-26 09:30:00', '2024-09-26 15:10:00', b'1', 'Sesi de portas abertas ', 0, 10, 0, b'0'),
(35, '#563d7c', 'nha', '2024-09-26 13:12:00', '2024-09-26 14:15:00', b'0', 'nhanv', 4, 9, 0, b'0'),
(37, '#252942', 'Arthur 1234', '2024-09-26 08:44:00', '2024-09-26 09:44:00', b'0', 'Plantar ', 0, 1, 0, b'0'),
(41, '#252942', 'Rodolfo', '2024-09-26 20:03:00', '2024-09-26 21:03:00', b'0', 'Rato', 0, 1, 0, b'0'),
(42, '#252942', 'Cozinhar', '2024-09-26 10:11:00', '2024-09-26 11:11:00', b'1', 'Cozinhar batata', 0, 7, 0, b'0'),
(43, '#563d7c', 'prova de portugues', '2024-09-26 11:45:00', '2024-09-26 12:20:00', b'1', '.', 4, 12, 0, b'0'),
(44, '#252942', 'Estudo', '2024-09-26 11:46:00', '2024-09-26 01:08:00', b'1', '', 0, 13, 0, b'0'),
(45, '#3d637b', 'apresent', '2024-09-26 14:00:00', '2024-09-26 18:00:00', b'0', 'nao esquecer !!', 2, 14, 0, b'0'),
(46, '#563d7c', 'jgjmh', '2024-09-26 12:07:00', '2024-09-26 14:09:00', b'0', 'ghbg', 4, 15, 0, b'0'),
(47, '#252942', 'Tarefa1', '2024-09-26 08:07:00', '2024-09-26 12:07:00', b'0', 'Tarefa1 ', 0, 1, 0, b'0'),
(48, '#252942', 'Prova Lp', '2024-09-26 09:30:00', '2024-09-26 10:40:00', b'1', 'Medida velha e nova', 0, 18, 0, b'0'),
(49, '#563d7c', 'prova feiticos', '2024-09-26 12:00:00', '2024-09-26 13:00:00', b'0', 'o', 4, 19, 0, b'0'),
(50, '#563d7c', 'TESTE', '2024-09-26 13:00:00', '2024-09-26 14:00:00', b'0', 'teste', 4, 20, 0, b'0'),
(54, '#563d7c', 'jogo do poli', '2024-09-26 13:35:00', '2024-09-26 18:32:00', b'0', 'treinar', 4, 1, 0, b'0'),
(55, '#563d7c', 'nha', '2024-09-26 13:38:00', '2024-09-26 14:39:00', b'0', 'hy', 4, 1, 0, b'0'),
(56, '#252942', 'Apresentação ', '2024-09-26 06:00:00', '2024-09-26 12:00:00', b'0', '', 0, 25, 0, b'0'),
(57, '#742ae5', 'Niver da vovo', '2024-09-26 12:00:00', '2024-09-26 23:00:00', b'0', 'niver da minha vovo', 2, 26, 0, b'0'),
(61, '#563d7c', 'prova de portugues', '2024-09-26 10:40:00', '2024-09-26 12:20:00', b'0', 'Prova', 1, 29, 0, b'0'),
(65, '#563d7c', 'Apresentar bem', '2024-09-26 14:13:00', '2024-09-26 16:00:00', b'0', 'apresente melhor', 4, 30, 0, b'0'),
(66, '#252942', 'Apresentação ', '2024-09-26 10:30:00', '2024-09-26 10:40:00', b'1', 'Oi', 0, 32, 0, b'0'),
(68, '#25ad3b', 'jogar uma pelota com os parças', '2024-09-26 17:33:00', '2024-09-26 14:35:00', b'0', 'dfgshdjfklhçkj', 4, 33, 0, b'0'),
(70, '#252942', 'Arthur', '2024-09-26 14:49:00', '2024-09-26 15:49:00', b'0', 'Plantar', 0, 34, 0, b'0'),
(71, '#563d7c', 'jantar', '2024-09-26 22:22:00', '2024-09-26 22:23:00', b'0', 'almoçar', 4, 9, 0, b'0'),
(72, '#563d7c', 'jantar', '2024-09-26 22:22:00', '2024-09-26 22:23:00', b'0', 'vvuyvuv', 4, 9, 0, b'0'),
(73, '#6600ff', 'testewherever', '2024-09-19 20:00:00', '2024-09-19 23:00:00', b'0', 'elfwblg', 5, 7, 0, b'0'),
(74, '#753900', 'CAPIVARA', '2024-09-29 08:00:00', '2024-09-29 09:00:00', b'0', 'EFWEF', 5, 7, 0, b'0'),
(75, '#a34900', 'Reunião', '2024-10-01 10:00:00', '2024-10-01 09:00:00', b'1', 'Reunião no PENTAGON', 5, 35, 0, b'0'),
(77, '#cc0014', 'jantar', '2024-10-01 18:00:00', '2024-10-01 20:00:00', b'1', 'Jantar no restaurante X', 1, 35, 0, b'0'),
(78, '#ffa200', 'LA ALA LALALALA ALALALLA', '0000-00-00 00:00:00', '0000-00-00 00:00:00', b'0', 'lbjkbk', 5, 7, 0, b'0'),
(81, '#a6ff00', 'PATOS LAGOS', '2024-10-10 12:00:00', '2024-10-10 14:00:00', b'0', 'ELGLWEG', 5, 7, 0, b'0'),
(82, '#d1f6ff', 'Piscina', '2024-10-13 10:00:00', '2024-10-14 12:00:00', b'1', 'Ir na piscina', 5, 7, 0, b'0'),
(83, '#99ff00', 'TESTE TESTE', '2024-10-10 16:00:00', '2024-10-10 17:00:00', b'1', 'BRBOWRGBOIWHGO', 5, 1, 6, b'0'),
(84, '#6600ff', 'Teste automação', '2024-10-19 19:00:00', '2024-10-19 20:00:00', b'1', 'Teste de automatização usando o selenium', 1, 7, 0, b'0'),
(96, '#563d7c', 'la', '2024-10-17 19:00:00', '2024-10-17 20:00:00', b'0', '', 5, 7, 6, b'0'),
(97, '#563d7c', 'luikyj', '2024-10-17 18:00:00', '2024-10-17 20:00:00', b'0', '', 5, 7, 6, b'0'),
(98, '#563d7c', 'lalala', '2024-10-17 18:00:00', '2024-10-17 20:00:00', b'0', '', 0, 7, 0, b'0'),
(99, '#563d7c', 'conto de fadas', '2024-10-19 18:00:00', '2024-10-19 20:00:00', b'0', '', 0, 7, 0, b'0'),
(100, '#00ff2a', 'arrumar css do viewer', '2024-10-22 09:00:00', '2024-10-22 10:00:00', b'0', '', 0, 7, 0, b'1'),
(101, '#563d7c', 'Anna Lindona esta fazendo css', '2024-10-22 12:12:00', '2024-10-22 12:23:00', b'0', 'tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt', 0, 7, 0, b'1'),
(103, '#0e7500', 'babadookBOLA', '2024-10-22 16:00:00', '2024-10-22 16:30:00', b'0', '', 1, 7, 0, b'1'),
(104, '#9aff1f', 'Categoria teste', '2024-10-28 10:00:00', '2024-10-28 12:00:00', b'1', 'Teste para aparecer a categoria no front', 5, 7, 2, b'0'),
(105, '#d1b3ff', 'TESTE', '2024-10-30 20:00:00', '2024-10-30 22:00:00', b'0', '', 0, 7, 6, b'0'),
(106, '#ff00ae', 'barbie', '2024-10-22 19:00:00', '2024-10-22 20:30:00', b'0', 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', 5, 7, 1, b'0');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(5) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Data_Nasc` date NOT NULL,
  `Celular` varchar(15) NOT NULL,
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
(5, 'Yeonjun', '2000-03-18', '(19) 99878-9872', 'yeonjun@gmail.com', 'Hyunjinboyfriend@#2'),
(6, 'Emily', '2007-03-06', '(19) 99413-216', 'emily.besse@gmail.com', 'Natureza90@$'),
(7, 'Kang', '1999-03-20', '19644545418', 'kang@gmail.com', '97655K4n@#'),
(8, 'Arthur ', '2003-12-18', '(19) 99999-9999', 'Arthur123@gmail.com', 'Arthur123@'),
(9, 'Roberta', '1998-10-05', '(21) 34354-3453', 'roberta@gmail.com', 'Roberta123!@#'),
(10, 'Maria Luiza Goulart Poli ', '2007-05-13', '(19) 9912-3456', 'malulinda@gmail.com', 'Malu@1234'),
(11, 'Arthur', '2000-09-18', '(19) 99999-9999', 'junior@example.com', 'Arthur1812@'),
(12, 'vinicius alves dos santos', '2008-04-02', '(19) 99917-8031', 'v44803527@gmail.com', 'Vinicius@0204'),
(13, 'Murylo Otavio Alves de Toledo', '2008-09-02', '(19) 99205-3846', 'murylorodnei@gmail.com', 'Murylorodnei@2008'),
(14, 'duda negre', '2008-05-17', '(19) 99774-3565', 'abcdesesi@gmail.com', 'MARIADUDAISa12@'),
(15, 'Maria Clara', '2008-06-12', '(11) 82568-4848', 'maria@gmail.com', 'Maria123@'),
(16, 'Julia Bosso ', '2000-12-12', '(19) 99666-2007', 'Julia.zbosso@gmail.com', 'Julia2004@'),
(17, 'Ricardo Inacio', '1985-04-01', '(19) 98289-0287', 'ricardo.inacio@sp.senai.br', 'Ri30062015#'),
(18, 'Enzo Bueno Silva de Freitas ', '2005-01-05', '(19) 97100-3926', 'buenoenzo46@gmail.com', '05E01b09s@'),
(19, 'milena', '2008-02-13', '(19) 99487-6654', 'milena.martins2@portalsesisp.org.br', 'Corvin@00'),
(20, 'matheus', '2000-05-02', '(19) 45464-6565', 'foxjr9@gmail.com', 'Matheus@10'),
(21, 'maria fernanda ', '2008-07-10', '(19) 65842-3652', 'junior@example.com', 'Mafer@2008'),
(22, 'Letícia Siqueira Parreiras', '2007-01-13', '(19) 98223-3507', 'ls.parrreiras@gmail.com', 'Alegri@1'),
(23, 'CRISTIANE DE LUCCIA ARCARE LOVATO', '1979-06-14', '(19) 99970-4062', 'ferramentarialovato@gmail.com', '@Cris1406'),
(24, 'Dulcineia ', '1977-08-24', '(11) 11111-1111', 'daalfredo@gmail.com', '567842Ru@'),
(25, 'Vanessa castelion', '1979-03-13', '(19) 99704-8452', 'vanessacastelion@hotmail.com', 'Van2535@'),
(26, 'Tayla', '2005-12-09', '(19) 99965-0550', 'taylaralggel@gmail.com', 'Tayla071285@'),
(27, 'Maria Luiza', '2007-05-13', '(19) 98964-5367', 'marialuiza@gmail.com', 'Malu@1234'),
(28, 'Eddy Aguirre', '1972-02-28', '(21) 99901-9909', 'eddy.aguirre@sesisp.org.br', 'Ed@dy2805'),
(29, 'Marcos Vinicius Cavalaro', '2007-11-26', '(19) 99306-7854', 'cavalarovinicius@gmail.com', 'Vini2007#'),
(30, 'Alanis Silva', '2000-10-17', '(19) 99999-6665', 'alaniss@gmail.com', '12345678Aa@'),
(31, 'Marilia gata', '2006-10-12', '(19) 99173-5134', 'Mariliagatamiau@gmail.com', 'MarilindaMiau@1'),
(32, 'Julia Linda', '2007-04-18', '(19) 99999-9999', 'julia@gmail.com', 'Julia@123'),
(33, 'davi cruz', '2000-05-25', '(12) 34567-8901', 'cruz@gmail.com', 'Cruz@123'),
(34, 'Arthur ', '2003-11-18', '(19) 99999-9999', 'arthur@gmail.com', 'Arthur1812@'),
(35, 'Obama', '2007-09-06', '(19) 56312-3103', 'obama@gmail.com', 'Lalalala90@#'),
(36, 'Song', '1999-10-10', '(19) 54512-1252', 'song@gmail.com', 'SongLindo90@#'),
(37, 'Momo', '1999-10-10', '(19) 25963-2200', 'momo@gmail.com', 'Momohirai90@#'),
(38, 'Malala', '2000-02-05', '(15) 62545-4663', 'momo@gmail.com', 'Malala90@#M'),
(39, 'vjhdfhaevf', '2000-05-05', '(18) 49591-5615', 'momo@gmail.com', 'Batata90@'),
(40, 'Emily Besse', '2000-10-23', '(19) 99999-9999', 'emily.besse@aluno.senai.br', 'gMo@2510'),
(41, 'Patolino', '1989-02-15', '(15) 13200-0000', 'songa@gmail.com', 'Batata90@#'),
(42, 'Lolla', '1985-06-04', '(19) 12301-5454', 'lolla@gmail.com', 'Lolla90@#'),
(43, 'Ivya', '1999-02-02', '(19) 87654-2487', 'ivya@gmail.com', 'Ivyalinda90@'),
(44, 'Vascooo', '2000-10-25', '(19) 99999-9999', 'vascooo@gmail.com', 'gMo@2510'),
(45, 'ka', '1999-01-19', '(19) 65631-6465', 'kanglindo@gmail.com', 'Seenamora90@'),
(46, 'k', '2002-09-20', '(11) 15215-6468', 'kaio@gmail.com', 'Kaio123@#');

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
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `sugestao`
--
ALTER TABLE `sugestao`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
