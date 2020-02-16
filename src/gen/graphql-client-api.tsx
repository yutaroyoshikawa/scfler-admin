import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};


export type Geolocation = {
   __typename?: 'Geolocation',
  xIndex?: Maybe<Scalars['Float']>,
  yIndex?: Maybe<Scalars['Float']>,
};

export type GeolocationInput = {
  xIndex?: Maybe<Scalars['Float']>,
  yIndex?: Maybe<Scalars['Float']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addUser: User,
  deleteUser: User,
  addOrner: Orner,
  updateOrner: Orner,
  addAdmin: User,
  addPost: Post,
  deletePost: Post,
};


export type MutationAddUserArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};


export type MutationAddOrnerArgs = {
  id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  discription?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>
};


export type MutationUpdateOrnerArgs = {
  id: Scalars['ID'],
  email?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  discription?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>
};


export type MutationAddAdminArgs = {
  id: Scalars['ID']
};


export type MutationAddPostArgs = {
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sumbnail?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  ornerId: Scalars['String'],
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>,
  target: TargetInput
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};

export type Orner = {
   __typename?: 'Orner',
  id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  discription?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<Geolocation>,
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sumbnail?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  visitors: Array<Maybe<Visitor>>,
  orner: Orner,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<Geolocation>,
  target: Target,
};

export type Query = {
   __typename?: 'Query',
  myInfo: UserDetails,
  user: UserDetails,
  users: Array<Maybe<User>>,
  orner: Orner,
  orners: Array<Maybe<Orner>>,
  post: Post,
  posts: Array<Maybe<Post>>,
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryOrnerArgs = {
  id: Scalars['ID']
};


export type QueryPostArgs = {
  id: Scalars['ID']
};

export enum Roles {
  Admin = 'admin',
  Orner = 'orner',
  User = 'user'
}

export type Target = {
   __typename?: 'Target',
  ageGroup?: Maybe<Scalars['Int']>,
  gender?: Maybe<Scalars['Int']>,
};

export type TargetInput = {
  ageGroup?: Maybe<Scalars['Int']>,
  gender?: Maybe<Scalars['Int']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  creationDate: Scalars['DateTime'],
  lastModifiedDate?: Maybe<Scalars['DateTime']>,
};

export type UserDetails = {
   __typename?: 'UserDetails',
  id: Scalars['ID'],
  creationDate: Scalars['DateTime'],
  lastModifiedDate?: Maybe<Scalars['DateTime']>,
  role: Roles,
};

export type Visitor = {
   __typename?: 'Visitor',
  visitorName: Scalars['String'],
  discription?: Maybe<Scalars['String']>,
  sumbnail?: Maybe<Scalars['String']>,
};

export type AddAdminMutationVariables = {
  id: Scalars['ID']
};


export type AddAdminMutation = (
  { __typename?: 'Mutation' }
  & { addAdmin: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate'>
  ) }
);

export type AddOrnerMutationVariables = {
  id: Scalars['ID'],
  email: Scalars['String'],
  name: Scalars['String'],
  discription?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>
};


export type AddOrnerMutation = (
  { __typename?: 'Mutation' }
  & { addOrner: (
    { __typename?: 'Orner' }
    & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
    & { location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )> }
  ) }
);

export type AddPostMutationVariables = {
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sumbnail?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  ornerId: Scalars['String'],
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>,
  target: TargetInput
};


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'xIndex' | 'yIndex'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  ) }
);

export type AddUserMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { addUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate'>
  ) }
);

export type DeletePostMutationVariables = {
  id: Scalars['ID']
};


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'xIndex' | 'yIndex'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  ) }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateOrnerMutationVariables = {
  id: Scalars['ID'],
  email?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  discription?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>
};


export type UpdateOrnerMutation = (
  { __typename?: 'Mutation' }
  & { updateOrner: (
    { __typename?: 'Orner' }
    & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
    & { location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )> }
  ) }
);

export type MyInfoQueryVariables = {};


export type MyInfoQuery = (
  { __typename?: 'Query' }
  & { myInfo: (
    { __typename?: 'UserDetails' }
    & Pick<UserDetails, 'id' | 'creationDate' | 'lastModifiedDate' | 'role'>
  ) }
);

export type OrnerQueryVariables = {
  id: Scalars['ID']
};


export type OrnerQuery = (
  { __typename?: 'Query' }
  & { orner: (
    { __typename?: 'Orner' }
    & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
    & { location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )> }
  ) }
);

export type OrnersQueryVariables = {};


