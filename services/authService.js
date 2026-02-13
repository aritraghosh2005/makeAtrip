import { supabase } from '../lib/supabaseClient'


export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password
  })
}

// login
export async function login(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password
  })
}

// logout
export async function logout() {
  return await supabase.auth.signOut()
}


export async function getCurrentUser() {
  return await supabase.auth.getUser()
}

// get the session
export async function getSession() {
  return await supabase.auth.getSession()
}
