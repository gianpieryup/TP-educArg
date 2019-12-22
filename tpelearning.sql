-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-12-2019 a las 03:44:01
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpelearning`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `descripcion`) VALUES
(1, 'Matematica'),
(2, 'Geometria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id_post` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `enunciado_ejercicio` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `solucion` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `id_usuario_solucion` int(11) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `dislikes` int(11) NOT NULL DEFAULT '0',
  `fecha_post` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `id_usuario`, `id_curso`, `enunciado_ejercicio`, `solucion`, `id_usuario_solucion`, `likes`, `dislikes`, `fecha_post`, `estado`) VALUES
(1, 4, 1, 'un problema de mate', 'NO me salio pero tengo una idea', 0, 0, 0, '0000-00-00 00:00:00', 1),
(2, 4, 1, 'otro de mate 2.0', 'NO me salio pero tengo una idea', 0, 0, 0, '0000-00-00 00:00:00', 1),
(3, 4, 2, 'pob1.png', '', 0, 0, 0, '2019-12-21 21:47:31', 1),
(4, 4, 1, 'pob2.png', 'Uknow', 4, 0, 0, '2019-12-21 21:48:24', 1),
(5, 4, 1, 'pob3.png', 'Uknnow', 4, 0, 0, '2019-12-21 21:49:16', 0),
(6, 4, 1, 'pob4.png', 'Uknow', 4, 0, 0, '2019-12-21 21:49:35', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soluciones_compradas`
--

CREATE TABLE `soluciones_compradas` (
  `id_usuario` int(11) NOT NULL,
  `id_posts` int(11) NOT NULL,
  `token_compra` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mail_usuario` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `permisos_usuario` smallint(6) NOT NULL DEFAULT '0',
  `password_usuario` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `cuenta_confirmada` tinyint(1) NOT NULL DEFAULT '0',
  `telefono_usuario` int(11) NOT NULL,
  `salvavidas` int(11) NOT NULL DEFAULT '0',
  `codigo_mail_usuario` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `mail_usuario`, `permisos_usuario`, `password_usuario`, `cuenta_confirmada`, `telefono_usuario`, `salvavidas`, `codigo_mail_usuario`) VALUES
(3, 'Gianpier', 'admin@gmail.com', 0, '08d6c05a21512a79a1dfeb9d2a8f262f', 0, 1123953136, 0, '2941aa63-31c9-4b42-8400-8fe6bcf3a7bf'),
(4, 'Gianpier Yupanqui', 'gyupanquisalvatierra@gmail.com', 1, '08d6c05a21512a79a1dfeb9d2a8f262f', 0, 1123953136, 0, 'b653a4d8-ee8f-42f6-a726-47ecab190867'),
(5, 'pepilloprueba', 'pepilloprueba@gmail.com', 0, '08d6c05a21512a79a1dfeb9d2a8f262f', 0, 1123953146, 0, '042bfb08-4222-48d6-83b2-2ddcfdb5824e'),
(6, 'juancito', 'juacito@gmail.com', 0, '81dc9bdb52d04dc20036dbd8313ed055', 0, 1123953136, 0, '6270a557-6a33-4093-aec5-4bafdb9b399f'),
(7, 'Prueba', 'prueba@gmail.com', 0, '81dc9bdb52d04dc20036dbd8313ed055', 0, 1123953136, 0, '10527dc0-85bd-42a4-b62d-0f6f9bf12fc1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `soluciones_compradas`
--
ALTER TABLE `soluciones_compradas`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_posts` (`id_posts`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Filtros para la tabla `soluciones_compradas`
--
ALTER TABLE `soluciones_compradas`
  ADD CONSTRAINT `soluciones_compradas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `soluciones_compradas_ibfk_3` FOREIGN KEY (`id_posts`) REFERENCES `posts` (`id_post`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
