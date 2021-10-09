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
  timestamptz: any;
};


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "subscribes" */
  delete_subscribes?: Maybe<Subscribes_Mutation_Response>;
  /** delete single row from the table: "subscribes" */
  delete_subscribes_by_pk?: Maybe<Subscribes>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "video_views" */
  delete_video_views?: Maybe<Video_Views_Mutation_Response>;
  /** delete data from the table: "videos" */
  delete_videos?: Maybe<Videos_Mutation_Response>;
  /** delete single row from the table: "videos" */
  delete_videos_by_pk?: Maybe<Videos>;
  /** insert data into the table: "subscribes" */
  insert_subscribes?: Maybe<Subscribes_Mutation_Response>;
  /** insert a single row into the table: "subscribes" */
  insert_subscribes_one?: Maybe<Subscribes>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "video_views" */
  insert_video_views?: Maybe<Video_Views_Mutation_Response>;
  /** insert a single row into the table: "video_views" */
  insert_video_views_one?: Maybe<Video_Views>;
  /** insert data into the table: "videos" */
  insert_videos?: Maybe<Videos_Mutation_Response>;
  /** insert a single row into the table: "videos" */
  insert_videos_one?: Maybe<Videos>;
  /** update data of the table: "subscribes" */
  update_subscribes?: Maybe<Subscribes_Mutation_Response>;
  /** update single row of the table: "subscribes" */
  update_subscribes_by_pk?: Maybe<Subscribes>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "video_views" */
  update_video_views?: Maybe<Video_Views_Mutation_Response>;
  /** update data of the table: "videos" */
  update_videos?: Maybe<Videos_Mutation_Response>;
  /** update single row of the table: "videos" */
  update_videos_by_pk?: Maybe<Videos>;
};


