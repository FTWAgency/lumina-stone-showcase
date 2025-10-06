import { supabase } from "@/integrations/supabase/client";

export const generateDemoData = async () => {
  try {
    console.log("Generating demo data...");

    // Create demo organizations
    const demoOrgs = [
      { name: "Premium Stone Gallery", type: "dealer" as const },
      { name: "Elite Surfaces Co", type: "dealer" as const },
      { name: "Luxury Countertops Inc", type: "dealer" as const },
      { name: "Granite Masters", type: "dealer" as const },
      { name: "Stone Elegance", type: "dealer" as const },
    ];

    const { data: orgsData, error: orgsError } = await supabase
      .from("organizations")
      .insert(demoOrgs)
      .select();

    if (orgsError) throw orgsError;
    console.log("Created organizations:", orgsData);

    // Create demo catalog items
    const demoItems = [
      { name: "Calacatta Gold", item_number: "CAL-001", dealer_price: 85, msrp: 120, cost: 60 },
      { name: "Nero Marquina", item_number: "NER-002", dealer_price: 95, msrp: 135, cost: 70 },
      { name: "Carrara White", item_number: "CAR-003", dealer_price: 75, msrp: 105, cost: 50 },
      { name: "Emperador Dark", item_number: "EMP-004", dealer_price: 90, msrp: 125, cost: 65 },
      { name: "Statuario Venato", item_number: "STA-005", dealer_price: 110, msrp: 155, cost: 80 },
    ];

    const { data: itemsData, error: itemsError } = await supabase
      .from("catalog_items")
      .insert(demoItems)
      .select();

    if (itemsError) throw itemsError;
    console.log("Created catalog items:", itemsData);

    // Create demo consignments
    const demoConsignments = orgsData.map((org, index) => ({
      dealer_org_id: org.id,
      manufacturer_org_id: org.id,
      status: "active" as const,
      start_date: new Date(Date.now() - (index * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    }));

    const { data: consignmentsData, error: consignmentsError } = await supabase
      .from("consignments")
      .insert(demoConsignments)
      .select();

    if (consignmentsError) throw consignmentsError;
    console.log("Created consignments:", consignmentsData);

    // Create demo consignment lines
    const demoLines = consignmentsData.flatMap((consignment, cIndex) =>
      itemsData.slice(0, 3).map((item, iIndex) => ({
        consignment_id: consignment.id,
        item_id: item.id,
        pieces_assigned: 10 + (cIndex * 5) + (iIndex * 2),
        pieces_remaining: 5 + (cIndex * 2) + iIndex,
        dealer_price: item.dealer_price,
      }))
    );

    const { data: linesData, error: linesError } = await supabase
      .from("consignment_lines")
      .insert(demoLines)
      .select();

    if (linesError) throw linesError;
    console.log("Created consignment lines:", linesData);

    // Create demo sales
    const demoSales = linesData.map((line, index) => {
      let status: "damaged" | "returned" | "pending_invoice" | "pending" = "pending";
      if (index % 10 === 0) status = "damaged";
      else if (index % 15 === 0) status = "returned";
      else if (index % 5 === 0) status = "pending_invoice";
      
      return {
        consignment_line_id: line.id,
        quantity: 1 + (index % 3),
        sold_date: new Date(Date.now() - (index * 10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        status,
      };
    });

    const { data: salesData, error: salesError } = await supabase
      .from("dealer_sales")
      .insert(demoSales)
      .select();

    if (salesError) throw salesError;
    console.log("Created sales:", salesData);

    // Create demo invoices
    const completedSales = salesData.filter(s => s.status === "pending");
    const dealerSalesMap = new Map();
    
    completedSales.forEach(sale => {
      const line = linesData.find(l => l.id === sale.consignment_line_id);
      if (line) {
        const consignment = consignmentsData.find(c => c.id === line.consignment_id);
        if (consignment) {
          const dealerId = consignment.dealer_org_id;
          if (!dealerSalesMap.has(dealerId)) {
            dealerSalesMap.set(dealerId, []);
          }
          dealerSalesMap.get(dealerId).push({ sale, line });
        }
      }
    });

    let invoiceNum = 1000;
    for (const [dealerId, salesWithLines] of dealerSalesMap.entries()) {
      const subtotal = salesWithLines.reduce((sum: number, { sale, line }: any) => 
        sum + (sale.quantity * line.dealer_price), 0
      );
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          invoice_number: `INV-${invoiceNum++}`,
          dealer_org_id: dealerId,
          subtotal,
          tax,
          total,
          status: "sent" as const,
          invoice_date: new Date().toISOString().split('T')[0],
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceLines = salesWithLines.map(({ sale, line }: any) => {
        const item = itemsData.find(i => i.id === line.item_id);
        return {
          invoice_id: invoiceData.id,
          dealer_sale_id: sale.id,
          item_id: line.item_id,
          quantity: sale.quantity,
          unit_price: line.dealer_price,
          line_total: sale.quantity * line.dealer_price,
        };
      });

      const { error: linesInvoiceError } = await supabase
        .from("invoice_lines")
        .insert(invoiceLines);

      if (linesInvoiceError) throw linesInvoiceError;
    }

    console.log("Demo data generation complete!");
    return { success: true, message: "Demo data created successfully" };
  } catch (error: any) {
    console.error("Error generating demo data:", error);
    return { success: false, message: error.message };
  }
};

export const clearDemoData = async () => {
  try {
    console.log("Clearing demo data...");
    
    // Delete in reverse order of dependencies
    await supabase.from("invoice_lines").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("invoices").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("dealer_sales").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("consignment_lines").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("consignments").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("catalog_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("organizations").delete().eq("type", "dealer");

    console.log("Demo data cleared!");
    return { success: true, message: "Demo data cleared successfully" };
  } catch (error: any) {
    console.error("Error clearing demo data:", error);
    return { success: false, message: error.message };
  }
};
