import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlay: Play;
  createRating: Rating;
  createRideEvent: RideEvent;
  createUser: User;
  deletePlay: Play;
  deleteRating: Rating;
  deleteUser: User;
  startPlay: Play;
  stopPlay: Play;
  updatePlay: Play;
  updateSettings: Settings;
  updateToy: Toy;
  updateUser: User;
};

export type MutationCreatePlayArgs = {
  play: PlayDto;
};

export type MutationCreateRatingArgs = {
  rating: RatingDto;
};

export type MutationCreateRideEventArgs = {
  event: RideEventDto;
};

export type MutationCreateUserArgs = {
  user: UserDto;
};

export type MutationDeletePlayArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteRatingArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationStartPlayArgs = {
  id: Scalars['Int']['input'];
};

export type MutationStopPlayArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdatePlayArgs = {
  play: PlayDto;
};

export type MutationUpdateSettingsArgs = {
  settings: SettingsDto;
};

export type MutationUpdateToyArgs = {
  toy: ToyDto;
};

export type MutationUpdateUserArgs = {
  user: UserDto;
};

export type Play = {
  __typename?: 'Play';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  runs?: Maybe<Array<Run>>;
  timelines?: Maybe<Array<Timeline>>;
};

export type PlayDto = {
  /** Validation: [isNotEmpty] */
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [matches: (^[\d\w ]+$), isNotEmpty] */
  name: Scalars['String']['input'];
  /** Validation: [arrayNotEmpty, isArray] */
  timelines: Array<TimelineDto>;
};

export type Query = {
  __typename?: 'Query';
  findActivePlay?: Maybe<Play>;
  findCurrentUser: User;
  findLastRideEventByRun?: Maybe<RideEvent>;
  findPlay: Play;
  findPlayByName: Play;
  findPlays: Array<Play>;
  findRating: Rating;
  findRatings: Array<Rating>;
  findRide: Ride;
  findRideEvent: RideEvent;
  findRideEvents: Array<RideEvent>;
  findRides: Array<Ride>;
  findRun: Run;
  findRuns: Array<Run>;
  findRunsByPlay: Array<Run>;
  findSatisfier: Satisfier;
  findSatisfiers: Array<Satisfier>;
  findSettings: Settings;
  findSmartWatches: Array<SmartWatch>;
  findToy: Toy;
  findToyByName: Toy;
  findToys: Array<Toy>;
  findUser: User;
  findUserByUsername: User;
  findUsers: Array<User>;
};

export type QueryFindLastRideEventByRunArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindPlayArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindPlayByNameArgs = {
  name: Scalars['String']['input'];
};

export type QueryFindRatingArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindRideArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindRideEventArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindRunArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindRunsByPlayArgs = {
  name: Scalars['String']['input'];
};

export type QueryFindSatisfierArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindToyArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindToyByNameArgs = {
  name: Scalars['String']['input'];
};

export type QueryFindUserArgs = {
  id: Scalars['Int']['input'];
};

