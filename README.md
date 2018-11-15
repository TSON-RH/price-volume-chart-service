# Project Name

> Project description

## Related Projects


## Table of Contents



## Usage

> Some usage instructions

## Requirements
To start:
  1. Install dependencies: npm install
  2. Start server in terminal: mongo
  3. In a separate tab of terminal, set up database and seed: npm run "npm run db:setup"
  4. Start server in separate tab: "npm start"



## API Routes

 | Route/Endpoint                | Description                            | Method  |
| ----------------------------- |---------------------------------------:| :------:|
| /api/volumes/symbols/:id      | get all data for a single stockid      | GET     |
| /api/volumes/symbols/:id      | delete all data for a single stockid   | DELETE  |
| /api/volumes/symbols/:id      | update data for a single stockid       | PUT     |
| /api/volumes/symbols/new      | add a new stock record                 | POST    |

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### To Start
- Install dependencies
- Start mongodb: "mongo"
- Seed database: run seeding script
- Start server: "npm start"

