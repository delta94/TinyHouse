import { gql } from "apollo-boost";

export const LOG_IN = gql`
    mutation LogIn($input: LogInInput) {
        LogIn(input: $input) {
            id
            token
            avatar
            hasWallet
            didRequest
        }
    }
`;