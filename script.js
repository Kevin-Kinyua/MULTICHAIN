    /*
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */

    /* global getParticipantRegistry getAssetRegistry  */
    //getFactory - define it when using


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TRANSIT DISPATCH
/**
*  A transit has been dispatched by an receiver
* @param {org.multichain.TransitDispatch} TransitDispatch - the TransitDispatch transaction
* @transaction
*/

async function dispatch(transitDispatch) {  // eslint-disable-line no-unused-vars

    console.log("DISPATCH DONE", transitDispatch);      //CONSOLE TOTEM TEST
    
        console.log('Dispatched at: ' + transitDispatch.timestamp);
        
    
        //set the status of the transit
        transitDispatch.status = 'IN_TRANSIT';
        
        //Emit an event for the dispatched asset.
    
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TRANSIT RECEIVED

    /**
     *  A transit has been received by an receiver
     * @param {org.multichain.TransitReceive} TransitReceive - the TransitReceive transaction
     * @transaction
    */

   async function Receive(transitReceive) {
        
    console.log("TRANSIT RECEIVED", transitReceive);   //CONSOLE TOTEM TEST - IGNORE

    //const contract = transitReceive.transit.contract;
    //const transit = transitReceive.transit;

    //let payOut = contract.unitPrice * transit.unitCount;
  	
    console.log('Received at: ' + transitReceive.timestamp);
    console.log("RECEIVAL EVENT"); 

    console.log('Transit arrivalDateTime: ' + transitReceive.arrivalDateTime);

    // set the status of the transit
    transitReceive.TransitStatus = 'ARRIVED';

    // update the state of the transit
    // const transitRegistry = await getAssetRegistry('org.multichain.Transit');
    // await transitRegistry.update(transit);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ACCOUNT TRANSACTION

/**
 * Perform a deposit, withdrawal and transfers from a company account
 * @param {org.multichain.AccountTransaction} transaction
 * @transaction
 */

// Update on progess regarding this
function execTransaction(transaction) {   

    console.log("FUND TRANSACTION", transaction);      //CONSOLE TOTEM TEST
    
    // initialize array of transactions if none exist

    if(transaction.account.transactions == null) {
        transaction.account.transactions = [];
    }

    // determine whether this is a deposit, withdrawal or transfer and execute accordingly

    if(transaction.operation == 'Withdraw') {
        transaction.industry.account.balance -= transaction.amount;
    } else if(transaction.operation == 'Deposit') {
        transaction.industry.account.balance += transaction.amount;
    }

    //define soon
    // else if (transaction.operation == 'Transfer'){
    //     transaction.Industry.account.balance -= transaction.amount;
    // }

    // add the current transaction to the bank account's transaction history
    transaction.account.transactions.push(transaction);

    //update the registry (undefined)
    return getAssetRegistry('org.multichain.participant.Account')
    .then(function(regAccount) {
        return regAccount.update(transaction.participant.Account);
    });
}