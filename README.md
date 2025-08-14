SignLearn - An Interactive Sign Language Learning Platform 🤟
SignLearn is a user-friendly, web-based platform designed to make learning various sign languages accessible, interactive, and engaging. It features dedicated modules for different sign languages, an interactive alphabet trainer, and gamified quizzes to make learning effective and enjoyable.

## Features

Dedicated Language Modules: Separate, styled landing pages for American Sign Language (ASL), British Sign Language (BSL), and Indian Sign Language (ISL).

Interactive Alphabet Trainer: A full-featured module to learn fingerspelling with high-quality images, clear descriptions, and complete keyboard navigation.

Gamified Quizzes: An interactive quiz for the ISL module that includes a scoring system (XP) and a lives system (Hearts ❤️) to test knowledge and make learning fun.

Local Progress Tracking: Automatically saves your progress in the alphabet module to your browser's local storage, allowing you to pick up where you left off.

Clean & Responsive UI: A modern interface that provides a great user experience on desktops, tablets, and mobile devices.

Accessibility Focused: Built with accessibility in mind, including ARIA labels and keyboard-friendly navigation to ensure all users can learn.

## Tech Stack

This project is built with fundamental web technologies, making it lightweight, fast, and easy to maintain.

HTML5: For the structure and content of all pages.

CSS3: For all styling, layout, and responsive design. Each module has its own dedicated stylesheet.

Vanilla JavaScript (ES6+): For all interactivity, including the alphabet trainer logic, quiz functionality, and DOM manipulation.

## Project Structure

The project is organized into distinct HTML pages, each with its own corresponding CSS and, where necessary, JavaScript file.

├── index.html # Main landing page for language selection
├── style.css # Styles for the landing page
├── main.js # JavaScript for the landing page

├── about.html # About page with project information
├── about.css # Styles for the About page

├── alphabets.html # Interactive alphabet learning module
├── alphabet-style.css # Styles for the alphabet page
├── alphabets.js # JavaScript logic for the alphabet module

├── asl.html # Course page for American Sign Language
├── asl-style.css # Styles for the ASL page

├── bsl.html # Course page for British Sign Language
├── bsl-style.css # Styles for the BSL page

├── isl.html # Course page for Indian Sign Language
├── isl-style.css # Styles for the ISL page

├── isl-Quiz.html # Interactive quiz for the ISL module
├── isl-quiz-style.css # Styles for the ISL quiz
├── isl-quiz.js # JavaScript logic for the ISL quiz

└── README.md # Project documentation

## Getting Started

To get a local copy up and running, follow these simple steps. No complex build tools are needed.

Clone the repository

Bash

git clone https://github.com/your-username/signlearn.git
Navigate to the project directory

Bash

cd signlearn
Open the index.html file in your browser
From the home page, you can navigate to all other sections of the website.

## Future Improvements

This project has a lot of potential for growth. Here are some features planned for the future:

🎥 Video Demonstrations: Incorporate video clips for each sign to show movement and context.

🧠 Spaced Repetition System: Implement an intelligent quiz system that re-tests you on signs you struggle with.

👤 User Accounts: Add user authentication to sync progress and scores across multiple devices.

📈 More Content: Greatly expand the number of lessons, words, and phrases for each language, and add even more sign languages to the platform.

## License

This project is distributed under the MIT License. See LICENSE.txt for more information.
