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
  id: Scalars['Int'];
  name: Scalars['String'];
  pokemons: Array<PokemonDex>;
  updatedAt: Scalars['DateTime'];
};

export type DexCreate = {
  name: Scalars['String'];
};

export type Mutation = {
  createDex: Dex;
  createPokemon?: Maybe<Pokemon>;
  removeDexes: Scalars['Int'];
  removePokemons: Scalars['Int'];
  updatePokemon?: Maybe<Pokemon>;
};


export type MutationCreateDexArgs = {
  data: DexCreate;
};


export type MutationCreatePokemonArgs = {
  data: PokemonCreate;
};


export type MutationRemoveDexesArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationRemovePokemonsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationUpdatePokemonArgs = {
  data: PokemonUpdate;
};

export type Pokemon = {
  createdAt: Scalars['DateTime'];
  dexes: Array<PokemonDex>;
  id: Scalars['Int'];
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
  dexId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  number: Scalars['Int'];
  pokemon: Pokemon;
  pokemonId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type PokemonDexCreate = {
  dexId: Scalars['Int'];
  name: Scalars['String'];
  number: Scalars['Int'];
};

export type PokemonDexUpdate = {
  dexId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type PokemonUpdate = {
  dexes?: InputMaybe<Array<PokemonDexCreate>>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  dex: Dex;
  dexes: Array<Dex>;
  pokemon: Pokemon;
  pokemons: Array<Pokemon>;
};


export type QueryDexArgs = {
  id: Scalars['Float'];
};


export type QueryPokemonArgs = {
  id: Scalars['Float'];
};

export const GQLOperations = {
  Query: {
    Dexes: 'Dexes',
    Pokemons: 'Pokemons'
  },
  Mutation: {
    CreatePokemon: 'CreatePokemon',
    RemovePokemons: 'RemovePokemons',
    UpdatePokemon: 'UpdatePokemon'
  }
}