// Supabase Edge Function: send-push
// Purpose: Filter students based on target type and send push notifications via Deno Deploy endpoint
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// Define CORS headers to be used in all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Allow only POST requests
    if (req.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405
      });
    }
    // Parse incoming request body
    const { passcode, message, target_type, target_tokens } = await req.json();
    // 🔒 Step 1: Validate passcode
    const SUPABASE_PASSCODE = Deno.env.get("PUSH_SECRET_PASSCODE");
    if (!SUPABASE_PASSCODE || passcode !== SUPABASE_PASSCODE) {
      return new Response(JSON.stringify({
        error: "Unauthorized"
      }), {
        status: 401
      });
    }
    // Step 2: Initialize Supabase client using service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    // Step 3: Validate the message object
    if (!message || !message.title || !message.body) {
      return new Response(JSON.stringify({
        error: "Invalid message object"
      }), {
        status: 400
      });
    }
    // Step 4: Retrieve subscription objects based on target type
    let { data: subscriptions, error } = await getSubscriptions(supabase, target_type, target_tokens);
    if (error) {
      return new Response(JSON.stringify({
        error
      }), {
        status: 400
      });
    }
    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({
        message: "No subscriptions found"
      }), {
        status: 404
      });
    }
    // Step 5: Prepare the body for Deno Deploy push function
    const body = JSON.stringify({
      subscriptions: subscriptions.map((s)=>s.subscription_object),
      message
    });
    // Step 6: Send POST request to your Deno Deploy push notification server
    const denoUrl = "https://send-push-notification.deno.dev/";
    const response = await fetch(denoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });
    const result = await response.json();
    // Step 7: Return success and targeted counts
    const successCount = Array.isArray(result.results) ? result.results.filter((r)=>r.status === "success").length : 0;
    return new Response(JSON.stringify({
      targeted_recipients: subscriptions.length,
      success_count: successCount,
      results: result.results || result
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 200
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500
    });
  }
});
// Helper function to retrieve subscriptions
async function getSubscriptions(supabase, target_type, target_tokens) {
  try {
    let query = supabase.from("push_subscriptions").select(`
      subscription_object,
      student_id,
      students!inner(id, grade, section, access_token)
    `);
    if (target_type === "all") {
    // no filter
    } else if (target_type === "grade") {
      // Expect target_tokens to be an array of grades (like [6, 7])
      query = query.in("students.grade", target_tokens || []);
    } else if (target_type === "grade-section") {
      // Expect entries like ["6-A1", "7-A2"]
      const conditions = (target_tokens || []).map((gs)=>{
        const [grade, section] = gs.split("-");
        return {
          grade: parseInt(grade),
          section
        };
      });
      if (conditions.length > 0) {
        const grades = conditions.map((c)=>c.grade);
        const sections = conditions.map((c)=>c.section);
        query = query.in("students.grade", grades).in("students.section", sections);
      }
    } else if (target_type === "token") {
      // Expect array of access tokens
      query = query.in("students.access_token", target_tokens || []);
    } else {
      return {
        error: "Invalid target type"
      };
    }
    const { data, error } = await query;
    if (error) return {
      error: error.message
    };
    return {
      data
    };
  } catch (err) {
    return {
      error: err.message
    };
  }
}




// Deno function to send push notifications
// Deno Deploy Push Notification Server (Multiple Subscriptions)

import webpush from "npm:web-push@3.5.0";

// Access VAPID keys from environment variables
const vapidKeys = {
  publicKey: Deno.env.get("VAPID_PUBLIC_KEY") ?? "",
  privateKey: Deno.env.get("VAPID_PRIVATE_KEY") ?? ""
};

// Set your VAPID details
webpush.setVapidDetails(
  "mailto: sourabhsuneja021@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Common headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://sourabhsuneja.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// Deno server to handle requests
Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Allow only POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    // Parse the JSON body
    const { subscriptions, message } = await req.json();

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return new Response("Invalid subscriptions array", {
        status: 400,
        headers: corsHeaders
      });
    }

    const sendResults = [];

    // Loop through each subscription and send notification
    for (const subscription of subscriptions) {
      if (!subscription || !subscription.endpoint) {
        sendResults.push({ endpoint: subscription?.endpoint || "unknown", status: "skipped" });
        continue;
      }

      try {
        await webpush.sendNotification(subscription, JSON.stringify(message || ""));
        console.log("Notification sent to:", subscription.endpoint);
        sendResults.push({ endpoint: subscription.endpoint, status: "success" });
      } catch (err) {
        console.error("Error sending to", subscription.endpoint, err);
        sendResults.push({ endpoint: subscription.endpoint, status: "failed", error: err.message });
      }
    }

    return new Response(JSON.stringify({ results: sendResults }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error sending notifications:", err);
    return new Response("Failed: " + err.message, {
      status: 500,
      headers: corsHeaders
    });
  }
});
