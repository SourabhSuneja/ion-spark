import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ckltcwampaagyzneaznt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbHRjd2FtcGFhZ3l6bmVhem50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MDI2NjgsImV4cCI6MjA0ODA3ODY2OH0.pUT2kngS0nkzFBjI-P6g8azU5E3tZzGDQGL68-AUWFc';
const supabase = createClient(supabaseUrl, supabaseKey);

window.user = {};
const redirectURL = null;

// check authentication status
async function checkAuth() {
   try {
      const {
         data: {
            session
         }
      } = await supabase.auth.getSession();

      if (session && session.user) {
         // User is signed in, fetch the user data
         user.userId = session.user.id;

         // Wait for fetchUserData to resolve or reject
         user.userDetails = await fetchUserData(userId, 'students'); 

          // Stay on page, authentication successful
         // Do nothing

      } else {
         // User is not signed in, redirect to page with sign in request
         window.location.href = redirectURL;
      }
   } catch (error) {
      // User is registered but user details are missing
      window.location.href = redirectURL;
   }
}

// insert data
async function insertData(tableName, data) {
    try {
        const { data: insertedData, error } = await supabase
            .from(tableName)
            .insert(data)
            .select(); 

        if (error) throw error;
        return insertedData;
    } catch (error) {
        console.error("Error inserting data:", error.message);
        return null;
    }
}

// select data
async function selectData(tableName, fetchSingle = false, columns = "*", matchColumn = null, matchValue = null) {
    try {
        let query = supabase
            .from(tableName)
            .select(columns);

        // Apply filter if matchColumn and matchValue are provided
        if (matchColumn && matchValue !== null) {
            query = query.eq(matchColumn, matchValue);
        }

        const { data, error } = fetchSingle ? await query.single() : await query;

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

// delete data
async function deleteRow(tableName, columnName, value) {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .delete()
            .eq(columnName, value)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error deleting row:", error.message);
        return null;
    }
}

// update data
async function updateRow(tableName, matchColumn, matchValue, updateColumn, newValue) {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .update({ [updateColumn]: newValue })
            .eq(matchColumn, matchValue)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating row:", error.message);
        return null;
    }
}