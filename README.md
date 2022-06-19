# This project for hackathon supernova in devpost powered by internet computer 

## Feature 

### Multisender
- users can send assets to many recipients at low cost with just one transaction
max 200 recipients

### Create DIP 20 TOKEN
- developers can create dip20 tokens without coding

### Generate NFT / DIP721
- developer can generate thousands of images then mint to nft 

### Buy ICP 
- integration of fiat on ramp with transak users can purchase ICP with credit card payments or otherwise


## Getting Started

### Install 🛠️

```
gitclone https://github.com/TheVanquiser/sigmadefi.git
```

### Install Dependencies

```
npm install 
```

### Run frontend
// deploy to local host http://localhost:3000/
```
npm start 
```

### Run Backend // Configuration file in dfx.json 
// deploy to ic network // mainnet 
``` 
dfx deploy <canister name> --network ic
```

// deploy to local 
```
dfx deploy <canister name>
```