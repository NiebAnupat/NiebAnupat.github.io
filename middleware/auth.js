export default function ({ store, redirect }) {
  const user = store.state.users.user
  if (!user) {
    redirect('/login')
  }
}
