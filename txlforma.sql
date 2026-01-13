-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 14 jan. 2026 à 00:49
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `txlforma`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `emargement`
--

CREATE TABLE `emargement` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `session_id` bigint(20) NOT NULL,
  `utilisateur_id` bigint(20) NOT NULL,
  `signe_par_participant` bit(1) NOT NULL,
  `valide_par_intervenant` bit(1) NOT NULL,
  `signature` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `id` bigint(20) NOT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `duree` varchar(255) DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `prix` float NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `intervenant_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`id`, `categorie`, `description`, `duree`, `lieu`, `prix`, `titre`, `intervenant_id`) VALUES
(22, 'Développement Web', 'Apprendre à créer des interfaces modernes avec React et Hooks.', '35', 'Distanciel', 440, 'Développement Web React', 24),
(23, 'Design', 'Maîtriser Figma et les principes de l\'expérience utilisateur.', '21', 'Distanciel', 312, 'Design UI/UX Expert', 25),
(24, 'Marketing', 'Optimiser la visibilité de son site sur Google.', '14', 'Distanciel', 180, 'Marketing Digital & SEO', 26),
(32, '3D', 'Modéliser des objets simples sur le logiciel Blender.', '10', 'Distanciel', 356, 'Modélisation 3D', 34);

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id` bigint(20) NOT NULL,
  `date_inscription` datetime(6) DEFAULT NULL,
  `note_finale` double DEFAULT NULL,
  `statut_inscription` varchar(255) DEFAULT NULL,
  `statut_paiement` varchar(255) DEFAULT NULL,
  `paiement_id` bigint(20) DEFAULT NULL,
  `session_id` bigint(20) NOT NULL,
  `utilisateur_id` bigint(20) NOT NULL,
  `progression` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `intervenant`
--

