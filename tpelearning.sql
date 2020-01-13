-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-01-2020 a las 02:06:36
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
  `fecha_post` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
-- Estructura de tabla para la tabla `soluciones_usuario`
--

CREATE TABLE `soluciones_usuario` (
  `id_solucion` varchar(200) NOT NULL,
  `id_user_solucion` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0',
  `respuesta` varchar(200) DEFAULT 'Respuesta Pendiente'
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
(1, 'juancito', 'juacito@gmail.com', 0, '81dc9bdb52d04dc20036dbd8313ed055', 0, 1123953136, 4, 'd03d2d37-d34f-4fdb-9b59-e3d2d0a886bb');

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
-- Indices de la tabla `soluciones_usuario`
--
ALTER TABLE `soluciones_usuario`
  ADD UNIQUE KEY `id_user_solucion` (`id_user_solucion`,`id_post`);

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
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
