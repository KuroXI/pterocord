[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/KuroXI/pterocord">
    <img src="images/project_image.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">PTEROCORD</h3>

  <p align="center">
    Pterocord is a tool for managing and monitoring servers.
  </p>
</div>

## About the project
Pterocord aims to check the status of a server using Discord. The bot can also be used to remotely control the server and make changes to its settings.

## Features
- Remote control of the server, including the ability to start, stop, and restart server
- The ability to send commands to the server and modify its configuration
- The ability to rename the server and reinstall its system

## Commands
- The `/bind` command, which allows you to store your API key and access your servers
- The `/servers` command, which lists all of the servers that are available to you

## Button Commands
`Server Stats`: Check the current status of the server\
`Power Button`: Start, stop, or restart the server\
`Send Command`: Send a command to the server\
`Rename Server`: Change the name of the server\
`Reinstall Server`: Reinstall the operating system on the server

## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/KuroXI/pterocord.git
```
2. Install the dependencies:
```bash
npm install
```
3. Set up the TOKEN key and GUILD ID for your bot in the `config.json` file
4.Run the bot:
```bash
node index.js
```

## Contributing
I'm open to contributions to this project. If you have an idea for a new feature or find a bug, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See `LICENSE.txt` for more details.

[contributors-shield]: https://img.shields.io/github/contributors/KuroXI/pterocord.svg?style=for-the-badge
[contributors-url]: https://github.com/KuroXI/pterocord/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/KuroXI/pterocord.svg?style=for-the-badge
[forks-url]: https://github.com/KuroXI/pterocord/network/members
[stars-shield]: https://img.shields.io/github/stars/KuroXI/pterocord.svg?style=for-the-badge
[stars-url]: https://github.com/KuroXI/pterocord/stargazers
[issues-shield]: https://img.shields.io/github/issues/KuroXI/pterocord.svg?style=for-the-badge
[issues-url]: https://github.com/KuroXI/pterocord/issues
[license-shield]: https://img.shields.io/github/license/KuroXI/pterocord.svg?style=for-the-badge
[license-url]: https://github.com/KuroXI/pterocord/blob/main/LICENSE