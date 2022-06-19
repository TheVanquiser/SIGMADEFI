import Time "mo:base/Time";
import Account "./Account";

module {

    public type Token = Principal;

    public type TokenId = Nat64;
    
    // ledger types
    public type Operation = {
        #approve;
        #mint;
        #transfer;
        #transferFrom;
    };

 
    public type TransactionStatus = {
        #succeeded;
        #failed;
    };

    public type TxRecord = {
        caller: ?Principal;
        op: Operation; // operation type
        index: Nat; // transaction index
        from: Principal;
        to: Principal;
        amount: Nat;
        fee: Nat;
        timestamp: Time.Time;
        status: TransactionStatus;
    };

    // Dip20 token interface
    public type TxReceipt = {
        #Ok: Nat;
        #Err: {
            #InsufficientAllowance;
            #InsufficientBalance;
            #ErrorOperationStyle;
            #Unauthorized;
            #LedgerTrap;
            #ErrorTo;
            #Other;
            #BlockUsed;
            #AmountTooSmall;
        };
    };

    public type Metadata = {
        logo : Text; // base64 encoded logo or logo url
        name : Text; // token name
        symbol : Text; // token symbol
        decimals : Nat8; // token decimal
        totalSupply : Nat; // token total supply
        owner : Principal; // token owner
        fee : Nat; // fee for update calls
    };


    public type DIP20Interface = actor {
        transfer : (Principal,Nat) ->  async TxReceipt;
        transferFrom : (Principal,Principal,Nat) -> async TxReceipt;
        allowance : (owner: Principal, spender: Principal) -> async Nat;
        getMetadata: () -> async Metadata;
    };

    public type LogoResult = {
    logo_type: Text;
    data: Text;
  };

public type Dip721NonFungibleToken = {
    logo: LogoResult;
    name: Text;
    symbol: Text;
    maxLimit : Nat16;
  };

    public type DIP721Interface = actor {
        transfer : (Principal,Nat, TokenId) ->  async TxReceipt;
        transferFrom : (Principal,Principal,Nat, TokenId) -> async TxReceipt;
        allowance : (owner: Principal, spender: Principal) -> async Nat;
        getDip721NonFungibleToken: () -> async Dip721NonFungibleToken;
    };

    public type TransferErr = {
        #BalanceLow;
        #TransferFailure;
    };
    public type TransferReceipt = {
        #Ok: Nat;
        #Err: TransferErr;  
    };
    public type Balance = {
        owner: Principal;
        token: Token;
        amount: Nat;
    };

}