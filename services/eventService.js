import { supabase } from '../lib/supabaseClient'

// GET ALL EVENTS
export async function getAllEvents() {
  return await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })
}

// GET EVENT BY ID
export async function getEventById(eventId) {
  return await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single()
}
