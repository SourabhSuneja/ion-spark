import {
   createClient
} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ckltcwampaagyzneaznt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbHRjd2FtcGFhZ3l6bmVhem50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MDI2NjgsImV4cCI6MjA0ODA3ODY2OH0.pUT2kngS0nkzFBjI-P6g8azU5E3tZzGDQGL68-AUWFc';
const supabase = createClient(supabaseUrl, supabaseKey);

window.userId = null;
window.userDetails = null;
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
         window.userId = session.user.id;

         // Wait for fetchUserData to resolve or reject
         window.userDetails = await fetchUserData(userId, 'students'); 

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

// sign in user
async function signInUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Error signing in:", error.message);
            throw error;
        }

        console.log("User signed in successfully.");
        return data; // Contains user session and user information
    } catch (err) {
        console.error("Unexpected error during sign-in:", err.message);
        throw err;
    }
}

// sign out user
async function signOutUser() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error logging out:", error.message);
            throw error;
        }

        console.log("User logged out successfully.");
    } catch (err) {
        console.error("Unexpected error during logout:", err.message);
        throw err;
    }
}

// sign up a new user
async function signUpUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error("Error signing up:", error.message);
            throw error;
        }

        console.log("User signed up successfully:", data);
        return data; // Contains user information and any session details
    } catch (err) {
        console.error("Unexpected error during sign-up:", err.message);
        throw err;
    }
}

// change user account password
async function changeUserPassword(newPassword) {
    try {
        // Check if the user is authenticated
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.error("Error fetching user:", userError.message);
            throw userError;
        }

        // Update the user's password
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
            console.error("Error updating password:", error.message);
            throw error;
        }

        console.log("Password changed successfully.");
        return true;
    } catch (err) {
        console.error("Error changing password:", err.message);
        throw err;
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

// invoke a function 
async function invokeFunction(functionName, functionArgs = {}, fetchSingle = false) {
    try {
        // Invoke the PostgreSQL function using Supabase's rpc method
        const { data, error } = await supabase.rpc(functionName, functionArgs);

        if (error) throw error;

        // If fetchSingle is true, return the first row only
        return fetchSingle ? data?.[0] || null : data;
    } catch (error) {
        console.error(`Error invoking function ${functionName}:`, error.message);
        return null;
    }
}

// expose all methods globally by attaching them to the window object
window.checkAuth = checkAuth;
window.signInUser = signInUser;
window.signOutUser = signOutUser;
window.insertData = insertData;
window.selectData = selectData;
window.deleteRow = deleteRow;
window.updateRow = updateRow;
window.invokeFunction = invokeFunction;

signOutUser();
