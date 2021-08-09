import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptParcel: Scalars['Boolean'];
  triggerLogin: Scalars['Boolean'];
  login?: Maybe<User>;
  register: Scalars['Boolean'];
};


export type MutationAcceptParcelArgs = {
  id: Scalars['String'];
};


export type MutationTriggerLoginArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  findOwners?: Maybe<Array<User>>;
  findOwnersByImage: Array<User>;
  currentUser: User;
  isAuthenticated: Scalars['Boolean'];
};


export type QueryFindOwnersArgs = {
  lastname: Scalars['String'];
  firstname: Scalars['String'];
};


export type QueryFindOwnersByImageArgs = {
  filename: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  street: Scalars['String'];
  houseNumber: Scalars['String'];
  postalCode: Scalars['String'];
  floor: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  floor?: Maybe<Scalars['Float']>;
};

export type AcceptParcelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AcceptParcelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptParcel'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'lastname' | 'firstname' | 'floor'>
  ) }
);

export type LoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'floor'>
  )> }
);

export type FindOwnersByImageQueryVariables = Exact<{
  filename: Scalars['String'];
}>;


export type FindOwnersByImageQuery = (
  { __typename?: 'Query' }
  & { findOwnersByImage: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname'>
  )> }
);

export type FindOwnersQueryVariables = Exact<{
  firstname: Scalars['String'];
  lastname: Scalars['String'];
}>;


export type FindOwnersQuery = (
  { __typename?: 'Query' }
  & { findOwners?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'floor'>
  )>> }
);

export type RegisterUserMutationVariables = Exact<{
  data: RegisterUserInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type TriggerLoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type TriggerLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'triggerLogin'>
);


export const AcceptParcelDocument = gql`
    mutation acceptParcel($id: String!) {
  acceptParcel(id: $id)
}
    `;
export type AcceptParcelMutationFn = Apollo.MutationFunction<AcceptParcelMutation, AcceptParcelMutationVariables>;

/**
 * __useAcceptParcelMutation__
 *
 * To run a mutation, you first call `useAcceptParcelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptParcelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptParcelMutation, { data, loading, error }] = useAcceptParcelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptParcelMutation(baseOptions?: Apollo.MutationHookOptions<AcceptParcelMutation, AcceptParcelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptParcelMutation, AcceptParcelMutationVariables>(AcceptParcelDocument, options);
      }
export type AcceptParcelMutationHookResult = ReturnType<typeof useAcceptParcelMutation>;
export type AcceptParcelMutationResult = Apollo.MutationResult<AcceptParcelMutation>;
export type AcceptParcelMutationOptions = Apollo.BaseMutationOptions<AcceptParcelMutation, AcceptParcelMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    lastname
    firstname
    floor
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation login($token: String!) {
  login(token: $token) {
    id
    firstname
    lastname
    floor
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FindOwnersByImageDocument = gql`
    query findOwnersByImage($filename: String!) {
  findOwnersByImage(filename: $filename) {
    id
    firstname
    lastname
  }
}
    `;

/**
 * __useFindOwnersByImageQuery__
 *
 * To run a query within a React component, call `useFindOwnersByImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOwnersByImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOwnersByImageQuery({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useFindOwnersByImageQuery(baseOptions: Apollo.QueryHookOptions<FindOwnersByImageQuery, FindOwnersByImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOwnersByImageQuery, FindOwnersByImageQueryVariables>(FindOwnersByImageDocument, options);
      }
export function useFindOwnersByImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOwnersByImageQuery, FindOwnersByImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOwnersByImageQuery, FindOwnersByImageQueryVariables>(FindOwnersByImageDocument, options);
        }
export type FindOwnersByImageQueryHookResult = ReturnType<typeof useFindOwnersByImageQuery>;
export type FindOwnersByImageLazyQueryHookResult = ReturnType<typeof useFindOwnersByImageLazyQuery>;
export type FindOwnersByImageQueryResult = Apollo.QueryResult<FindOwnersByImageQuery, FindOwnersByImageQueryVariables>;
export const FindOwnersDocument = gql`
    query findOwners($firstname: String!, $lastname: String!) {
  findOwners(firstname: $firstname, lastname: $lastname) {
    id
    firstname
    lastname
    floor
  }
}
    `;

/**
 * __useFindOwnersQuery__
 *
 * To run a query within a React component, call `useFindOwnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOwnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOwnersQuery({
 *   variables: {
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *   },
 * });
 */
export function useFindOwnersQuery(baseOptions: Apollo.QueryHookOptions<FindOwnersQuery, FindOwnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOwnersQuery, FindOwnersQueryVariables>(FindOwnersDocument, options);
      }
export function useFindOwnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOwnersQuery, FindOwnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOwnersQuery, FindOwnersQueryVariables>(FindOwnersDocument, options);
        }
export type FindOwnersQueryHookResult = ReturnType<typeof useFindOwnersQuery>;
export type FindOwnersLazyQueryHookResult = ReturnType<typeof useFindOwnersLazyQuery>;
export type FindOwnersQueryResult = Apollo.QueryResult<FindOwnersQuery, FindOwnersQueryVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($data: RegisterUserInput!) {
  register(data: $data)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const TriggerLoginDocument = gql`
    mutation triggerLogin($email: String!) {
  triggerLogin(email: $email)
}
    `;
export type TriggerLoginMutationFn = Apollo.MutationFunction<TriggerLoginMutation, TriggerLoginMutationVariables>;

/**
 * __useTriggerLoginMutation__
 *
 * To run a mutation, you first call `useTriggerLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTriggerLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [triggerLoginMutation, { data, loading, error }] = useTriggerLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useTriggerLoginMutation(baseOptions?: Apollo.MutationHookOptions<TriggerLoginMutation, TriggerLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TriggerLoginMutation, TriggerLoginMutationVariables>(TriggerLoginDocument, options);
      }
export type TriggerLoginMutationHookResult = ReturnType<typeof useTriggerLoginMutation>;
export type TriggerLoginMutationResult = Apollo.MutationResult<TriggerLoginMutation>;
export type TriggerLoginMutationOptions = Apollo.BaseMutationOptions<TriggerLoginMutation, TriggerLoginMutationVariables>;