CREATE TABLE `intervenant` (
  `id` bigint(20) NOT NULL,
  `heures_realisees` int(11) NOT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `utilisateur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `intervenant`
--

INSERT INTO `intervenant` (`id`, `heures_realisees`, `specialite`, `statut`, `utilisateur_id`) VALUES
(24, 0, 'Expert Fullstack React', 'ACTIF', 31),
(25, 0, 'Senior Designer UI', 'ACTIF', 33),
(26, 0, 'Consultant SEO/Web', 'ACTIF', 32),
(34, 0, 'Modélisation 3D', 'ACTIF', 34),
(40, 0, 'Expert Fullstack React', 'ACTIF', 35);

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` bigint(20) NOT NULL,
  `date_paiement` datetime(6) DEFAULT NULL,
  `montant` float NOT NULL,
  `moyen_paiement` varchar(255) DEFAULT NULL,
  `transactionid` varchar(255) DEFAULT NULL,
  `methode` varchar(255) DEFAULT NULL,
  `reference_transaction` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `session_formation`
--

CREATE TABLE `session_formation` (
  `id` bigint(20) NOT NULL,
  `date_debut` datetime(6) DEFAULT NULL,
  `date_fin` datetime(6) DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `nb_places` int(11) NOT NULL,
  `formation_id` bigint(20) NOT NULL,
  `intervenant_id` bigint(20) DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `lien_visio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `session_formation`
--

INSERT INTO `session_formation` (`id`, `date_debut`, `date_fin`, `etat`, `nb_places`, `formation_id`, `intervenant_id`, `prix`, `lieu`, `lien_visio`) VALUES
(40, '2026-01-19 13:45:00.000000', '2026-01-19 15:45:00.000000', 'PLANIFIEE', 15, 22, 24, 110, NULL, NULL),
(41, '2026-01-22 13:45:00.000000', '2026-01-22 13:45:00.000000', 'PLANIFIEE', 15, 22, 24, 110, NULL, NULL),
(42, '2026-01-24 13:45:00.000000', '2026-01-24 15:45:00.000000', 'PLANIFIEE', 15, 22, 24, 110, NULL, NULL),
(43, '2026-02-01 13:45:00.000000', '2026-02-01 13:45:00.000000', 'PLANIFIEE', 15, 22, 24, 110, NULL, NULL),
(44, '2026-03-09 16:00:00.000000', '2026-03-09 18:00:00.000000', 'PLANIFIEE', 8, 23, 25, 78, NULL, NULL),
(45, '2026-03-12 16:00:00.000000', '2026-03-12 18:00:00.000000', 'PLANIFIEE', 8, 23, 25, 78, NULL, NULL),
(46, '2026-03-16 16:00:00.000000', '2026-03-16 18:00:00.000000', 'PLANIFIEE', 8, 23, 25, 78, NULL, NULL),
(47, '2026-03-19 16:00:00.000000', '2026-03-19 18:00:00.000000', 'PLANIFIEE', 8, 23, 25, 78, NULL, NULL),
(48, '2026-10-04 17:00:00.000000', '2026-10-04 18:00:00.000000', 'PLANIFIEE', 25, 24, 26, 45, NULL, NULL),
(49, '2005-10-05 17:00:00.000000', '2005-10-05 18:00:00.000000', 'PLANIFIEE', 25, 24, 26, 45, NULL, NULL),
(50, '2026-10-08 17:00:00.000000', '2026-10-08 18:00:00.000000', 'PLANIFIEE', 25, 24, 26, 45, NULL, NULL),
(51, '2026-04-12 17:00:00.000000', '2026-04-12 18:00:00.000000', 'PLANIFIEE', 25, 24, 26, 45, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

CREATE TABLE `statistiques` (
  `id` bigint(20) NOT NULL,
  `chiffre_affaire` float NOT NULL,
  `nb_participants` int(11) NOT NULL,
  `periode` varchar(255) DEFAULT NULL,
  `taux_reussite` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` bigint(20) NOT NULL,
  `adresse_postale` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `entreprise` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `adresse_postale`, `email`, `entreprise`, `nom`, `prenom`, `pseudo`, `role`, `telephone`, `password`) VALUES
(2, NULL, 'admin@test.fr', NULL, 'Admin', NULL, NULL, 'ADMIN', NULL, '{noop}pass'),
(17, '15 Rue des Boulevards', 'sarah@test.fr', '', 'Zaiem', 'Sarah', 'Saraya', 'PARTICIPANT', '0977373773', '{noop}pass'),
(28, '27 Rue Sebastopol', 'nicolas@test.fr', '', 'Buisset', 'Nicolas', 'Nicra', 'PARTICIPANT', '0765837020', 'pass'),
(31, 'IUT de Meaux', 'laroussi@test.fr', 'Gustave Eiffel', 'Laroussi', 'Reda', 'Laroussi', 'INTERVENANT', '0789457310', 'pass'),
(32, 'IUT de Meaux ', 'guyanne@test.fr', 'Gustave Eiffel', 'Guyanne', 'Channam', 'Shnvm', 'INTERVENANT', '0678987610', 'pass'),
(33, 'Avenue DuPont', 'vero@test.fr', 'Freelance', 'Vero', 'Fiona', 'Vero', 'INTERVENANT', '0657378319', 'pass'),
(34, 'IUT de Meaux ', 'alex@test.fr', 'Gustave Eiffel', 'Louise', 'Alexandrine', 'Louise', 'INTERVENANT', '0789678734', 'pass'),
(35, 'IUT de Meaux', 'tir@test.fr', 'Gustave Eiffel', 'Tir', 'Fouad', 'Fouad', 'INTERVENANT', '0756763428', 'pass');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `emargement`
--
ALTER TABLE `emargement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKm8ypwcwroxo311iigy29e60lf` (`session_id`),
  ADD KEY `FK46ubwfjp284y5vtei221lf5yo` (`utilisateur_id`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_formation_intervenant` (`intervenant_id`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK2v92la230he1hefnq1xljqa8w` (`paiement_id`),
  ADD KEY `FK82v12jnan0u2h5j51emq2uwda` (`session_id`),
  ADD KEY `FKes0mtg0xssltfgqc6p8evlxpy` (`utilisateur_id`);

--
-- Index pour la table `intervenant`
--
ALTER TABLE `intervenant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6sb9hgoilhdr0y9jsq96k5efw` (`utilisateur_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `session_formation`
--
ALTER TABLE `session_formation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKifvwsp4kg8086jk5vg43c1fuw` (`formation_id`),
  ADD KEY `FKkubrfc2k5rbpm0vhrhiy0y78k` (`intervenant_id`);

--
-- Index pour la table `statistiques`
--
ALTER TABLE `statistiques`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `emargement`
--
ALTER TABLE `emargement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT pour la table `intervenant`
--
ALTER TABLE `intervenant`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT pour la table `session_formation`
--
ALTER TABLE `session_formation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `statistiques`
--
ALTER TABLE `statistiques`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `emargement`
--
ALTER TABLE `emargement`
  ADD CONSTRAINT `FK46ubwfjp284y5vtei221lf5yo` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `FKm8ypwcwroxo311iigy29e60lf` FOREIGN KEY (`session_id`) REFERENCES `session_formation` (`id`);

--
-- Contraintes pour la table `formation`
--
ALTER TABLE `formation`
  ADD CONSTRAINT `fk_formation_intervenant` FOREIGN KEY (`intervenant_id`) REFERENCES `intervenant` (`id`);

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `FK82v12jnan0u2h5j51emq2uwda` FOREIGN KEY (`session_id`) REFERENCES `session_formation` (`id`),
  ADD CONSTRAINT `FKes0mtg0xssltfgqc6p8evlxpy` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `FKfcww64dudvq9pgawbc7myrblr` FOREIGN KEY (`paiement_id`) REFERENCES `paiement` (`id`);

--
-- Contraintes pour la table `intervenant`
--
ALTER TABLE `intervenant`
  ADD CONSTRAINT `FKgvjxh2lbiosb88d04bdj0hqt6` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `session_formation`
--
ALTER TABLE `session_formation`
  ADD CONSTRAINT `FKifvwsp4kg8086jk5vg43c1fuw` FOREIGN KEY (`formation_id`) REFERENCES `formation` (`id`),
  ADD CONSTRAINT `FKkubrfc2k5rbpm0vhrhiy0y78k` FOREIGN KEY (`intervenant_id`) REFERENCES `intervenant` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