export type QueryFindUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type Rating = {
  __typename?: 'Rating';
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  orgasms?: Maybe<Scalars['Int']['output']>;
  playId?: Maybe<Scalars['Int']['output']>;
  run?: Maybe<Run>;
  score?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type RatingDto = {
  /** Validation: [isNotEmpty] */
  message: Scalars['String']['input'];
  /** Validation: [max: (10), min: (0)] */
  orgasms: Scalars['Int']['input'];
  runId: Scalars['Int']['input'];
  /** Validation: [max: (1), min: (0)] */
  score: Scalars['Float']['input'];
};

export type Ride = {
  __typename?: 'Ride';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  length?: Maybe<Scalars['Int']['output']>;
  satisfier?: Maybe<Satisfier>;
  timeline?: Maybe<Timeline>;
  toyAssignment?: Maybe<Scalars['String']['output']>;
};

export type RideDto = {
  enabled: Scalars['Boolean']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [min: (0)] */
  index: Scalars['Int']['input'];
  /** Validation: [min: (1)] */
  length: Scalars['Int']['input'];
  /** Validation: [isNotEmpty] */
  satisfier: SatisfierDto;
  timelineId?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [isEnum: (vibrate, warm, push, electrify, pattern)] */
  toyAssignment: Scalars['String']['input'];
};

export type RideEvent = {
  __typename?: 'RideEvent';
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  run?: Maybe<Run>;
};

export type RideEventDto = {
  payload?: InputMaybe<Scalars['JSON']['input']>;
};

export type Run = {
  __typename?: 'Run';
  active?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  paused?: Maybe<Scalars['Boolean']['output']>;
  play?: Maybe<Play>;
  ratings?: Maybe<Array<Rating>>;
  runTime?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type Satisfier = {
  __typename?: 'Satisfier';
  id: Scalars['Int']['output'];
  ride?: Maybe<Ride>;
  settings?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SatisfierDto = {
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [] */
  settings?: InputMaybe<Scalars['JSON']['input']>;
  /** Validation: [isEnum: (random, peak, manual, replay, smartWatch, ai)] */
  type: Scalars['String']['input'];
};

export type Settings = {
  __typename?: 'Settings';
  wifiSsid?: Maybe<Scalars['String']['output']>;
};

export type SettingsDto = {
  /** Validation: [matches: (^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$), maxLength: (20), minLength: (6)] */
  adminPassword: Scalars['String']['input'];
  wifiPassword: Scalars['String']['input'];
  wifiSsid: Scalars['String']['input'];
};

export type SmartWatch = {
  __typename?: 'SmartWatch';
  name?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type Timeline = {
  __typename?: 'Timeline';
  id: Scalars['Int']['output'];
  play?: Maybe<Play>;
  rides?: Maybe<Array<Ride>>;
  toy?: Maybe<Toy>;
  toyId?: Maybe<Scalars['Int']['output']>;
};

export type TimelineDto = {
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [arrayNotEmpty, isArray] */
  rides: Array<RideDto>;
  /** Validation: [min: (1)] */
  toyId: Scalars['Int']['input'];
};

export type Toy = {
  __typename?: 'Toy';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  timelines?: Maybe<Array<Timeline>>;
  type?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ToyDto = {
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [matches: (^[\d\w ]+$), isNotEmpty] */
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ratings?: Maybe<Array<Rating>>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserDto = {
  /** Validation: [isNotEmpty] */
  avatar: Scalars['String']['input'];
  /** Validation: [isNotEmpty] */
  description: Scalars['String']['input'];
  /** Validation: [isEnum: (xx, xy)] */
  gender: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Validation: [matches: (^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$), maxLength: (20), minLength: (6)] */
  password: Scalars['String']['input'];
  /** Validation: [matches: (^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$), notEquals: (admin), maxLength: (20), minLength: (6)] */
  username: Scalars['String']['input'];
};

export type CreateUserMutationVariables = Exact<{
  user: UserDto;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  user: UserDto;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
  };
};

export type UpdateToyMutationVariables = Exact<{
  toy: ToyDto;
}>;

export type UpdateToyMutation = {
  __typename?: 'Mutation';
  updateToy: {
    __typename?: 'Toy';
    id: number;
    name?: string | null;
    type?: string | null;
    uuid?: string | null;
  };
};

export type CreatePlayMutationVariables = Exact<{
  play: PlayDto;
}>;

export type CreatePlayMutation = {
  __typename?: 'Mutation';
  createPlay: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
  };
};

export type UpdatePlayMutationVariables = Exact<{
  play: PlayDto;
}>;

export type UpdatePlayMutation = {
  __typename?: 'Mutation';
  updatePlay: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
  };
};

export type StartPlayMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type StartPlayMutation = {
  __typename?: 'Mutation';
  startPlay: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
  };
};

export type StopPlayMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type StopPlayMutation = {
  __typename?: 'Mutation';
  stopPlay: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
  };
};

export type CreateRideEventMutationVariables = Exact<{
  event: RideEventDto;
}>;

export type CreateRideEventMutation = {
  __typename?: 'Mutation';
  createRideEvent: {
    __typename?: 'RideEvent';
    id: number;
    payload?: any | null;
    date?: any | null;
  };
};

export type CreateRatingMutationVariables = Exact<{
  rating: RatingDto;
}>;

export type CreateRatingMutation = {
  __typename?: 'Mutation';
  createRating: {
    __typename?: 'Rating';
    id: number;
    score?: number | null;
    orgasms?: number | null;
    message?: string | null;
  };
};

export type UpdateSettingsMutationVariables = Exact<{
  settings: SettingsDto;
}>;

export type UpdateSettingsMutation = {
  __typename?: 'Mutation';
  updateSettings: { __typename?: 'Settings'; wifiSsid?: string | null };
};

export type FindUsersQueryVariables = Exact<{ [key: string]: never }>;

export type FindUsersQuery = {
  __typename?: 'Query';
  findUsers: Array<{
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
    ratings?: Array<{
      __typename?: 'Rating';
      id: number;
      date?: any | null;
      score?: number | null;
      orgasms?: number | null;
      message?: string | null;
      run?: {
        __typename?: 'Run';
        id: number;
        play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
      } | null;
    }> | null;
  }>;
};

export type FindUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  findUser: {
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
    ratings?: Array<{
      __typename?: 'Rating';
      id: number;
      date?: any | null;
      score?: number | null;
      orgasms?: number | null;
      message?: string | null;
      run?: {
        __typename?: 'Run';
        id: number;
        play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
      } | null;
    }> | null;
  };
};

