import { combineReducers } from "redux";


function LoginReducer(state={Authed:false,userdata:{}},action){
    switch(action.type){
        case "Login":return{...state,userdata:action.userdata,Authed:action.Authed};
        default:return state;
    }

}

 const rootReducer = combineReducers({

    LoginReducer,
})
export default rootReducer