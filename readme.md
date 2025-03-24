<h4 style="text-align:center">
<img src="https://gr3gorywolf.github.io/HardWatch-server/assets/img/icon.png" height="300" width="300" alt="HardWatch Client Logo" />
</h4>

# HardWatch Server
[![GitHub release downloads](https://img.shields.io/github/downloads/Gr3gorywolf/HardWatch-server/total.svg)](https://github.com/Gr3gorywolf/HardWatch-server/releases/latest)
[![Pipeline Status](https://img.shields.io/github/actions/workflow/status/Gr3gorywolf/HardWatch-server/main.yml?label=Pipeline%20Status)](https://github.com/Gr3gorywolf/HardWatch-server/actions)
![GitHub last commit](https://img.shields.io/github/last-commit/Gr3gorywolf/HardWatch-server)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Gr3gorywolf/HardWatch-server?label=latest%20release)

## Overview

**HardWatch Server** is an **NX monorepo** containing both the backend and frontend applications required to run the HardWatch monitoring system.

### Project Structure

```plaintext
HardWatch-server/
│── apps/
│   │── backend/      # Node.js backend server
│   │── frontend/     # React frontend with Tailwind
│── libs/             # Shared libraries
│── dist/             # Compiled output
│── docker/           # Docker configurations
│── config.json       # Server configuration
│── package.json      # Project dependencies
│── nx.json           # NX monorepo configuration
```

### Components

#### **Backend**
- Receives and processes information from **HardWatch Clients**.
- Exposes data via a **REST API** with authentication.
- Hosts a **WebSocket server** to track device availability and execute real-time actions.

#### **Frontend**
- A **React + Tailwind** web dashboard displaying connected devices and their stats.
- Can be served from the backend or a **CDN**.

## Installation

### Running from Release
You can download the latest release from the [Releases page](https://github.com/Gr3gorywolf/HardWatch-server/releases/latest). This includes prebuilt binaries, so you only need to install dependencies and run:
```sh
npm install && node main.js
```

### Running from Source
There are multiple ways to run HardWatch Server from source:

#### **Using Docker**
```sh
# Clone the repository
git clone https://github.com/Gr3gorywolf/HardWatch-server.git
cd HardWatch-server

# Build and run the server
docker-compose up -d --build
```

#### **Without Docker**
```sh
# Install dependencies
pnpm install

# Build the project
npm run build

# Run the backend
node dist/main.js
```

## Configuration

Before running the server, ensure you have a `config.json` file in the root directory with the following format:

```json
{
    "appKey": "<Your App Key>",
    "useFrontendCdn": false
}
```

### Configuration Parameters

| Parameter         | Description |
|------------------|-------------|
| `appKey`        | Authentication key for the server. |
| `useFrontendCdn`| If `true`, the backend will serve the precompiled frontend from the latest release. If `false`, it will serve the local frontend. |

## Development

For local development, clone the repository and run:
```sh
git clone https://github.com/Gr3gorywolf/HardWatch-server.git
cd HardWatch-server
pnpm install && npm run dev
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Links

- **Server Repository**: [HardWatch Server](https://github.com/Gr3gorywolf/HardWatch-server)
- **Client Repository**: [HardWatch Client](https://github.com/Gr3gorywolf/HardWatch-client)
- **Releases**: [Download Latest Version](https://github.com/Gr3gorywolf/HardWatch-server/releases/latest)

