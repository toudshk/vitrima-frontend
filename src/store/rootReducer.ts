import { reducer as applicantReducer } from './user/applicant.slice'
import { reducer as contractorReducer } from './user/contractor.slice'
import { reducer as filterReducer } from './work/filter.slice'
import { reducer as chatReducer } from './chat/chat.slice'
export const reducers = {
    applicant: applicantReducer,
    contractor: contractorReducer,
    filter: filterReducer,
    chat: chatReducer
}