export type FindCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type FindCurrentUserQuery = {
  __typename?: 'Query';
  findUser: {
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
    ratings?: Array<{
      __typename?: 'Rating';
      id: number;
      date?: any | null;
      score?: number | null;
      orgasms?: number | null;
      message?: string | null;
      run?: {
        __typename?: 'Run';
        id: number;
        play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
      } | null;
    }> | null;
  };
};

export type FindUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type FindUserByUsernameQuery = {
  __typename?: 'Query';
  findUser: {
    __typename?: 'User';
    id: number;
    username?: string | null;
    description?: string | null;
    avatar?: string | null;
    gender?: string | null;
    ratings?: Array<{
      __typename?: 'Rating';
      id: number;
      date?: any | null;
      score?: number | null;
      orgasms?: number | null;
      message?: string | null;
      run?: {
        __typename?: 'Run';
        id: number;
        play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
      } | null;
    }> | null;
  };
};

export type FindToysQueryVariables = Exact<{ [key: string]: never }>;

export type FindToysQuery = {
  __typename?: 'Query';
  findToys: Array<{
    __typename?: 'Toy';
    id: number;
    name?: string | null;
    type?: string | null;
    uuid?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
      }> | null;
      play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
    }> | null;
  }>;
};

export type FindToyQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindToyQuery = {
  __typename?: 'Query';
  findToy: {
    __typename?: 'Toy';
    id: number;
    name?: string | null;
    type?: string | null;
    uuid?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
      }> | null;
      play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
    }> | null;
  };
};

export type FindToyByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type FindToyByNameQuery = {
  __typename?: 'Query';
  findToyByName: {
    __typename?: 'Toy';
    id: number;
    name?: string | null;
    type?: string | null;
    uuid?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
      }> | null;
      play?: { __typename?: 'Play'; id: number; name?: string | null } | null;
    }> | null;
  };
};

export type FindPlaysQueryVariables = Exact<{ [key: string]: never }>;

export type FindPlaysQuery = {
  __typename?: 'Query';
  findPlays: Array<{
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
    runs?: Array<{
      __typename?: 'Run';
      id: number;
      startDate?: any | null;
      active?: boolean | null;
      runTime?: number | null;
      ratings?: Array<{
        __typename?: 'Rating';
        id: number;
        date?: any | null;
        score?: number | null;
        orgasms?: number | null;
        message?: string | null;
        userId?: number | null;
      }> | null;
    }> | null;
  }>;
};

export type FindPlayQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindPlayQuery = {
  __typename?: 'Query';
  findPlay: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
    runs?: Array<{
      __typename?: 'Run';
      id: number;
      startDate?: any | null;
      active?: boolean | null;
      runTime?: number | null;
      ratings?: Array<{
        __typename?: 'Rating';
        id: number;
        date?: any | null;
        score?: number | null;
        orgasms?: number | null;
        message?: string | null;
        userId?: number | null;
      }> | null;
    }> | null;
  };
};

export type FindActivePlayQueryVariables = Exact<{ [key: string]: never }>;

export type FindActivePlayQuery = {
  __typename?: 'Query';
  findActivePlay?: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
    runs?: Array<{
      __typename?: 'Run';
      id: number;
      startDate?: any | null;
      active?: boolean | null;
      runTime?: number | null;
      ratings?: Array<{
        __typename?: 'Rating';
        id: number;
        date?: any | null;
        score?: number | null;
        orgasms?: number | null;
        message?: string | null;
        userId?: number | null;
      }> | null;
    }> | null;
  } | null;
};

