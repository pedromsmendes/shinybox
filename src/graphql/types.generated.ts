export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Dex = {
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  pokemons: Array<PokemonDex>;
  updatedAt: Scalars['DateTime'];
};

export type DexCreate = {
  name: Scalars['String'];
};

export type DexUpdate = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  createDex?: Maybe<Dex>;
  createPokemon?: Maybe<Pokemon>;
  removeDexes: Scalars['Int'];
  removePokemons: Scalars['Int'];
  removeUsers: Scalars['Int'];
  updateDex?: Maybe<Dex>;
  updatePokemon?: Maybe<Pokemon>;
};


export type MutationCreateDexArgs = {
  data: DexCreate;
};


export type MutationCreatePokemonArgs = {
  data: PokemonCreate;
};


export type MutationRemoveDexesArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationRemovePokemonsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationRemoveUsersArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationUpdateDexArgs = {
  data: DexUpdate;
};


export type MutationUpdatePokemonArgs = {
  data: PokemonUpdate;
};

export type Pokemon = {
  createdAt: Scalars['DateTime'];
  dexes: Array<PokemonDex>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PokemonCreate = {
  dexes: Array<PokemonDexCreate>;
  name: Scalars['String'];
};

export type PokemonDex = {
  createdAt: Scalars['DateTime'];
  dex: Dex;
  dexId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  number: Scalars['Int'];
  pokemon: Pokemon;
  pokemonId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PokemonDexCreate = {
  dexId: Scalars['String'];
  name: Scalars['String'];
  number: Scalars['Int'];
};

export type PokemonDexUpdate = {
  dexId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type PokemonUpdate = {
  dexes?: InputMaybe<Array<PokemonDexCreate>>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  dex?: Maybe<Dex>;
  dexes: Array<Dex>;
  me?: Maybe<User>;
  pokemon?: Maybe<Pokemon>;
  pokemons: Array<Pokemon>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryDexArgs = {
  id: Scalars['String'];
};


export type QueryPokemonArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Role = {
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RoleCreate = {
  code: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type RoleUpdate = {
  code?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: Role;
  roleId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserCreate = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  roleId: Scalars['String'];
};

export type UserUpdate = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['String']>;
};

export const GQLOperations = {
  Query: {
    Dexes: 'Dexes',
    Pokemons: 'Pokemons'
  },
  Mutation: {
    CreateDex: 'CreateDex',
    RemoveDexes: 'RemoveDexes',
    UpdateDex: 'UpdateDex',
    CreatePokemon: 'CreatePokemon',
    RemovePokemons: 'RemovePokemons',
    UpdatePokemon: 'UpdatePokemon'
  }
}