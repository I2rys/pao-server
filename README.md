# Pao Server
Pao server.

## Installation
Github:
```
git clone https://github.com/cspi-git/pao-server
```

NpmJS:
```
npm i mongodb express
```

## Setup
1. Open **index.js** and put your MONGODB url database in **Pao > mongodb**.
2. In your MongoDB make a database called **core** and a collection called **pao.users**.
3. Change the master key in **index.js** which is in **Pao > masterKey**, make sure the master key matches the **Pao > masterKey** in the framework too.

## Usage
```
node index.js
```

## License
MIT © CSPI