---
runme:
  id: 01HNJK1KRTM71HKCSVTF43JEW3
  version: v2.2
---

# Cahier des Charges Techniques Buzz'Up

- [Cahier des Charges Techniques Buzz'Up](#cahier-des-charges-techniques-buzzup)
   - [1. Introduction](#1-introduction)

      - [1.1 Objectif du Document](#11-objectif-du-document)
      - [1.2 Portée du Projet](#12-portée-du-projet)

   - [2. Spécifications Techniques](#2-spécifications-techniques)

      - [2.1 Architecture Système](#21-architecture-système)


      - [2.2 Choix Technologiques](#22-choix-technologiques)
      - [2.3 Interfaces Système](#23-interfaces-système)

   - [3. Développement](#3-développement)

      - [3.1 Gestion de Version](#31-gestion-de-version)
      - [3.2 Normes de Codage](#32-normes-de-codage)

   - [4. Déploiement et Maintenance](#4-déploiement-et-maintenance)

      - [4.1 Environnements](#41-environnements)
      - [4.2 CI/CD](#42-cicd)

   - [5. Features](#5-features)
      - [Exemple de plannification de taches](#exemple-de-plannification-de-taches)
      - [Liste des Fonctionnalités du Projet](#liste-des-fonctionnalités-du-projet)
      - [Temps Estimé par Tâches](#temps-estimé-par-tâches)
      - [Scope Défini](#scope-défini)
      - [Priorité Définie](#priorité-définie)
      - [Date de Fin](#date-de-fin)
      - [Timeline](#timeline)

   - [6. Conclusion](#6-conclusion)



## 1. Introduction

### 1.1 Objectif du Document

### 1.2 Portée du Projet

## 2. Spécifications Techniques

### 2.1 Architecture Système

### 2.2 Choix Technologiques

- Langages de Programmation : JS
- Frameworks et Bibliothèques : React, Sass
- Outils de Développement : VSCode, Git

| Technologie           | Avantages                                      | Inconvénients                                 |
| --------------- | ---------------------------------------------- | --------------------------------------------- |
| JavaScript      | - Large adoption et communauté active           | - Gestion asynchrone peut être complexe       |
| React           | - Développement via les composants et aisance chez tous les developpeurs      | - Courbe d'apprentissage pour les débutants   |
| Sass            | - Préprocesseur CSS offrant des fonctionnalités avancées | - Nécessite une étape de compilation         |




| Technologie | Documentation | Popularité | Performance | Connaissance | Total (sur 5) |
|-------------|---------------|------------|-------------|--------------|--------------|
| JavaScript  | 4             | 5          | 4           | 5            | 4.5        |
| React       | 5             | 5          | 4           | 4            | 4.5      |
| Sass        | 4             | 3          | 4           | 3            | 3.5       |


### 2.3 Interfaces Système

## 3. Développement

### 3.1 Gestion de Version

Github sera utilisé comme outil de gestion de version. Pour pouvoir contribuer, chaque personne de la partie prenante se doit de suivre et de respecter les normes et stratégies de branching : Git flow.

| Branche                 | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| prod                    | Dernier changement de code qui a été déployé en production   |
| main                    | Dernier changement de code qui a été fusionné. Ceci est la prochaine sortie |
| hotfix/nom-de-branche   | Branche utilisée pour les changements urgents qui ne peuvent pas attendre la prochaine sortie |
| features/nom-de-branche | Stade de développement d'une nouvelle fonctionnalité          |
| bugfix/nom-de-branche   | Utile pour fixer un bug. Contrairement à hotfix, les changements peuvent attendre la prochaine sortie |
| maintain/nom-de-branche | Utile pour la maintenance, le refactoring ou la mise à jour de version |

La branche main doit être considérée comme origin/master et sera la branche principale où le code source de HEAD reflète toujours un état avec les derniers changements de développement livrés pour la prochaine version. En tant que développeur, vous ferez des branchements et des fusions à partir de main.
Vous n’êtes pas autorisé à faire des fusions ou de travailler directement sur la branche main afin d’éviter tout problème de conflits. Pour pouvoir fusionner sur la branche principale, vous devez demander une revue de code à Audrey Rasolonjatovo (@arasolonjatovo). Pour cela, une fois avoir pousser votre branche, rendez vous sur https://github.com/arasolonjatovo/buzz_up/pulls. Un encadré vous proposera de comparer et fusionner votre branche “Compare & pull request”. Complétez les différents champs et en haut à droite de votre page se trouvent les boutons d’assignement. Veuillez vous assigner sur ‘Assignees’ et assigner arasolonjatovo et appuyer sur ‘Create pull request’.

### 3.2 Normes de Codage

- **Variables**

Utilisez des noms de variables qui sont explicites et prononçables
Faciliter la lecture et la compréhension rapide de votre code, limitez les noms de variables trop floues ou incompréhensibles.

Bad practice

const yyyymmdstr = moment().format("YYYY/MM/DD");

Good practice

const currentDate = moment().format("YYYY/MM/DD");

- **Fonctions**

   - **Arguments de fonctions**

Limiter le nombre de paramètres de fonction est extrêmement important car cela facilite le test de votre fonction. En avoir plus de trois conduit à une explosion combinatoire où vous devez tester des tonnes de cas différents avec chaque argument séparé. Au maximum 2 ou moins.

- **Les fonctions doivent faire une seule chose**

C'est de loin la règle la plus importante en ingénierie logicielle. Lorsque les fonctions font plus d'une chose, elles sont plus difficiles à composer, à tester et à raisonner. Alors on se cantonne à une seule chose par fonction.

- **Les noms de fonction doivent dire ce qu’elles font**
- 

Pour bien nommer vos fonctions, une seule règle pour le faire verbe + nom et être le plus explicite possible sur ce qu’elles font.

Bad practice

function addToDate(date, mois) { // ...
}
const date = new Date() ;
// Il est difficile de dire, à partir du nom de la fonction, ce qui est ajouté
addToDate(date, 1) ;

Good practice

function addMonthToDate(month, date) { // ...
}
const date = new Date() ; addMonthToDate(1, date) ;

- **Quelques conseils en plus**

   - Ne pas dupliquer son code. Il faut trouver un moyen de soit créer un composant s’il est trop répété à un endroit ou bien de créer une fonction et appeler setter fonction. DRY (Don’t Repeat Yourself) est votre ami...pas votre ennemi
   - Faire attention à la dette de développement. Ne prenez pas de raccourcis et documentez votre code afin de ne pas rallonger le temps de compréhension des personnes qui repasseront sur votre code
   - Garder les choses simples. Pas besoin de rajouter du code pour rajouter du code et de compliquer les choses. Les choses simples sont les meilleures alors KISS (Keep It Simple & Stupid).

## 4. Déploiement et Maintenance

### 4.1 Environnements

Deux environnements sont en places :
- Environnement de développement : espace dédié à la création et à la validation de nouvelles fonctionnalités, de correctifs de bogues et de tout autre changement de code. Les développeurs travaillent dans cet environnement pour élaborer des solutions, tester des idées et s'assurer que les modifications apportées fonctionnent correctement dans un environnement isolé. Cela permet d'itérer rapidement sur le code sans affecter l'environnement de production.
- Envrionnement de production : version active de l'application ou du service accessible par les utilisateurs finaux. C'est l'environnement dans lequel les versions stables et testées du code sont déployées pour fournir des fonctionnalités et des services aux utilisateurs réels. La stabilité, la sécurité et la performance sont des priorités dans cet environnement.

### 4.2 CI/CD

La gestion efficace des environnements de développement et de production est soutenue par des pratiques d'Intégration Continue (CI) et de Déploiement Continu (CD), optimisées par des outils et des processus. L'utilisation d'outils comme GitHub Actions pour l'Intégration Continue permet une validation rapide du code dans l'environnement de développement, garantissant son bon fonctionnement avant d'être fusionné dans la branche principale. Ceci est complété par des processus automatisés de Déploiement Continu, où Firebase Hosting est intégré pour déployer automatiquement les changements dans l'environnement de production dès qu'une modification est fusionnée dans la branche principale. Ces pratiques assurent une gestion efficace du cycle de vie du développement, permettant aux développeurs de travailler en toute confiance dans l'environnement de développement tout en garantissant des déploiements automatisés et stables dans l'environnement de production. 

## 5. Features

- Liste des fonctionnalités du projet.
- Temps estimé par taches
- Scope défini
- Priorité définie
- Date de fin
- Lien du Trello
- Timeline

##### Liste des Fonctionnalités du Projet

1. **Frontend** :

##### Temps Estimé par Tâches

- **Tâche Frontend** :

##### Scope Défini

- **Phase 1** : 
- **Phase 2** : 
- **Phase 3** : 

##### Priorité Définie

1. **Haute** :
2. **Moyenne** : 
3. **Basse** : 

##### Date de Fin

- **Date Prévue** : 18/02/2024

##### Lien du Trello

##### Timeline

## 6. Conclusion