export type FindPlayByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type FindPlayByNameQuery = {
  __typename?: 'Query';
  findPlayByName: {
    __typename?: 'Play';
    id: number;
    name?: string | null;
    description?: string | null;
    timelines?: Array<{
      __typename?: 'Timeline';
      id: number;
      toyId?: number | null;
      rides?: Array<{
        __typename?: 'Ride';
        id: number;
        index?: number | null;
        length?: number | null;
        enabled?: boolean | null;
        satisfier?: {
          __typename?: 'Satisfier';
          id: number;
          type?: string | null;
          settings?: any | null;
        } | null;
      }> | null;
    }> | null;
    runs?: Array<{
      __typename?: 'Run';
      id: number;
      startDate?: any | null;
      active?: boolean | null;
      runTime?: number | null;
      ratings?: Array<{
        __typename?: 'Rating';
        id: number;
        date?: any | null;
        score?: number | null;
        orgasms?: number | null;
        message?: string | null;
        userId?: number | null;
      }> | null;
    }> | null;
  };
};

export type FindLastRideEventByRunQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindLastRideEventByRunQuery = {
  __typename?: 'Query';
  findLastRideEventByRun?: {
    __typename?: 'RideEvent';
    id: number;
    payload?: any | null;
    date?: any | null;
  } | null;
};

export type FindSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type FindSettingsQuery = {
  __typename?: 'Query';
  findSettings: { __typename?: 'Settings'; wifiSsid?: string | null };
};

export type FindSmartWatchesQueryVariables = Exact<{ [key: string]: never }>;

export type FindSmartWatchesQuery = {
  __typename?: 'Query';
  findSmartWatches: Array<{
    __typename?: 'SmartWatch';
    uuid?: string | null;
    name?: string | null;
  }>;
};

export const CreateUserDocument = `
    mutation CreateUser($user: UserDto!) {
  createUser(user: $user) {
    id
    username
    description
    avatar
    gender
  }
}
    `;

export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >(
    ['CreateUser'],
    (variables?: CreateUserMutationVariables) =>
      fetcher<CreateUserMutation, CreateUserMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        CreateUserDocument,
        variables,
      )(),
    options,
  );
};

export const UpdateUserDocument = `
    mutation UpdateUser($user: UserDto!) {
  updateUser(user: $user) {
    id
    username
    description
    avatar
    gender
  }
}
    `;

export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >(
    ['UpdateUser'],
    (variables?: UpdateUserMutationVariables) =>
      fetcher<UpdateUserMutation, UpdateUserMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        UpdateUserDocument,
        variables,
      )(),
    options,
  );
};

export const UpdateToyDocument = `
    mutation UpdateToy($toy: ToyDto!) {
  updateToy(toy: $toy) {
    id
    name
    type
    uuid
  }
}
    `;

export const useUpdateToyMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    UpdateToyMutation,
    TError,
    UpdateToyMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateToyMutation,
    TError,
    UpdateToyMutationVariables,
    TContext
  >(
    ['UpdateToy'],
    (variables?: UpdateToyMutationVariables) =>
      fetcher<UpdateToyMutation, UpdateToyMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        UpdateToyDocument,
        variables,
      )(),
    options,
  );
};

export const CreatePlayDocument = `
    mutation CreatePlay($play: PlayDto!) {
  createPlay(play: $play) {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
  }
}
    `;

export const useCreatePlayMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    CreatePlayMutation,
    TError,
    CreatePlayMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreatePlayMutation,
    TError,
    CreatePlayMutationVariables,
    TContext
  >(
    ['CreatePlay'],
    (variables?: CreatePlayMutationVariables) =>
      fetcher<CreatePlayMutation, CreatePlayMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        CreatePlayDocument,
        variables,
      )(),
    options,
  );
};

export const UpdatePlayDocument = `
    mutation UpdatePlay($play: PlayDto!) {
  updatePlay(play: $play) {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
  }
}
    `;

export const useUpdatePlayMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    UpdatePlayMutation,
    TError,
    UpdatePlayMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdatePlayMutation,
    TError,
    UpdatePlayMutationVariables,
    TContext
  >(
    ['UpdatePlay'],
    (variables?: UpdatePlayMutationVariables) =>
      fetcher<UpdatePlayMutation, UpdatePlayMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        UpdatePlayDocument,
        variables,
      )(),
    options,
  );
};

