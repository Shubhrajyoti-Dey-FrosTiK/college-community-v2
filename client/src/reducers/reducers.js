import * as actions from '../constants/action-types.js'

let lastID=0;
export default function reducer(state=[],action){
    
    if(action.type==actions.ADD_BUG){
        return [
            // This action will make a copy of the current state 
            ...state,
            {
                // Now we will modify the data 
                id:++lastID,
                description:action.payload.description,
                resolved:false
            }
        ];
    }
    else if(action.type==actions.EDIT_BUG){
        // return state.filter(bug => bug.id != action.payload.id ? bug : {...bug, resolved:true})
        return state.map(todo => {
            if (todo.id === action.payload.id) {
                console.log(todo.resolved);
                todo.resolved=true
                return todo
            }else{return todo}
        })
    }
    else if(action.type==actions.DELETE_BUG){
        // return state.filter(bug => bug.id != action.payload.id ? bug : {...bug, resolved:true})
        return state.map(todo => {
            if (todo.id !== action.payload.id) {
                return todo
            }
        })
    }
    return state;
}