/** mutation root */
export type Mutation_RootDelete_SubscribesArgs = {
  where: Subscribes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Subscribes_By_PkArgs = {
  subscribe_id: Scalars['String'];
  userid: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Video_ViewsArgs = {
  where: Video_Views_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_VideosArgs = {
  where: Videos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Videos_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_SubscribesArgs = {
  objects: Array<Subscribes_Insert_Input>;
  on_conflict?: Maybe<Subscribes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subscribes_OneArgs = {
  object: Subscribes_Insert_Input;
  on_conflict?: Maybe<Subscribes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Video_ViewsArgs = {
  objects: Array<Video_Views_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Video_Views_OneArgs = {
  object: Video_Views_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_VideosArgs = {
  objects: Array<Videos_Insert_Input>;
  on_conflict?: Maybe<Videos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Videos_OneArgs = {
  object: Videos_Insert_Input;
  on_conflict?: Maybe<Videos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_SubscribesArgs = {
  _set?: Maybe<Subscribes_Set_Input>;
  where: Subscribes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Subscribes_By_PkArgs = {
  _set?: Maybe<Subscribes_Set_Input>;
  pk_columns: Subscribes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Video_ViewsArgs = {
  _inc?: Maybe<Video_Views_Inc_Input>;
  _set?: Maybe<Video_Views_Set_Input>;
  where: Video_Views_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_VideosArgs = {
  _inc?: Maybe<Videos_Inc_Input>;
  _set?: Maybe<Videos_Set_Input>;
  where: Videos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Videos_By_PkArgs = {
  _inc?: Maybe<Videos_Inc_Input>;
  _set?: Maybe<Videos_Set_Input>;
  pk_columns: Videos_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  subscribes: Array<Subscribes>;
  /** An aggregate relationship */
  subscribes_aggregate: Subscribes_Aggregate;
  /** fetch data from the table: "subscribes" using primary key columns */
  subscribes_by_pk?: Maybe<Subscribes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "video_views" */
  video_views: Array<Video_Views>;
  /** fetch aggregated fields from the table: "video_views" */
  video_views_aggregate: Video_Views_Aggregate;
  /** An array relationship */
  videos: Array<Videos>;
  /** An aggregate relationship */
  videos_aggregate: Videos_Aggregate;
  /** fetch data from the table: "videos" using primary key columns */
  videos_by_pk?: Maybe<Videos>;
};


export type Query_RootSubscribesArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


export type Query_RootSubscribes_AggregateArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


export type Query_RootSubscribes_By_PkArgs = {
  subscribe_id: Scalars['String'];
  userid: Scalars['String'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootVideo_ViewsArgs = {
  distinct_on?: Maybe<Array<Video_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Video_Views_Order_By>>;
  where?: Maybe<Video_Views_Bool_Exp>;
};


export type Query_RootVideo_Views_AggregateArgs = {
  distinct_on?: Maybe<Array<Video_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Video_Views_Order_By>>;
  where?: Maybe<Video_Views_Bool_Exp>;
};


export type Query_RootVideosArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};


export type Query_RootVideos_AggregateArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};


export type Query_RootVideos_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "subscribes" */
export type Subscribes = {
  __typename?: 'subscribes';
  created_at: Scalars['timestamptz'];
  subscribe_id: Scalars['String'];
  /** An object relationship */
  subscribed: Users;
  /** An object relationship */
  subscription: Users;
  updated_at: Scalars['timestamptz'];
  userid: Scalars['String'];
};

/** aggregated selection of "subscribes" */
export type Subscribes_Aggregate = {
  __typename?: 'subscribes_aggregate';
  aggregate?: Maybe<Subscribes_Aggregate_Fields>;
  nodes: Array<Subscribes>;
};

/** aggregate fields of "subscribes" */
export type Subscribes_Aggregate_Fields = {
  __typename?: 'subscribes_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Subscribes_Max_Fields>;
  min?: Maybe<Subscribes_Min_Fields>;
};


/** aggregate fields of "subscribes" */
export type Subscribes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Subscribes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "subscribes" */
export type Subscribes_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Subscribes_Max_Order_By>;
  min?: Maybe<Subscribes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "subscribes" */
export type Subscribes_Arr_Rel_Insert_Input = {
  data: Array<Subscribes_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Subscribes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "subscribes". All fields are combined with a logical 'AND'. */
export type Subscribes_Bool_Exp = {
  _and?: Maybe<Array<Subscribes_Bool_Exp>>;
  _not?: Maybe<Subscribes_Bool_Exp>;
  _or?: Maybe<Array<Subscribes_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  subscribe_id?: Maybe<String_Comparison_Exp>;
  subscribed?: Maybe<Users_Bool_Exp>;
  subscription?: Maybe<Users_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  userid?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "subscribes" */
export enum Subscribes_Constraint {
  /** unique or primary key constraint */
  SubscribesPkey = 'subscribes_pkey'
}

/** input type for inserting data into table "subscribes" */
export type Subscribes_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  subscribe_id?: Maybe<Scalars['String']>;
  subscribed?: Maybe<Users_Obj_Rel_Insert_Input>;
  subscription?: Maybe<Users_Obj_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userid?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Subscribes_Max_Fields = {
  __typename?: 'subscribes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  subscribe_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userid?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "subscribes" */
export type Subscribes_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  subscribe_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  userid?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Subscribes_Min_Fields = {
  __typename?: 'subscribes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  subscribe_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userid?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "subscribes" */
export type Subscribes_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  subscribe_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  userid?: Maybe<Order_By>;
};

/** response of any mutation on the table "subscribes" */
export type Subscribes_Mutation_Response = {
  __typename?: 'subscribes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Subscribes>;
};

/** on conflict condition type for table "subscribes" */
export type Subscribes_On_Conflict = {
  constraint: Subscribes_Constraint;
  update_columns?: Array<Subscribes_Update_Column>;
  where?: Maybe<Subscribes_Bool_Exp>;
};

/** Ordering options when selecting data from "subscribes". */
export type Subscribes_Order_By = {
  created_at?: Maybe<Order_By>;
  subscribe_id?: Maybe<Order_By>;
  subscribed?: Maybe<Users_Order_By>;
  subscription?: Maybe<Users_Order_By>;
  updated_at?: Maybe<Order_By>;
  userid?: Maybe<Order_By>;
};

/** primary key columns input for table: subscribes */
export type Subscribes_Pk_Columns_Input = {
  subscribe_id: Scalars['String'];
  userid: Scalars['String'];
};

/** select columns of table "subscribes" */
export enum Subscribes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SubscribeId = 'subscribe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Userid = 'userid'
}

/** input type for updating data in table "subscribes" */
export type Subscribes_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  subscribe_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  userid?: Maybe<Scalars['String']>;
};

/** update columns of table "subscribes" */
export enum Subscribes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SubscribeId = 'subscribe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Userid = 'userid'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  subscribes: Array<Subscribes>;
  /** An aggregate relationship */
  subscribes_aggregate: Subscribes_Aggregate;
  /** fetch data from the table: "subscribes" using primary key columns */
  subscribes_by_pk?: Maybe<Subscribes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "video_views" */
  video_views: Array<Video_Views>;
  /** fetch aggregated fields from the table: "video_views" */
  video_views_aggregate: Video_Views_Aggregate;
  /** An array relationship */
  videos: Array<Videos>;
  /** An aggregate relationship */
  videos_aggregate: Videos_Aggregate;
  /** fetch data from the table: "videos" using primary key columns */
  videos_by_pk?: Maybe<Videos>;
};


export type Subscription_RootSubscribesArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


export type Subscription_RootSubscribes_AggregateArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


export type Subscription_RootSubscribes_By_PkArgs = {
  subscribe_id: Scalars['String'];
  userid: Scalars['String'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootVideo_ViewsArgs = {
  distinct_on?: Maybe<Array<Video_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Video_Views_Order_By>>;
  where?: Maybe<Video_Views_Bool_Exp>;
};


export type Subscription_RootVideo_Views_AggregateArgs = {
  distinct_on?: Maybe<Array<Video_Views_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Video_Views_Order_By>>;
  where?: Maybe<Video_Views_Bool_Exp>;
};


export type Subscription_RootVideosArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};


export type Subscription_RootVideos_AggregateArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};


export type Subscription_RootVideos_By_PkArgs = {
  id: Scalars['String'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  profile_photo_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  subscribes: Array<Subscribes>;
  /** An array relationship */
  subscribesByUserid: Array<Subscribes>;
  /** An aggregate relationship */
  subscribesByUserid_aggregate: Subscribes_Aggregate;
  /** An aggregate relationship */
  subscribes_aggregate: Subscribes_Aggregate;
  updated_at: Scalars['timestamptz'];
  /** An array relationship */
  videos: Array<Videos>;
  /** An aggregate relationship */
  videos_aggregate: Videos_Aggregate;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersSubscribesArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersSubscribesByUseridArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersSubscribesByUserid_AggregateArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersSubscribes_AggregateArgs = {
  distinct_on?: Maybe<Array<Subscribes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Subscribes_Order_By>>;
  where?: Maybe<Subscribes_Bool_Exp>;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersVideosArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};


/**
 * Users Table
 *
 *
 * columns and relationships of "users"
 *
 */
export type UsersVideos_AggregateArgs = {
  distinct_on?: Maybe<Array<Videos_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Videos_Order_By>>;
  where?: Maybe<Videos_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  profile_photo_url?: Maybe<String_Comparison_Exp>;
  subscribes?: Maybe<Subscribes_Bool_Exp>;
  subscribesByUserid?: Maybe<Subscribes_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  videos?: Maybe<Videos_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_photo_url?: Maybe<Scalars['String']>;
  subscribes?: Maybe<Subscribes_Arr_Rel_Insert_Input>;
  subscribesByUserid?: Maybe<Subscribes_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  videos?: Maybe<Videos_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_photo_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_photo_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profile_photo_url?: Maybe<Order_By>;
  subscribesByUserid_aggregate?: Maybe<Subscribes_Aggregate_Order_By>;
  subscribes_aggregate?: Maybe<Subscribes_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  videos_aggregate?: Maybe<Videos_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProfilePhotoUrl = 'profile_photo_url',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile_photo_url?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProfilePhotoUrl = 'profile_photo_url',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "video_views" */
export type Video_Views = {
  __typename?: 'video_views';
  id?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "video_views" */
export type Video_Views_Aggregate = {
  __typename?: 'video_views_aggregate';
  aggregate?: Maybe<Video_Views_Aggregate_Fields>;
  nodes: Array<Video_Views>;
};

/** aggregate fields of "video_views" */
export type Video_Views_Aggregate_Fields = {
  __typename?: 'video_views_aggregate_fields';
  avg?: Maybe<Video_Views_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Video_Views_Max_Fields>;
  min?: Maybe<Video_Views_Min_Fields>;
  stddev?: Maybe<Video_Views_Stddev_Fields>;
  stddev_pop?: Maybe<Video_Views_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Video_Views_Stddev_Samp_Fields>;
  sum?: Maybe<Video_Views_Sum_Fields>;
  var_pop?: Maybe<Video_Views_Var_Pop_Fields>;
  var_samp?: Maybe<Video_Views_Var_Samp_Fields>;
  variance?: Maybe<Video_Views_Variance_Fields>;
};


/** aggregate fields of "video_views" */
export type Video_Views_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Video_Views_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Video_Views_Avg_Fields = {
  __typename?: 'video_views_avg_fields';
  views?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "video_views". All fields are combined with a logical 'AND'. */
export type Video_Views_Bool_Exp = {
  _and?: Maybe<Array<Video_Views_Bool_Exp>>;
  _not?: Maybe<Video_Views_Bool_Exp>;
  _or?: Maybe<Array<Video_Views_Bool_Exp>>;
  id?: Maybe<String_Comparison_Exp>;
  views?: Maybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "video_views" */
export type Video_Views_Inc_Input = {
  views?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "video_views" */
export type Video_Views_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Video_Views_Max_Fields = {
  __typename?: 'video_views_max_fields';
  id?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Video_Views_Min_Fields = {
  __typename?: 'video_views_min_fields';
  id?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "video_views" */
export type Video_Views_Mutation_Response = {
  __typename?: 'video_views_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Video_Views>;
};

/** Ordering options when selecting data from "video_views". */
export type Video_Views_Order_By = {
  id?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** select columns of table "video_views" */
export enum Video_Views_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Views = 'views'
}

/** input type for updating data in table "video_views" */
export type Video_Views_Set_Input = {
  id?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Video_Views_Stddev_Fields = {
  __typename?: 'video_views_stddev_fields';
  views?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Video_Views_Stddev_Pop_Fields = {
  __typename?: 'video_views_stddev_pop_fields';
  views?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Video_Views_Stddev_Samp_Fields = {
  __typename?: 'video_views_stddev_samp_fields';
  views?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Video_Views_Sum_Fields = {
  __typename?: 'video_views_sum_fields';
  views?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Video_Views_Var_Pop_Fields = {
  __typename?: 'video_views_var_pop_fields';
  views?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Video_Views_Var_Samp_Fields = {
  __typename?: 'video_views_var_samp_fields';
  views?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Video_Views_Variance_Fields = {
  __typename?: 'video_views_variance_fields';
  views?: Maybe<Scalars['Float']>;
};

/**
 * video tables
 *
 *
 * columns and relationships of "videos"
 *
 */
export type Videos = {
  __typename?: 'videos';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['String'];
  /** An object relationship */
  owner: Users;
  owner_id: Scalars['String'];
  thumbnail_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  video_url: Scalars['String'];
  views: Scalars['Int'];
};

/** aggregated selection of "videos" */
export type Videos_Aggregate = {
  __typename?: 'videos_aggregate';
  aggregate?: Maybe<Videos_Aggregate_Fields>;
  nodes: Array<Videos>;
};

/** aggregate fields of "videos" */
export type Videos_Aggregate_Fields = {
  __typename?: 'videos_aggregate_fields';
  avg?: Maybe<Videos_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Videos_Max_Fields>;
  min?: Maybe<Videos_Min_Fields>;
  stddev?: Maybe<Videos_Stddev_Fields>;
  stddev_pop?: Maybe<Videos_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Videos_Stddev_Samp_Fields>;
  sum?: Maybe<Videos_Sum_Fields>;
  var_pop?: Maybe<Videos_Var_Pop_Fields>;
  var_samp?: Maybe<Videos_Var_Samp_Fields>;
  variance?: Maybe<Videos_Variance_Fields>;
};


/** aggregate fields of "videos" */
export type Videos_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Videos_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "videos" */
export type Videos_Aggregate_Order_By = {
  avg?: Maybe<Videos_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Videos_Max_Order_By>;
  min?: Maybe<Videos_Min_Order_By>;
  stddev?: Maybe<Videos_Stddev_Order_By>;
  stddev_pop?: Maybe<Videos_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Videos_Stddev_Samp_Order_By>;
  sum?: Maybe<Videos_Sum_Order_By>;
  var_pop?: Maybe<Videos_Var_Pop_Order_By>;
  var_samp?: Maybe<Videos_Var_Samp_Order_By>;
  variance?: Maybe<Videos_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "videos" */
export type Videos_Arr_Rel_Insert_Input = {
  data: Array<Videos_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Videos_On_Conflict>;
};

/** aggregate avg on columns */
export type Videos_Avg_Fields = {
  __typename?: 'videos_avg_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "videos" */
export type Videos_Avg_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "videos". All fields are combined with a logical 'AND'. */
export type Videos_Bool_Exp = {
  _and?: Maybe<Array<Videos_Bool_Exp>>;
  _not?: Maybe<Videos_Bool_Exp>;
  _or?: Maybe<Array<Videos_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  duration?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  owner?: Maybe<Users_Bool_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  thumbnail_url?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  video_url?: Maybe<String_Comparison_Exp>;
  views?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "videos" */
export enum Videos_Constraint {
  /** unique or primary key constraint */
  VideosPkey = 'videos_pkey'
}

/** input type for incrementing numeric columns in table "videos" */
export type Videos_Inc_Input = {
  duration?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "videos" */
export type Videos_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<Users_Obj_Rel_Insert_Input>;
  owner_id?: Maybe<Scalars['String']>;
  thumbnail_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video_url?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Videos_Max_Fields = {
  __typename?: 'videos_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  thumbnail_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video_url?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "videos" */
export type Videos_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  video_url?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Videos_Min_Fields = {
  __typename?: 'videos_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  thumbnail_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video_url?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "videos" */
export type Videos_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  video_url?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** response of any mutation on the table "videos" */
export type Videos_Mutation_Response = {
  __typename?: 'videos_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Videos>;
};

/** on conflict condition type for table "videos" */
export type Videos_On_Conflict = {
  constraint: Videos_Constraint;
  update_columns?: Array<Videos_Update_Column>;
  where?: Maybe<Videos_Bool_Exp>;
};

/** Ordering options when selecting data from "videos". */
export type Videos_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner?: Maybe<Users_Order_By>;
  owner_id?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  video_url?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** primary key columns input for table: videos */
export type Videos_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "videos" */
export enum Videos_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ThumbnailUrl = 'thumbnail_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoUrl = 'video_url',
  /** column name */
  Views = 'views'
}

/** input type for updating data in table "videos" */
export type Videos_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  thumbnail_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video_url?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Videos_Stddev_Fields = {
  __typename?: 'videos_stddev_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "videos" */
export type Videos_Stddev_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Videos_Stddev_Pop_Fields = {
  __typename?: 'videos_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "videos" */
export type Videos_Stddev_Pop_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Videos_Stddev_Samp_Fields = {
  __typename?: 'videos_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "videos" */
export type Videos_Stddev_Samp_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Videos_Sum_Fields = {
  __typename?: 'videos_sum_fields';
  duration?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "videos" */
export type Videos_Sum_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** update columns of table "videos" */
export enum Videos_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ThumbnailUrl = 'thumbnail_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoUrl = 'video_url',
  /** column name */
  Views = 'views'
}

/** aggregate var_pop on columns */
export type Videos_Var_Pop_Fields = {
  __typename?: 'videos_var_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "videos" */
export type Videos_Var_Pop_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Videos_Var_Samp_Fields = {
  __typename?: 'videos_var_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "videos" */
export type Videos_Var_Samp_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Videos_Variance_Fields = {
  __typename?: 'videos_variance_fields';
  duration?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "videos" */
export type Videos_Variance_Order_By = {
  duration?: Maybe<Order_By>;
  views?: Maybe<Order_By>;
};

export type InsertUserMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type InsertUserMutation = { __typename?: 'mutation_root', insert_users_one?: Maybe<{ __typename?: 'users', id: string, name: string, email: string, profile_photo_url?: Maybe<string>, created_at: any, updated_at: any }> };

export type InsertVideoMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  thumbnail_url: Scalars['String'];
  video_url: Scalars['String'];
  owner_id: Scalars['String'];
}>;


export type InsertVideoMutation = { __typename?: 'mutation_root', insert_videos_one?: Maybe<{ __typename?: 'videos', id: string, title?: Maybe<string>, description?: Maybe<string>, video_url: string, thumbnail_url?: Maybe<string>, owner_id: string, duration: number, views: number, updated_at: any, created_at: any }> };

export type RecommendVideosQueryVariables = Exact<{
  currentVideoId: Scalars['String'];
}>;


export type RecommendVideosQuery = { __typename?: 'query_root', videos: Array<{ __typename?: 'videos', id: string, title?: Maybe<string>, description?: Maybe<string>, thumbnail_url?: Maybe<string>, video_url: string, views: number, duration: number, created_at: any, updated_at: any, owner: { __typename?: 'users', id: string, name: string, profile_photo_url?: Maybe<string>, updated_at: any, email: string, created_at: any } }> };

export type VideoByPkQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type VideoByPkQuery = { __typename?: 'query_root', videos_by_pk?: Maybe<{ __typename?: 'videos', id: string, title?: Maybe<string>, thumbnail_url?: Maybe<string>, video_url: string, views: number, duration: number, description?: Maybe<string>, updated_at: any, created_at: any, owner: { __typename?: 'users', id: string, name: string, profile_photo_url?: Maybe<string>, email: string, updated_at: any, created_at: any } }> };

export type VideosQueryVariables = Exact<{ [key: string]: never; }>;


export type VideosQuery = { __typename?: 'query_root', videos: Array<{ __typename?: 'videos', id: string, title?: Maybe<string>, description?: Maybe<string>, thumbnail_url?: Maybe<string>, video_url: string, duration: number, views: number, updated_at: any, created_at: any, owner: { __typename?: 'users', id: string, email: string, name: string, profile_photo_url?: Maybe<string>, updated_at: any, created_at: any } }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = { __typename?: 'query_root', users_by_pk?: Maybe<{ __typename?: 'users', id: string, name: string, email: string, profile_photo_url?: Maybe<string>, updated_at: any, created_at: any }> };


export const InsertUserDocument = gql`
    mutation InsertUser($id: String!, $name: String!, $email: String!) {
  insert_users_one(
    object: {id: $id, name: $name, email: $email, profile_photo_url: ""}
  ) {
    id
    name
    email
    profile_photo_url
    created_at
    updated_at
  }
}
    `;
export type InsertUserMutationFn = Apollo.MutationFunction<InsertUserMutation, InsertUserMutationVariables>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInsertUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertUserMutation, InsertUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertUserMutation, InsertUserMutationVariables>(InsertUserDocument, options);
      }
export type InsertUserMutationHookResult = ReturnType<typeof useInsertUserMutation>;
export type InsertUserMutationResult = Apollo.MutationResult<InsertUserMutation>;
export type InsertUserMutationOptions = Apollo.BaseMutationOptions<InsertUserMutation, InsertUserMutationVariables>;
export const InsertVideoDocument = gql`
    mutation InsertVideo($id: String!, $title: String!, $description: String = "", $thumbnail_url: String!, $video_url: String!, $owner_id: String!) {
  insert_videos_one(
    object: {id: $id, title: $title, description: $description, video_url: $video_url, thumbnail_url: $thumbnail_url, owner_id: $owner_id, duration: 0, views: 0}
  ) {
    id
    title
    description
    video_url
    thumbnail_url
    owner_id
    duration
    views
    updated_at
    created_at
  }
}
    `;
export type InsertVideoMutationFn = Apollo.MutationFunction<InsertVideoMutation, InsertVideoMutationVariables>;

/**
 * __useInsertVideoMutation__
 *
 * To run a mutation, you first call `useInsertVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertVideoMutation, { data, loading, error }] = useInsertVideoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      thumbnail_url: // value for 'thumbnail_url'
 *      video_url: // value for 'video_url'
 *      owner_id: // value for 'owner_id'
 *   },
 * });
 */
export function useInsertVideoMutation(baseOptions?: Apollo.MutationHookOptions<InsertVideoMutation, InsertVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertVideoMutation, InsertVideoMutationVariables>(InsertVideoDocument, options);
      }
export type InsertVideoMutationHookResult = ReturnType<typeof useInsertVideoMutation>;
export type InsertVideoMutationResult = Apollo.MutationResult<InsertVideoMutation>;
export type InsertVideoMutationOptions = Apollo.BaseMutationOptions<InsertVideoMutation, InsertVideoMutationVariables>;
export const RecommendVideosDocument = gql`
    query RecommendVideos($currentVideoId: String!) {
  videos(where: {id: {_neq: $currentVideoId}}, order_by: {views: desc}) {
    id
    title
    description
    thumbnail_url
    video_url
    views
    duration
    owner {
      id
      name
      profile_photo_url
      updated_at
      email
      created_at
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useRecommendVideosQuery__
 *
 * To run a query within a React component, call `useRecommendVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendVideosQuery({
 *   variables: {
 *      currentVideoId: // value for 'currentVideoId'
 *   },
 * });
 */
export function useRecommendVideosQuery(baseOptions: Apollo.QueryHookOptions<RecommendVideosQuery, RecommendVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendVideosQuery, RecommendVideosQueryVariables>(RecommendVideosDocument, options);
      }
export function useRecommendVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendVideosQuery, RecommendVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendVideosQuery, RecommendVideosQueryVariables>(RecommendVideosDocument, options);
        }
export type RecommendVideosQueryHookResult = ReturnType<typeof useRecommendVideosQuery>;
export type RecommendVideosLazyQueryHookResult = ReturnType<typeof useRecommendVideosLazyQuery>;
export type RecommendVideosQueryResult = Apollo.QueryResult<RecommendVideosQuery, RecommendVideosQueryVariables>;
export const VideoByPkDocument = gql`
    query VideoByPk($id: String!) {
  videos_by_pk(id: $id) {
    id
    title
    thumbnail_url
    video_url
    views
    duration
    description
    owner {
      id
      name
      profile_photo_url
      email
      updated_at
      created_at
    }
    updated_at
    created_at
  }
}
    `;

/**
 * __useVideoByPkQuery__
 *
 * To run a query within a React component, call `useVideoByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoByPkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVideoByPkQuery(baseOptions: Apollo.QueryHookOptions<VideoByPkQuery, VideoByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoByPkQuery, VideoByPkQueryVariables>(VideoByPkDocument, options);
      }
export function useVideoByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoByPkQuery, VideoByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoByPkQuery, VideoByPkQueryVariables>(VideoByPkDocument, options);
        }
export type VideoByPkQueryHookResult = ReturnType<typeof useVideoByPkQuery>;
export type VideoByPkLazyQueryHookResult = ReturnType<typeof useVideoByPkLazyQuery>;
export type VideoByPkQueryResult = Apollo.QueryResult<VideoByPkQuery, VideoByPkQueryVariables>;
export const VideosDocument = gql`
    query Videos {
  videos(order_by: {created_at: desc}) {
    id
    title
    description
    thumbnail_url
    video_url
    owner {
      id
      email
      name
      profile_photo_url
      updated_at
      created_at
    }
    duration
    views
    updated_at
    created_at
  }
}
    `;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *   },
 * });
 */
export function useVideosQuery(baseOptions?: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: String!) {
  users_by_pk(id: $id) {
    id
    name
    email
    profile_photo_url
    updated_at
    created_at
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;