export type OrnersQuery = (
  { __typename?: 'Query' }
  & { orners: Array<Maybe<(
    { __typename?: 'Orner' }
    & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
    & { location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )> }
  )>> }
);

export type PostQueryVariables = {
  id: Scalars['ID']
};


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'xIndex' | 'yIndex'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  ) }
);

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'xIndex' | 'yIndex'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'xIndex' | 'yIndex'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  )>> }
);

export type UserQueryVariables = {
  id: Scalars['ID']
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserDetails' }
    & Pick<UserDetails, 'id' | 'creationDate' | 'lastModifiedDate' | 'role'>
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate'>
  )>> }
);


export const AddAdminDocument = gql`
    mutation addAdmin($id: ID!) {
  addAdmin(id: $id) {
    id
    creationDate
    lastModifiedDate
  }
}
    `;
export type AddAdminMutationFn = ApolloReactCommon.MutationFunction<AddAdminMutation, AddAdminMutationVariables>;

/**
 * __useAddAdminMutation__
 *
 * To run a mutation, you first call `useAddAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdminMutation, { data, loading, error }] = useAddAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddAdminMutation, AddAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<AddAdminMutation, AddAdminMutationVariables>(AddAdminDocument, baseOptions);
      }
export type AddAdminMutationHookResult = ReturnType<typeof useAddAdminMutation>;
export type AddAdminMutationResult = ApolloReactCommon.MutationResult<AddAdminMutation>;
export type AddAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<AddAdminMutation, AddAdminMutationVariables>;
export const AddOrnerDocument = gql`
    mutation addOrner($id: ID!, $email: String!, $name: String!, $discription: String, $icon: String, $images: [String]!, $address: String, $location: GeolocationInput) {
  addOrner(id: $id, email: $email, name: $name, discription: $discription, icon: $icon, images: $images, address: $address, location: $location) {
    id
    email
    name
    discription
    icon
    images
    address
    location {
      xIndex
      yIndex
    }
  }
}
    `;
export type AddOrnerMutationFn = ApolloReactCommon.MutationFunction<AddOrnerMutation, AddOrnerMutationVariables>;

/**
 * __useAddOrnerMutation__
 *
 * To run a mutation, you first call `useAddOrnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrnerMutation, { data, loading, error }] = useAddOrnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      discription: // value for 'discription'
 *      icon: // value for 'icon'
 *      images: // value for 'images'
 *      address: // value for 'address'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useAddOrnerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOrnerMutation, AddOrnerMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOrnerMutation, AddOrnerMutationVariables>(AddOrnerDocument, baseOptions);
      }
export type AddOrnerMutationHookResult = ReturnType<typeof useAddOrnerMutation>;
export type AddOrnerMutationResult = ApolloReactCommon.MutationResult<AddOrnerMutation>;
export type AddOrnerMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOrnerMutation, AddOrnerMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($name: String!, $start: DateTime!, $finish: DateTime!, $discription: String, $sumbnail: String, $images: [String]!, $ornerId: String!, $address: String, $location: GeolocationInput, $target: TargetInput!) {
  addPost(name: $name, start: $start, finish: $finish, discription: $discription, sumbnail: $sumbnail, images: $images, ornerId: $ornerId, address: $address, location: $location, target: $target) {
    id
    name
    start
    finish
    discription
    sumbnail
    images
    visitors {
      visitorName
      discription
      sumbnail
    }
    orner {
      id
      email
      name
      discription
      icon
      images
      address
      location {
        xIndex
        yIndex
      }
    }
    address
    location {
      xIndex
      yIndex
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;
export type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      name: // value for 'name'
 *      start: // value for 'start'
 *      finish: // value for 'finish'
 *      discription: // value for 'discription'
 *      sumbnail: // value for 'sumbnail'
 *      images: // value for 'images'
 *      ornerId: // value for 'ornerId'
 *      address: // value for 'address'
 *      location: // value for 'location'
 *      target: // value for 'target'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const AddUserDocument = gql`
    mutation addUser($email: String!, $password: String!) {
  addUser(email: $email, password: $password) {
    id
    creationDate
    lastModifiedDate
  }
}
    `;
export type AddUserMutationFn = ApolloReactCommon.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        return ApolloReactHooks.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = ApolloReactCommon.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = ApolloReactCommon.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
    name
    start
    finish
    discription
    sumbnail
    images
    visitors {
      visitorName
      discription
      sumbnail
    }
    orner {
      id
      email
      discription
      icon
      images
      address
      location {
        xIndex
        yIndex
      }
    }
    address
    location {
      xIndex
      yIndex
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateOrnerDocument = gql`
    mutation updateOrner($id: ID!, $email: ID, $name: String, $discription: String, $icon: String, $images: [String], $address: String, $location: GeolocationInput) {
  updateOrner(id: $id, email: $email, name: $name, discription: $discription, icon: $icon, images: $images, address: $address, location: $location) {
    id
    email
    name
    discription
    icon
    images
    address
    location {
      xIndex
      yIndex
    }
  }
}
    `;
export type UpdateOrnerMutationFn = ApolloReactCommon.MutationFunction<UpdateOrnerMutation, UpdateOrnerMutationVariables>;

/**
 * __useUpdateOrnerMutation__
 *
 * To run a mutation, you first call `useUpdateOrnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrnerMutation, { data, loading, error }] = useUpdateOrnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      discription: // value for 'discription'
 *      icon: // value for 'icon'
 *      images: // value for 'images'
 *      address: // value for 'address'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useUpdateOrnerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrnerMutation, UpdateOrnerMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOrnerMutation, UpdateOrnerMutationVariables>(UpdateOrnerDocument, baseOptions);
      }
export type UpdateOrnerMutationHookResult = ReturnType<typeof useUpdateOrnerMutation>;
export type UpdateOrnerMutationResult = ApolloReactCommon.MutationResult<UpdateOrnerMutation>;
export type UpdateOrnerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOrnerMutation, UpdateOrnerMutationVariables>;
export const MyInfoDocument = gql`
    query myInfo {
  myInfo {
    id
    creationDate
    lastModifiedDate
    role
  }
}
    `;

/**
 * __useMyInfoQuery__
 *
 * To run a query within a React component, call `useMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, baseOptions);
      }
export function useMyInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, baseOptions);
        }
export type MyInfoQueryHookResult = ReturnType<typeof useMyInfoQuery>;
export type MyInfoLazyQueryHookResult = ReturnType<typeof useMyInfoLazyQuery>;
export type MyInfoQueryResult = ApolloReactCommon.QueryResult<MyInfoQuery, MyInfoQueryVariables>;
export const OrnerDocument = gql`
    query orner($id: ID!) {
  orner(id: $id) {
    id
    email
    name
    discription
    icon
    images
    address
    location {
      xIndex
      yIndex
    }
  }
}
    `;

/**
 * __useOrnerQuery__
 *
 * To run a query within a React component, call `useOrnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrnerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrnerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrnerQuery, OrnerQueryVariables>) {
        return ApolloReactHooks.useQuery<OrnerQuery, OrnerQueryVariables>(OrnerDocument, baseOptions);
      }
export function useOrnerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrnerQuery, OrnerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrnerQuery, OrnerQueryVariables>(OrnerDocument, baseOptions);
        }
export type OrnerQueryHookResult = ReturnType<typeof useOrnerQuery>;
export type OrnerLazyQueryHookResult = ReturnType<typeof useOrnerLazyQuery>;
export type OrnerQueryResult = ApolloReactCommon.QueryResult<OrnerQuery, OrnerQueryVariables>;
export const OrnersDocument = gql`
    query orners {
  orners {
    id
    email
    name
    discription
    icon
    images
    address
    location {
      xIndex
      yIndex
    }
  }
}
    `;

/**
 * __useOrnersQuery__
 *
 * To run a query within a React component, call `useOrnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrnersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrnersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrnersQuery, OrnersQueryVariables>) {
        return ApolloReactHooks.useQuery<OrnersQuery, OrnersQueryVariables>(OrnersDocument, baseOptions);
      }
export function useOrnersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrnersQuery, OrnersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrnersQuery, OrnersQueryVariables>(OrnersDocument, baseOptions);
        }
export type OrnersQueryHookResult = ReturnType<typeof useOrnersQuery>;
export type OrnersLazyQueryHookResult = ReturnType<typeof useOrnersLazyQuery>;
export type OrnersQueryResult = ApolloReactCommon.QueryResult<OrnersQuery, OrnersQueryVariables>;
export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    id
    name
    start
    finish
    discription
    sumbnail
    images
    visitors {
      visitorName
      discription
      sumbnail
    }
    orner {
      id
      email
      name
      discription
      icon
      images
      address
      location {
        xIndex
        yIndex
      }
    }
    address
    location {
      xIndex
      yIndex
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts {
  posts {
    id
    name
    start
    finish
    discription
    sumbnail
    images
    visitors {
      visitorName
      discription
      sumbnail
    }
    orner {
      id
      email
      name
      discription
      icon
      images
      address
      location {
        xIndex
        yIndex
      }
    }
    address
    location {
      xIndex
      yIndex
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    creationDate
    lastModifiedDate
    role
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    id
    creationDate
    lastModifiedDate
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;