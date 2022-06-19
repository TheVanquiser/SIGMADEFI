import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Hash "mo:base/Hash";
import Array "mo:base/Array";

import AID "./util/AccountIdentifier";
import ExtCore "./ext/Core";
import ExtCommon "./ext/Common";
import Ledger "./Ledger";

actor class Multisender (init_admin: Principal) = this {

  type AccountIdentifier = ExtCore.AccountIdentifier;
  type SubAccount = ExtCore.SubAccount;
  type User = ExtCore.User;
  type Balance = ExtCore.Balance;
  type TokenIdentifier = ExtCore.TokenIdentifier;
  type TokenIndex = ExtCore.TokenIndex;
  type TokenId = ExtCore.TokenId;
  type Extension = ExtCore.Extension;
  type CommonError = ExtCore.CommonError;
  
  type BalanceRequest = ExtCore.BalanceRequest;
  type BalanceResponse = ExtCore.BalanceResponse;
  type TransferRequest = ExtCore.TransferRequest;
  type TransferResponse = ExtCore.TransferResponse;
  type TransferDip721Request = ExtCore.TransferDip721Request;
  type TransferDip721Response = ExtCore.TransferDip721Response;
  type DIP20Interface = ExtCore.DIP20Interface;
  type DIP721Interface = ExtCore.DIP721Interface;
  type Metadata = ExtCommon.Metadata;
  type TransferResult = Ledger.TransferResult;
  type TransferArgs = Ledger.TransferArgs;
  type TransferError = Ledger.TransferError;

  type TokenLedger = HashMap.HashMap<AccountIdentifier, Balance>;
  
  private let EXTENSIONS : [Extension] = ["@ext/common"];
  
    
  private stable var _registryState : [(TokenIndex, [(AccountIdentifier, Balance)])] = [];

  private var _registry = HashMap.HashMap<TokenIndex, TokenLedger>(1, Nat32.equal, func(x : Nat32) : Hash.Hash {x});
  Iter.iterate<(TokenIndex, [(AccountIdentifier, Balance)])>(_registryState.vals(), func(x, _index) {
    _registry.put(x.0, HashMap.fromIter(x.1.vals(), 0, AID.equal, AID.hash));
  });
  
 system func preupgrade() {
    Iter.iterate(_registry.entries(), func(x : (TokenIndex, TokenLedger), _index : Nat) {
      _registryState := Array.append(_registryState, [(x.0, Iter.toArray(x.1.entries()))]);
    });
  };
   system func postupgrade() {
   _registryState := [];
   };
     public shared(msg) func transferIcp ( request: TransferArgs) : async TransferResult {
        switch (amount+icp_fee){
            case(null){
                return #Err(#BalanceLow)
            };
            case _ {};
        };

        // Transfer amount back to user
        let icp_reciept =  await Ledger.transfer({
            memo: Nat64    = 0;
            from_subaccount = ?Account.defaultSubaccount();
            to = User;
            amount = { e8s = Nat64.fromNat(amount + icp_fee) };
            fee = { e8s = Nat64.fromNat(icp_fee) };
            created_at_time = ?{ timestamp_nanos = Nat64.fromNat(Int.abs(Time.now())) };
        });

        switch icp_reciept {
            case (#Err e) {
                // add tokens back to user account balance
                addTokens(amount+icp_fee);
                return #Err(#TransferFailure);
            };
            case _ {};
        };
        #Ok(amount)
    };

     public shared(msg) func transferDip20 ( request : TransferRequest) : async TransferResponse {
      if (ExtCore.TokenIdentifier.isPrincipal(request.token, Principal.fromActor(this)) == false) {
			return #err(#InvalidToken(request.token));
		};
    let tokenIndex = ExtCore.TokenIdentifier.getIndex(request.token);
    var tokenBalances = switch(_registry.get(tokenIndex)) {
      case (?balances) balances;
      case (_) return #err(#Unauthorized(request.token));
    };
    let sender = ExtCore.User.toAID(request.from);
    let spender = AID.fromPrincipal(msg.caller, request.subaccount);
    let receiver = ExtCore.User.toAID(request.to);

    switch (Err) {
      case (#Err e) {
        return #err(#InsufficientBalance);
      };
  };

     };


     public shared(msg) func transferdip721 ( request : TransferDip721Request) : async TransferDip721Response {
      if (ExtCore.TokenIdentifier.isPrincipal(request.token, Principal.fromActor(this)) == false) {
			return #err(#InvalidToken(request.token));
		};
    let tokenIndex = ExtCore.TokenIdentifier.getIndex(request.token);
    var tokenBalances = switch(_registry.get(tokenIndex)) {
      case (?balances) balances;
      case (_) return #err(#Unauthorized(request.token));
    };
    let sender = ExtCore.User.toAID(request.from);
    let spender = AID.fromPrincipal(msg.caller, request.subaccount);
    let receiver = ExtCore.User.toAID(request.to);
  };
};