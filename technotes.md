### 在 windows 的 powershell 下设置环境变量

```
$env:JWT_SECRET = 'Canada2022'
```

NEXTAUTH_URL

user : yao1@gmail.com
password: 12345678

gascenter-nextjs

## redux

```
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

```

### 2022.09.26

- event.stopPropagation, event.preventdefault, stop page rerendering...

### 2022.09.27

- format backend 400,500 error message into object {message:'xxxx'
  }

- nextauth, credentials,

```
email,
password,
redirect: false
```

signIn will return a Promsise object will be resolved to
{
error: string | undefined // Error code based on the type of error
status: number // HTTP status code
ok: boolean // `true` if the signin was successful
url: string | null // `null` if there was an error, otherwise URL to redirected to
}
full refreah: window.location.replace('/dashboard')

## not found

```
export function getStaticProps() {
return {
// returns the default 404 page with a status code of 404
notFound: true,
};
}
```
