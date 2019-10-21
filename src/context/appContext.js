import React from "react";
import { sessionstore } from "../utilities/store/sessionstore";

const AppContext = React.createContext(null);

const AppContextProvider = (props) => {
  //  console.log("Props in AppContext ",props);
    const [transactionReference,settransactionReference] = React.useState(null);
    const [transactionType,settransactionType] = React.useState(null);    

    const updatetransactionReference = (reference) => {
        settransactionReference(reference);
        sessionstore.set("transactionReference",reference);
    }

    const updatetransactionType = (transType) => {
        settransactionType(transType);
        sessionstore.set("transactionType",transType);
    }

    const gettransactionReference = () => {
        if(sessionstore.get("transactionReference")){
            return sessionstore.get("transactionReference");
        }
       return transactionReference;      
    }

    const gettransactionType = () => {
        if(sessionstore.get("transactionType")){
            return sessionstore.get("transactionType");
        }
       return transactionType;      
    }

    const clearTransaction = () => {
        console.log("Clearing Session");
        settransactionReference(null);
        settransactionType(null);
        sessionstore.clear();
    }

    React.useEffect(() => {
        settransactionReference(gettransactionReference());
        settransactionType(gettransactionType());

        return () => {
            clearTransaction();
        }
    },[]);

    

    const transactioninfo = {
        updatetransactionReference:updatetransactionReference,
        updatetransactionType:updatetransactionType,
        gettransactionReference:gettransactionReference,
        gettransactionType:gettransactionReference,
        transactionReference:transactionReference,
        transactionType:transactionType,
        clearTransaction:clearTransaction
    }

    return (<AppContext.Provider 
               value={transactioninfo}>
        {props.children}
    </AppContext.Provider>);
}

export default ({
    AppContext,
    AppContextProvider
});
