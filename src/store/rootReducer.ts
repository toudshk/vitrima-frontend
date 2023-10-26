import { reducer as applicantReducer } from './user/applicant.slice'
import { reducer as contractorReducer } from './user/contractor.slice'

export const reducers = {
    applicant: applicantReducer,
    contractor: contractorReducer
}