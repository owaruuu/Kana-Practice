# Hiragana & Katakana practice and learning

> This is a WebApp for learning and practicing the Japanese letters, Hiragana and Katakana, made with Vanilla JS.
> Live demo hosted with github pages [_here_](https://owaruuu.github.io/kanapractice/).

# Test App

-   [https://owaruuu.github.io/kanapractice/](https://owaruuu.github.io/kanapractice/)

## Table of Contents

-   [General Info](#general-information)
-   [Updates](#updates)
-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Usage](#usage)
-   [Project Status](#project-status)
-   [Room for Improvement](#room-for-improvement)
-   [Acknowledgements](#acknowledgements)
-   [Contact](#contact)
<!-- * [Screenshots](#screenshots) -->

## General Information

-   Made this WebApp after learning the basics of Web Development on [_The Odin Project_](https://www.theodinproject.com/paths), using another [page](https://kana-quiz.tofugu.com) as the basis for the Practice page and my own knowledge from programming in Unity C#. I added a learning page after learning a little more.
-   We needed our own solution so that students could learn and practice Hiragana and Katakana before taking our Japanese classes.
-   I also wanted to test what I just learned and see if I could make a WebApp in two weeks time.

## Updates

-   25 november 2024 (0.9.3): Page is now divided into Modules and packed with Webpack, functionality remains mostly the same.

## Technologies Used

-   Vainilla JS
-   ES6 Modules
-   Webpack

## Features

-   Learn Hiragana and Katakana from 0
-   Works on Desktop and Mobile
-   Highly customize the things you want to learn
-   Quickly randomize the set of Kanas you are practicing

<!-- ## Screenshots
![Example screenshot](./img/screenshot.png) -->
<!-- If you have screenshots you'd like to share, include them here. -->

## Usage

After entering the app [_here_](https://owaruuu.github.io/kanapractice/) you have two options: Learn or Practice.
The Learn Page lets you choose which Kana you want to learn about, if you select more than one the app will show you each set you selected one by one, first as a lesson and then a small quiz. From there you can continue to the next set or repeat what you just saw.

In the Practice Page you select with Kana you want to practice and then the app randomizes them into cards, you must input the correct Romaji for every Kana, if you input an incorrect answer the card turns red and lets you input again until you enter the correct answer turning green and changing the focus to the next available card. At any moment you can choose to start over the current set, randomized, or go back to selecting which Kanas you want to practice.

## Project Status

Project is: _in progress_

## Room for Improvement

Even though the app is functional there's lots of things I want to improve upon or add until I feel happy with it.

Room for improvement:

-   Make it so it's easy to change the color schemes internally so that the page matches the "colors" of the Events we celebrate through out the year: Hinamatsuri, Kodomo No Hi, Tanabata and Hanami.
-   First time user experience, be it so that people that don't know whats possible in the App understand how to use it and so that people that don't know anything about Japanese language understand how to learn it inside the App.
-   Accept more than one answer on the Practice Page, there are some Kana that can be written in two or more ways, right now the app only accepts one hardcoded answer that the user may be not accustomed to.
-   ~~Refactor code, as most was written in a rush to complete it within two weeks.~~
-   Rework homepage look.

To do:

-   Add page that explains how Kanas and Japanese language in general work
-   Add english and other languages options
-   ~~Deselect card on page click on Practice Page~~
-   Make it so click on a card selects the input
-   ~~Make it so if you fail 3 times in the Practice Page a hint or the answer shows up~~
-   Add a stats page after finishing on the Practice Page
-   Add more feedback to the Practice Page
-   Add url changes between pages
-   Add a go back button to return to the Additional info in a Kana set in the learning page
-   Add a animation to the info tip bar so that it transforms into a circle when no info is available
-   Add animation when you get the correct Kana in the Quiz
-   Finish adding kana tip infos
-   ~~Add this Readme~~
-   ~~Add git repository link to webapp~~

## Acknowledgements

-   This project was inspired by [This Page](https://kana-quiz.tofugu.com)
-   This project was made after learning the basics at [The Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations).

## Contact

Created by [@owaruuu](https://www.instagram.com/owaruuu/) - feel free to contact me!
