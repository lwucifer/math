import { authFire } from '@/services/firebase/FirebaseInit.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    authFire.onAuthStateChanged(user => {
      console.log("[onAuthStateChanged]", user);

      // store.commit('setUser', user)
      resolve()
    })
  })
}
