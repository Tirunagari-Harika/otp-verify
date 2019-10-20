export const sessionstore = {
    sessionStore: {},

    get: function (key){
        if(!sessionStorage){
            return this.sessionStore[key];
        }
        return sessionStorage.getItem(key);
    },

    set: function (key,val){
        if(!sessionStorage){
            this.sessionStore[key] = val;
        }else{
            sessionStorage.setItem(key,val);
        }

    },

    clear: function(){
        this.sessionStore = {};
        sessionStorage.clear();
    }

}
