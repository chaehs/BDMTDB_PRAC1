import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'


export const useSupabaseStore = defineStore('supabase', () => {
    const user = ref(null)
    const error = ref(null)

    function test() {
        console.log('123123')
    }



    async function getRacketsData() {
        const { data } = await supabase.from('rackets').select('*')
        // console.log(data)
    }

    async function fetchUser() {
        try {
            const { data, error } = await supabase.auth.getUser()
            if (error) throw error
            user.value = data.user
        } catch (err) {
            error.value = err.message
        }
    }

    async function login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            user.value = data.user
        } catch (err) {
            error.value = err.message
        }
    }

    async function logout() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            user.value = null
        } catch (err) {
            error.value = err.message
        }
    }

    // return { user, error, getRacketData, fetchUser, login, logout }
    return { getRacketsData, login, test }
})