export const StartPlayDocument = `
    mutation StartPlay($id: Int!) {
  startPlay(id: $id) {
    id
    name
    description
  }
}
    `;

export const useStartPlayMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    StartPlayMutation,
    TError,
    StartPlayMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    StartPlayMutation,
    TError,
    StartPlayMutationVariables,
    TContext
  >(
    ['StartPlay'],
    (variables?: StartPlayMutationVariables) =>
      fetcher<StartPlayMutation, StartPlayMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        StartPlayDocument,
        variables,
      )(),
    options,
  );
};

export const StopPlayDocument = `
    mutation StopPlay($id: Int!) {
  stopPlay(id: $id) {
    id
    name
    description
  }
}
    `;

export const useStopPlayMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    StopPlayMutation,
    TError,
    StopPlayMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    StopPlayMutation,
    TError,
    StopPlayMutationVariables,
    TContext
  >(
    ['StopPlay'],
    (variables?: StopPlayMutationVariables) =>
      fetcher<StopPlayMutation, StopPlayMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        StopPlayDocument,
        variables,
      )(),
    options,
  );
};

export const CreateRideEventDocument = `
    mutation CreateRideEvent($event: RideEventDto!) {
  createRideEvent(event: $event) {
    id
    payload
    date
  }
}
    `;

export const useCreateRideEventMutation = <
  TError = unknown,
  TContext = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    CreateRideEventMutation,
    TError,
    CreateRideEventMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateRideEventMutation,
    TError,
    CreateRideEventMutationVariables,
    TContext
  >(
    ['CreateRideEvent'],
    (variables?: CreateRideEventMutationVariables) =>
      fetcher<CreateRideEventMutation, CreateRideEventMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        CreateRideEventDocument,
        variables,
      )(),
    options,
  );
};

export const CreateRatingDocument = `
    mutation CreateRating($rating: RatingDto!) {
  createRating(rating: $rating) {
    id
    score
    orgasms
    message
  }
}
    `;

export const useCreateRatingMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    CreateRatingMutation,
    TError,
    CreateRatingMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateRatingMutation,
    TError,
    CreateRatingMutationVariables,
    TContext
  >(
    ['CreateRating'],
    (variables?: CreateRatingMutationVariables) =>
      fetcher<CreateRatingMutation, CreateRatingMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        CreateRatingDocument,
        variables,
      )(),
    options,
  );
};

export const UpdateSettingsDocument = `
    mutation UpdateSettings($settings: SettingsDto!) {
  updateSettings(settings: $settings) {
    wifiSsid
  }
}
    `;

export const useUpdateSettingsMutation = <TError = unknown, TContext = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  options?: UseMutationOptions<
    UpdateSettingsMutation,
    TError,
    UpdateSettingsMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    UpdateSettingsMutation,
    TError,
    UpdateSettingsMutationVariables,
    TContext
  >(
    ['UpdateSettings'],
    (variables?: UpdateSettingsMutationVariables) =>
      fetcher<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        UpdateSettingsDocument,
        variables,
      )(),
    options,
  );
};

export const FindUsersDocument = `
    query FindUsers {
  findUsers {
    id
    username
    description
    avatar
    gender
    ratings {
      id
      date
      score
      orgasms
      message
      run {
        id
        play {
          id
          name
        }
      }
    }
  }
}
    `;

export const useFindUsersQuery = <TData = FindUsersQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindUsersQueryVariables,
  options?: UseQueryOptions<FindUsersQuery, TError, TData>,
) => {
  return useQuery<FindUsersQuery, TError, TData>(
    variables === undefined ? ['FindUsers'] : ['FindUsers', variables],
    fetcher<FindUsersQuery, FindUsersQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindUsersDocument,
      variables,
    ),
    options,
  );
};

export const FindUserDocument = `
    query FindUser($id: Int!) {
  findUser(id: $id) {
    id
    username
    description
    avatar
    gender
    ratings {
      id
      date
      score
      orgasms
      message
      run {
        id
        play {
          id
          name
        }
      }
    }
  }
}
    `;

export const useFindUserQuery = <TData = FindUserQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindUserQueryVariables,
  options?: UseQueryOptions<FindUserQuery, TError, TData>,
) => {
  return useQuery<FindUserQuery, TError, TData>(
    ['FindUser', variables],
    fetcher<FindUserQuery, FindUserQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindUserDocument,
      variables,
    ),
    options,
  );
};

