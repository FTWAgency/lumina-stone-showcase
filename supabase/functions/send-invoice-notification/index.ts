import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "sale_pending" | "invoice_sent";
  email: string;
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, data }: NotificationRequest = await req.json();

    console.log(`Notification request: ${type} to ${email}`);
    console.log("Data:", data);

    // TODO: Integrate with SendGrid when API key is provided
    // const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    
    // Placeholder response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email notification placeholder - SendGrid integration pending",
        type,
        email,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-invoice-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
