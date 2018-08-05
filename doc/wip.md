# Some thoughts for now

This document is very much a work in progress...

### Goals

- No magic
- Keep things explicit
- Use Redux as you normally would
- Don't become an abstraction layer, just add convenience
- Only take away hassle of creating all boilerplat that is the same for each entity you add to Redux

### Wins

You ...

- ... don't have to define a reducer for the entities, views on these entities, `isLoading`, `error`, etc.
- ... don't have to define selectors for reducer state
- ... don't have to define actions for interaction with redux regarding entities

## State

General setup I use for reducers:

```
type ID = string;

type Entity = {
  id: ID,
  name: string,
  ...
};

type State = {
  isLoading: boolean,
  error: Object,
  items: {
    [ID]: Entity,
  },
  list1: [ID],
  list2: [ID],
};
```

Generalize this to:

```
type QueryKey = string;
type EntityType = string;

type EntityState = {
  loaders: {
    [QueryKey]: boolean,
  },
  errors: {
    [QueryKey]: Error,
  },
  items: {
    [ID]: Entity,
  },
  queries: {
    [QueryKey]: [ID],
  },
}

// TODO: Add lastUpdated, to both queries and single entities?
```

## Actions

```
queryStart(type: string, queryKey: string);
querySuccess(type: string, queryKey: string, items: Entity[], concat: boolean);
queryError(type: string, queryKey: string, error: Error);

// TODO: Add more Async API support, delete, POST, etc. Or make actions above more generic? Or not, success should be clear what will happen... fetchEntity / fetchEntities / deleteEntity / updateEntity / insertEntity?

replaceEntity(type: string, id: string, item: Entity);
updateEntity(type: string, id: string, changeSet: Object);
removeEntity(type: string, id: string);
removeFromQuery(type: string, queryKey: string, id: string);
removeFromQueries(type: string, queryKeys: string[], id: string);
resetQuery(type: string, id: string);
```

## Selectors

```
selectLoader(type: string, queryKey: string);
selectError(type: string, queryKey: string);
selectEntities(type: string, queryKey: string);
selectEntity(type: string, id: string);
selectQueryEntities(type: string);
```

## Setup

```
createReducer(type: string, reducer: Function)
```

Example:

```
// comment-actions.js
const SET_SORTING = 'comments/SET_SORTING';

export const setSorting = (sort: string) => ({
	type: SET_SORTING,
	sort,
});
```

```
// comment-reducer.js
import { createReducer, createInitialState } from 'reduxe';
import { SET_SORTING } from './comment-actions';

type State = EntityState & {
	sort: 'date' | 'name',
	// ... other custom reducer fields
};

const initialState = {
	...createInitialState(),
	sort: 'date',
}

function reducer(state: State, action: Action) {
	switch (action.type) {
		case SET_SORTING:
			return {
				...state,
				sort: action.sort,
			}
		default:
			return state;
	}
}

export default createReducer('comment', reducer); 
```

```
// index.js
import React from 'react';
import { connect } from 'react-redux';
import {
	queryStart, querySuccess, queryError, removeEntity,
	selectQueryItems,
} from 'reduxe';

@connect(state => ({
	comments: selectQueryItems('comment', 'all'),
}), {
	queryStart, querySuccess, queryError, removeEntity,
})
export default class MyComponent extends React.Component {
	async componentDidMount() {
		this.props.queryStart('comment', 'all');
		
		try {
			const result = await fetchAllComments();
			this.props.querySuccess('comment', 'all', result);
		} catch (error) {
			this.props.queryError('comment', 'all', error);
		}
	}
	
	deleteComment(comment) {
		this.props.removeEntity('comment', comment.id);
	}
	
	render() {
		const { comments } = this.props;
		
		return (
			<ul>
				{comments.map(comment => (
					<li key={comment.id}>
						{comment.message}
						&nbsp;-&nbsp;
						<a onClick={() => this.deleteComment(comment)}>Delete</a>
					</li>
				))}
			</ul>
		);
	}
}
```

## TODO

- Pick up nested entities? Or just don't do that?
	- More configuration...
	- Convert nested entities to ID in reducer
	- Store nested entities in its own reducer
	- Convert ID to entities in selectors
	- Am I building an ORM? Prevent that :)
- Last updated (per query)
- Simpler initialization? Change where a reducer is in the tree? Primarily for selectors?
- Redux thunk example
- Redux saga example
- Make namespaced / scoped objects so you don't constantly have to pass in the `type` for each selector/action (optimization)
- Pass in promise so we can handle start/success/error (optimization)
- Should work with [https://github.com/paularmstrong/normalizr](https://github.com/paularmstrong/normalizr)?
- Do add a root reducer for this lib? Or encourage to make a reducer for each entity so people see the link with their own redux state?
- Encourage `combineReducers`?

## Similar libraries:

- [https://www.npmjs.com/package/redux-entity](https://www.npmjs.com/package/redux-entity)
	- Quite similar but simpler, no support for multiple views on the same data (queries)
	- Dispatches the actions for you, you only have to pass a promise to `loadEntity`. More implicit, I'd like people to know exactly how this works. If they use the actions theirselves, they are more aware of what happens and can more easily debug it.
	- Has it's reducer at top level
- [https://www.npmjs.com/package/redux-entities](https://www.npmjs.com/package/redux-entities)
	- Built on top of `normalizr`