export const FindCurrentUserDocument = `
    query FindCurrentUser {
  findUser: findCurrentUser {
    id
    username
    description
    avatar
    gender
    ratings {
      id
      date
      score
      orgasms
      message
      run {
        id
        play {
          id
          name
        }
      }
    }
  }
}
    `;

export const useFindCurrentUserQuery = <
  TData = FindCurrentUserQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindCurrentUserQueryVariables,
  options?: UseQueryOptions<FindCurrentUserQuery, TError, TData>,
) => {
  return useQuery<FindCurrentUserQuery, TError, TData>(
    variables === undefined
      ? ['FindCurrentUser']
      : ['FindCurrentUser', variables],
    fetcher<FindCurrentUserQuery, FindCurrentUserQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindCurrentUserDocument,
      variables,
    ),
    options,
  );
};

export const FindUserByUsernameDocument = `
    query FindUserByUsername($username: String!) {
  findUser: findUserByUsername(username: $username) {
    id
    username
    description
    avatar
    gender
    ratings {
      id
      date
      score
      orgasms
      message
      run {
        id
        play {
          id
          name
        }
      }
    }
  }
}
    `;

export const useFindUserByUsernameQuery = <
  TData = FindUserByUsernameQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindUserByUsernameQueryVariables,
  options?: UseQueryOptions<FindUserByUsernameQuery, TError, TData>,
) => {
  return useQuery<FindUserByUsernameQuery, TError, TData>(
    ['FindUserByUsername', variables],
    fetcher<FindUserByUsernameQuery, FindUserByUsernameQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindUserByUsernameDocument,
      variables,
    ),
    options,
  );
};

export const FindToysDocument = `
    query FindToys {
  findToys {
    id
    name
    type
    uuid
    timelines {
      id
      rides {
        id
        index
        length
      }
      play {
        id
        name
      }
    }
  }
}
    `;

export const useFindToysQuery = <TData = FindToysQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindToysQueryVariables,
  options?: UseQueryOptions<FindToysQuery, TError, TData>,
) => {
  return useQuery<FindToysQuery, TError, TData>(
    variables === undefined ? ['FindToys'] : ['FindToys', variables],
    fetcher<FindToysQuery, FindToysQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindToysDocument,
      variables,
    ),
    options,
  );
};

export const FindToyDocument = `
    query FindToy($id: Int!) {
  findToy(id: $id) {
    id
    name
    type
    uuid
    timelines {
      id
      rides {
        id
        index
        length
      }
      play {
        id
        name
      }
    }
  }
}
    `;

export const useFindToyQuery = <TData = FindToyQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindToyQueryVariables,
  options?: UseQueryOptions<FindToyQuery, TError, TData>,
) => {
  return useQuery<FindToyQuery, TError, TData>(
    ['FindToy', variables],
    fetcher<FindToyQuery, FindToyQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindToyDocument,
      variables,
    ),
    options,
  );
};

export const FindToyByNameDocument = `
    query FindToyByName($name: String!) {
  findToyByName(name: $name) {
    id
    name
    type
    uuid
    timelines {
      id
      rides {
        id
        index
        length
      }
      play {
        id
        name
      }
    }
  }
}
    `;

export const useFindToyByNameQuery = <
  TData = FindToyByNameQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindToyByNameQueryVariables,
  options?: UseQueryOptions<FindToyByNameQuery, TError, TData>,
) => {
  return useQuery<FindToyByNameQuery, TError, TData>(
    ['FindToyByName', variables],
    fetcher<FindToyByNameQuery, FindToyByNameQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindToyByNameDocument,
      variables,
    ),
    options,
  );
};

export const FindPlaysDocument = `
    query FindPlays {
  findPlays {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
    runs {
      id
      startDate
      active
      runTime
      ratings {
        id
        date
        score
        orgasms
        message
        userId
      }
    }
  }
}
    `;

export const useFindPlaysQuery = <TData = FindPlaysQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindPlaysQueryVariables,
  options?: UseQueryOptions<FindPlaysQuery, TError, TData>,
) => {
  return useQuery<FindPlaysQuery, TError, TData>(
    variables === undefined ? ['FindPlays'] : ['FindPlays', variables],
    fetcher<FindPlaysQuery, FindPlaysQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindPlaysDocument,
      variables,
    ),
    options,
  );
};

