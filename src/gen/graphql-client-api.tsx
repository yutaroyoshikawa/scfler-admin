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
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
};

export type GeolocationInput = {
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addUser: User,
  updateUser: User,
  deleteUser: ReturnDelete,
  addOrner: Orner,
  updateOrner: Orner,
  deleteOrner: ReturnDelete,
  addPost: Post,
  updatePost: Post,
  deletePost: ReturnDelete,
};


export type MutationAddUserArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  email: Scalars['String'],
  role: Roles
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


export type MutationDeleteOrnerArgs = {
  id: Scalars['ID']
};


export type MutationAddPostArgs = {
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sicflerId: Scalars['ID'],
  sumbnail?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  ornerId: Scalars['String'],
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>,
  target: TargetInput
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sicflerId: Scalars['ID'],
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
  sicflerId: Scalars['ID'],
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
  myInfo: User,
  user: User,
  users: Array<Maybe<User>>,
  orner: Orner,
  orners: Array<Maybe<Orner>>,
  post: Post,
  posts: Array<Maybe<Post>>,
  postsByOrnerId: Array<Maybe<Post>>,
  postsBySicflerId: Array<Maybe<Post>>,
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


export type QueryPostsByOrnerIdArgs = {
  ornerId: Scalars['ID']
};


export type QueryPostsBySicflerIdArgs = {
  sicflerId: Scalars['ID']
};

export type ReturnDelete = {
   __typename?: 'ReturnDelete',
  id: Scalars['ID'],
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
  email: Scalars['String'],
  role: Roles,
};

export type Visitor = {
   __typename?: 'Visitor',
  visitorName: Scalars['String'],
  discription?: Maybe<Scalars['String']>,
  sumbnail?: Maybe<Scalars['String']>,
};

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
      & Pick<Geolocation, 'lat' | 'lng'>
    )> }
  ) }
);

export type AddPostMutationVariables = {
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sicflerId: Scalars['ID'],
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
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sicflerId' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
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

export type DeleteOrnerMutationVariables = {
  id: Scalars['ID']
};


export type DeleteOrnerMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrner: (
    { __typename?: 'ReturnDelete' }
    & Pick<ReturnDelete, 'id'>
  ) }
);

export type DeletePostMutationVariables = {
  id: Scalars['ID']
};


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'ReturnDelete' }
    & Pick<ReturnDelete, 'id'>
  ) }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'ReturnDelete' }
    & Pick<ReturnDelete, 'id'>
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
      & Pick<Geolocation, 'lat' | 'lng'>
    )> }
  ) }
);

export type UpdatePostMutationVariables = {
  id: Scalars['ID'],
  name: Scalars['String'],
  start: Scalars['DateTime'],
  finish: Scalars['DateTime'],
  discription?: Maybe<Scalars['String']>,
  sicflerId: Scalars['ID'],
  sumbnail?: Maybe<Scalars['String']>,
  images: Array<Maybe<Scalars['String']>>,
  ornerId: Scalars['String'],
  address?: Maybe<Scalars['String']>,
  location?: Maybe<GeolocationInput>,
  target: TargetInput
};


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sicflerId' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  ) }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'],
  email: Scalars['String'],
  role: Roles
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate' | 'email' | 'role'>
  ) }
);

export type MyInfoQueryVariables = {};


export type MyInfoQuery = (
  { __typename?: 'Query' }
  & { myInfo: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate' | 'email' | 'role'>
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
      & Pick<Geolocation, 'lat' | 'lng'>
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
      & Pick<Geolocation, 'lat' | 'lng'>
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
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sicflerId' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
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
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sumbnail' | 'sicflerId' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  )>> }
);

export type PostsByOrnerIdQueryVariables = {
  ornerId: Scalars['ID']
};


export type PostsByOrnerIdQuery = (
  { __typename?: 'Query' }
  & { postsByOrnerId: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sicflerId' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
    )>, target: (
      { __typename?: 'Target' }
      & Pick<Target, 'ageGroup' | 'gender'>
    ) }
  )>> }
);

export type PostsBySicflerIdQueryVariables = {
  sicflerId: Scalars['ID']
};


