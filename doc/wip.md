# Some thoughts for now

General setup for reducers:

```
type Entity = {
  id: string,
  name: string,
  ...
};

type State = {
  isLoading: boolean,
  error: Object,
  items: {
    [string]: Entity,
  },
  list1: [string],
  list2: [string],
};
```

Generalize this to:

```
type State = {
  loaders: {
    [string]: boolean,
  },
  errors: {
    [string]: boolean,
  },
  items: {
    [string]: Entity,
  },
  queries: {
    [string]: [string],
  },
}
```

Actions:
- Load data for a query
- Report success
- Report error
- Get data for a query
- Invalidate data within (a) quer(y/ies)

Make sure the user still has to use / can use redux