export const FindPlayDocument = `
    query FindPlay($id: Int!) {
  findPlay(id: $id) {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
    runs {
      id
      startDate
      active
      runTime
      ratings {
        id
        date
        score
        orgasms
        message
        userId
      }
    }
  }
}
    `;

export const useFindPlayQuery = <TData = FindPlayQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindPlayQueryVariables,
  options?: UseQueryOptions<FindPlayQuery, TError, TData>,
) => {
  return useQuery<FindPlayQuery, TError, TData>(
    ['FindPlay', variables],
    fetcher<FindPlayQuery, FindPlayQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindPlayDocument,
      variables,
    ),
    options,
  );
};

export const FindActivePlayDocument = `
    query FindActivePlay {
  findActivePlay {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
    runs {
      id
      startDate
      active
      runTime
      ratings {
        id
        date
        score
        orgasms
        message
        userId
      }
    }
  }
}
    `;

export const useFindActivePlayQuery = <
  TData = FindActivePlayQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindActivePlayQueryVariables,
  options?: UseQueryOptions<FindActivePlayQuery, TError, TData>,
) => {
  return useQuery<FindActivePlayQuery, TError, TData>(
    variables === undefined
      ? ['FindActivePlay']
      : ['FindActivePlay', variables],
    fetcher<FindActivePlayQuery, FindActivePlayQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindActivePlayDocument,
      variables,
    ),
    options,
  );
};

export const FindPlayByNameDocument = `
    query FindPlayByName($name: String!) {
  findPlayByName(name: $name) {
    id
    name
    description
    timelines {
      id
      toyId
      rides {
        id
        index
        length
        enabled
        satisfier {
          id
          type
          settings
        }
      }
    }
    runs {
      id
      startDate
      active
      runTime
      ratings {
        id
        date
        score
        orgasms
        message
        userId
      }
    }
  }
}
    `;

export const useFindPlayByNameQuery = <
  TData = FindPlayByNameQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindPlayByNameQueryVariables,
  options?: UseQueryOptions<FindPlayByNameQuery, TError, TData>,
) => {
  return useQuery<FindPlayByNameQuery, TError, TData>(
    ['FindPlayByName', variables],
    fetcher<FindPlayByNameQuery, FindPlayByNameQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindPlayByNameDocument,
      variables,
    ),
    options,
  );
};

export const FindLastRideEventByRunDocument = `
    query FindLastRideEventByRun($id: Int!) {
  findLastRideEventByRun(id: $id) {
    id
    payload
    date
  }
}
    `;

export const useFindLastRideEventByRunQuery = <
  TData = FindLastRideEventByRunQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: FindLastRideEventByRunQueryVariables,
  options?: UseQueryOptions<FindLastRideEventByRunQuery, TError, TData>,
) => {
  return useQuery<FindLastRideEventByRunQuery, TError, TData>(
    ['FindLastRideEventByRun', variables],
    fetcher<FindLastRideEventByRunQuery, FindLastRideEventByRunQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindLastRideEventByRunDocument,
      variables,
    ),
    options,
  );
};

export const FindSettingsDocument = `
    query FindSettings {
  findSettings {
    wifiSsid
  }
}
    `;

export const useFindSettingsQuery = <
  TData = FindSettingsQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindSettingsQueryVariables,
  options?: UseQueryOptions<FindSettingsQuery, TError, TData>,
) => {
  return useQuery<FindSettingsQuery, TError, TData>(
    variables === undefined ? ['FindSettings'] : ['FindSettings', variables],
    fetcher<FindSettingsQuery, FindSettingsQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindSettingsDocument,
      variables,
    ),
    options,
  );
};

export const FindSmartWatchesDocument = `
    query FindSmartWatches {
  findSmartWatches {
    uuid
    name
  }
}
    `;

export const useFindSmartWatchesQuery = <
  TData = FindSmartWatchesQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: FindSmartWatchesQueryVariables,
  options?: UseQueryOptions<FindSmartWatchesQuery, TError, TData>,
) => {
  return useQuery<FindSmartWatchesQuery, TError, TData>(
    variables === undefined
      ? ['FindSmartWatches']
      : ['FindSmartWatches', variables],
    fetcher<FindSmartWatchesQuery, FindSmartWatchesQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      FindSmartWatchesDocument,
      variables,
    ),
    options,
  );
};