export type PostsBySicflerIdQuery = (
  { __typename?: 'Query' }
  & { postsBySicflerId: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'name' | 'start' | 'finish' | 'discription' | 'sicflerId' | 'sumbnail' | 'images' | 'address'>
    & { visitors: Array<Maybe<(
      { __typename?: 'Visitor' }
      & Pick<Visitor, 'visitorName' | 'discription' | 'sumbnail'>
    )>>, orner: (
      { __typename?: 'Orner' }
      & Pick<Orner, 'id' | 'email' | 'name' | 'discription' | 'icon' | 'images' | 'address'>
      & { location: Maybe<(
        { __typename?: 'Geolocation' }
        & Pick<Geolocation, 'lat' | 'lng'>
      )> }
    ), location: Maybe<(
      { __typename?: 'Geolocation' }
      & Pick<Geolocation, 'lat' | 'lng'>
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate' | 'email' | 'role'>
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'creationDate' | 'lastModifiedDate' | 'email' | 'role'>
  )>> }
);


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
      lat
      lng
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
    mutation addPost($name: String!, $start: DateTime!, $finish: DateTime!, $discription: String, $sicflerId: ID!, $sumbnail: String, $images: [String]!, $ornerId: String!, $address: String, $location: GeolocationInput, $target: TargetInput!) {
  addPost(name: $name, start: $start, finish: $finish, discription: $discription, sicflerId: $sicflerId, sumbnail: $sumbnail, images: $images, ornerId: $ornerId, address: $address, location: $location, target: $target) {
    id
    name
    start
    finish
    discription
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
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
 *      sicflerId: // value for 'sicflerId'
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
export const DeleteOrnerDocument = gql`
    mutation deleteOrner($id: ID!) {
  deleteOrner(id: $id) {
    id
  }
}
    `;
export type DeleteOrnerMutationFn = ApolloReactCommon.MutationFunction<DeleteOrnerMutation, DeleteOrnerMutationVariables>;

/**
 * __useDeleteOrnerMutation__
 *
 * To run a mutation, you first call `useDeleteOrnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrnerMutation, { data, loading, error }] = useDeleteOrnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrnerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOrnerMutation, DeleteOrnerMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOrnerMutation, DeleteOrnerMutationVariables>(DeleteOrnerDocument, baseOptions);
      }
export type DeleteOrnerMutationHookResult = ReturnType<typeof useDeleteOrnerMutation>;
export type DeleteOrnerMutationResult = ApolloReactCommon.MutationResult<DeleteOrnerMutation>;
export type DeleteOrnerMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOrnerMutation, DeleteOrnerMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
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
      lat
      lng
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
export const UpdatePostDocument = gql`
    mutation updatePost($id: ID!, $name: String!, $start: DateTime!, $finish: DateTime!, $discription: String, $sicflerId: ID!, $sumbnail: String, $images: [String]!, $ornerId: String!, $address: String, $location: GeolocationInput, $target: TargetInput!) {
  updatePost(id: $id, name: $name, start: $start, finish: $finish, discription: $discription, sicflerId: $sicflerId, sumbnail: $sumbnail, images: $images, ornerId: $ornerId, address: $address, location: $location, target: $target) {
    id
    name
    start
    finish
    discription
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      start: // value for 'start'
 *      finish: // value for 'finish'
 *      discription: // value for 'discription'
 *      sicflerId: // value for 'sicflerId'
 *      sumbnail: // value for 'sumbnail'
 *      images: // value for 'images'
 *      ornerId: // value for 'ornerId'
 *      address: // value for 'address'
 *      location: // value for 'location'
 *      target: // value for 'target'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: ID!, $email: String!, $role: Roles!) {
  updateUser(id: $id, email: $email, role: $role) {
    id
    creationDate
    lastModifiedDate
    email
    role
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const MyInfoDocument = gql`
    query myInfo {
  myInfo {
    id
    creationDate
    lastModifiedDate
    email
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
      lat
      lng
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
      lat
      lng
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
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
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
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
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
export const PostsByOrnerIdDocument = gql`
    query postsByOrnerId($ornerId: ID!) {
  postsByOrnerId(ornerId: $ornerId) {
    id
    name
    start
    finish
    discription
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;

/**
 * __usePostsByOrnerIdQuery__
 *
 * To run a query within a React component, call `usePostsByOrnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByOrnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByOrnerIdQuery({
 *   variables: {
 *      ornerId: // value for 'ornerId'
 *   },
 * });
 */
export function usePostsByOrnerIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsByOrnerIdQuery, PostsByOrnerIdQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsByOrnerIdQuery, PostsByOrnerIdQueryVariables>(PostsByOrnerIdDocument, baseOptions);
      }
export function usePostsByOrnerIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsByOrnerIdQuery, PostsByOrnerIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsByOrnerIdQuery, PostsByOrnerIdQueryVariables>(PostsByOrnerIdDocument, baseOptions);
        }
export type PostsByOrnerIdQueryHookResult = ReturnType<typeof usePostsByOrnerIdQuery>;
export type PostsByOrnerIdLazyQueryHookResult = ReturnType<typeof usePostsByOrnerIdLazyQuery>;
export type PostsByOrnerIdQueryResult = ApolloReactCommon.QueryResult<PostsByOrnerIdQuery, PostsByOrnerIdQueryVariables>;
export const PostsBySicflerIdDocument = gql`
    query postsBySicflerId($sicflerId: ID!) {
  postsBySicflerId(sicflerId: $sicflerId) {
    id
    name
    start
    finish
    discription
    sicflerId
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
        lat
        lng
      }
    }
    address
    location {
      lat
      lng
    }
    target {
      ageGroup
      gender
    }
  }
}
    `;

/**
 * __usePostsBySicflerIdQuery__
 *
 * To run a query within a React component, call `usePostsBySicflerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsBySicflerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsBySicflerIdQuery({
 *   variables: {
 *      sicflerId: // value for 'sicflerId'
 *   },
 * });
 */
export function usePostsBySicflerIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsBySicflerIdQuery, PostsBySicflerIdQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsBySicflerIdQuery, PostsBySicflerIdQueryVariables>(PostsBySicflerIdDocument, baseOptions);
      }
export function usePostsBySicflerIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsBySicflerIdQuery, PostsBySicflerIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsBySicflerIdQuery, PostsBySicflerIdQueryVariables>(PostsBySicflerIdDocument, baseOptions);
        }
export type PostsBySicflerIdQueryHookResult = ReturnType<typeof usePostsBySicflerIdQuery>;
export type PostsBySicflerIdLazyQueryHookResult = ReturnType<typeof usePostsBySicflerIdLazyQuery>;
export type PostsBySicflerIdQueryResult = ApolloReactCommon.QueryResult<PostsBySicflerIdQuery, PostsBySicflerIdQueryVariables>;
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    creationDate
    lastModifiedDate
    email
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
    email
    role
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